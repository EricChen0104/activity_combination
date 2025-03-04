import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import validator from "validator"; // Import validator for email validation
import User from "../models/user.model.js"; // Import your User model
import jwt from "jsonwebtoken";

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
