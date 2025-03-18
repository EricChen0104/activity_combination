import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../main";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  console.log(access_token);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Basic front-end validation (you should also have backend validation)
    if (!email || !password) {
      return toast.error("所有欄位都必須填寫");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/login`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        toast.success("登入成功");
        storeInSession("User", JSON.stringify(response.data));
        console.log(sessionStorage);
        setUserAuth(response.data);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        toast.error(response.data.message || "登入失敗"); // Display backend error
        console.error("登入失敗:", response);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "登入時發生錯誤"); // Handle network errors
      console.error("登入時發生錯誤:", err);
    }
  };

  const navToVerify = async () => {
    if (!email) {
      return toast.error("至少輸入電子信箱");
    }
    storeInSession("email", email);
    // setUserAuth({ token: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/reset/sendotp`,
        {
          email,
        }
      );
      if (response.status == 200) {
        console.log("成功傳送驗證碼");
      } else {
        console.log("傳送驗證碼失敗");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "傳送驗證碼時發生錯誤"); // Handle network errors
      console.error("傳送驗證碼時發生錯誤:", err);
    }
    navigate("/verify");
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      <form
        action=""
        className="bg-zinc-100 flex flex-col gap-4 p-5 py-12 items-center rounded-lg drop-shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold tracking-widest drop-shadow-xl">
          服務學習
          <br />
          整合平台
        </h1>
        <h1 className="text-xl font-bold">登入</h1>
        <label htmlFor="username" className="flex flex-col text-sm gap-1">
          <p className="text-xs text-slate-500">使用者名稱 / 電子信箱</p>
          <input
            id="username"
            type="text"
            className="p-2 w-64 md:w-96 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="flex flex-col text-sm gap-1">
          <p className="text-xs text-slate-500">密碼</p>
          <input
            id="password"
            type="password"
            className="p-2 w-64 md:w-96 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-slate-500 flex gap-2">
            忘記密碼了嗎？
            <p className="text-blue-800 cursor-pointer" onClick={navToVerify}>
              忘記密碼
            </p>
          </p>
        </label>
        <button
          className="py-4 px-14 bg-teal-700 text-white text-xs rounded-lg hover:drop-shadow-xl hover:px-16 transition-all duration-300 ease-in-out"
          type="submit"
        >
          登入
        </button>
        <div className="text-xs flex flex-col items-center gap-2">
          <p>還沒註冊帳號嗎？</p>
          <Link to="/register" className="text-blue-800">
            立即註冊
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
