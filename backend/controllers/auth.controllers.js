import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import validator from "validator"; // Import validator for email validation
import User from "../models/user.model.js"; // Import your User mode
import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  try {
    // --- Validation ---
    if (!username || !email || !password || !confirm_password) {
      return res.status(400).json({ message: "所有欄位都必須填寫" });
    }

    // Username validation (example: alphanumeric and underscores, 3-20 chars)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "使用者名稱必須是 3-20 個字元的英數字元和底線",
      });
    }

    // Email validation using validator library
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "無效的Email格式" });
    }

    // Password validation (example: minimum 8 chars, at least one letter and one number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "密碼至少 8 個字元，且必須包含至少一個字母和一個數字",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "密碼和確認密碼不相符" });
    }

    // --- Check for existing user ---
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "該 Email 已經被註冊" }); // 409 Conflict
    }

    // --- Hash the password ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Create new user ---
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
    });

    // --- Save user ---
    const user = await newUser.save();
    res.status(201).json({
      message: "註冊成功",
      user: { id: user._id, username: user.username, email: user.email },
    }); // 201 Created
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "註冊失敗", error: err.message }); // Detailed error message
  }
};

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET || "your_secret_key", // Use environment variable for secret
    { expiresIn: "1h" } // Token expiration time
  );
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // --- Validation ---
    if (!email || !password) {
      return res.status(400).json({ message: "Email 和 密碼 必須填寫" });
    }

    // Optional: Email validation using validator library
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "無效的 Email 格式" });
    }

    // --- Check if user exists ---
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "使用者不存在" }); // 404 Not Found
    }

    // --- Compare passwords ---
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "密碼不正確" }); // 400 Bad Request (or 401 Unauthorized)
    }

    // --- Generate JWT token ---
    const token = generateToken(user);

    // --- Send success response ---
    res.status(200).json({
      message: "登入成功",
      user,
      token: token, // Include the JWT token in the response
    }); // 200 OK
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "登入失敗", error: err.message }); // Detailed error message
  }
};

export const savedPost = async (req, res) => {
  const { userId } = req.query;

  try {
    const posts = await Post.find({ savedBy: userId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "沒有儲存的貼文" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ message: "無法取得儲存的貼文" });
  }
};

// OTP 傳送功能
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // --- 基本驗證 ---
    if (!email) {
      return res.status(400).json({ message: "請提供 Email" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "無效的 Email 格式" });
    }

    // --- 檢查用戶是否存在 ---
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "使用者不存在" });
    }

    // --- 生成 6 位數 OTP ---
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP 10 分鐘後過期

    // --- 更新用戶資料中的 OTP 和到期時間 ---
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // --- 設定郵件傳送器 (使用 nodemailer) ---
    const transporter = nodemailer.createTransport({
      service: "gmail", // 可換成其他服務如 Outlook, SendGrid 等
      auth: {
        user: process.env.EMAIL_USER, // 你的 email，從環境變數中獲取
        pass: process.env.EMAIL_PASS, // 你的 email 密碼或應用程式專用密碼
      },
    });

    // --- 設定郵件內容 ---
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "您的 OTP 驗證碼",
      text: `您的 OTP 驗證碼是：${otp}\n此驗證碼將在 10 分鐘後過期。`,
      html: `
        <h2>OTP 驗證碼</h2>
        <p>您的 OTP 驗證碼是：<strong>${otp}</strong></p>
        <p>此驗證碼將在 10 分鐘後過期，請盡快使用。</p>
      `,
    };

    // --- 發送郵件 ---
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "OTP 已成功發送到您的 Email",
      expiresAt: otpExpiry,
    });
  } catch (err) {
    console.error("OTP 發送錯誤:", err);
    res.status(500).json({
      message: "OTP 發送失敗",
      error: err.message,
    });
  }
};

// --- 可選：驗證 OTP 的功能 ---
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // --- 基本驗證 ---
    if (!email || !otp) {
      return res.status(400).json({ message: "請提供 Email 和 OTP" });
    }

    // --- 查找用戶 ---
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "使用者不存在" });
    }

    // --- 檢查 OTP 是否有效 ---
    if (user.otp !== otp) {
      return res.status(400).json({ message: "無效的 OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP 已過期" });
    }

    // --- OTP 驗證成功，清除 OTP 資料 ---
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // --- 生成並返回 JWT token (可選) ---
    const token = generateToken(user);

    res.status(200).json({
      message: "OTP 驗證成功",
      token: token,
    });
  } catch (err) {
    console.error("OTP 驗證錯誤:", err);
    res.status(500).json({
      message: "OTP 驗證失敗",
      error: err.message,
    });
  }
};

export const changePassword = async (req, res) => {
  const { confirm_password, password, email } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: "密碼尚未填寫" });
    }
    if (!confirm_password) {
      return res.status(400).json({ message: "確認密碼尚未填寫" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "新密碼至少 8 個字元，且必須包含至少一個字母和一個數字",
      });
    }
    if (confirm_password !== password) {
      return res.status(400).json({ message: "密碼與確認密碼不同" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "使用者不存在" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(password, salt);
    user.password = hashedNewPassword;

    // --- 保存更新 ---
    await user.save();

    res.status(200).json({ message: "密碼變更成功" });
  } catch (err) {
    console.error("密碼變更錯誤:", err);
    res.status(500).json({
      message: "密碼變更失敗",
      error: err.message,
    });
  }
};
