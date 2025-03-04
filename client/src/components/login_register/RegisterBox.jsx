import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";

const RegisterBox = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Basic front-end validation (you should also have backend validation)
    if (!username || !email || !password || !confirmPassword) {
      return toast.error("所有欄位都必須填寫");
    }

    if (password !== confirmPassword) {
      return toast.error("密碼和確認密碼不相符");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/register`,
        {
          // Adjust the URL
          username,
          email,
          password,
          confirm_password: confirmPassword, // Make sure the property name matches your backend
        }
      );
      if (response.status === 201) {
        toast.success("註冊成功");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(response.data.message || "註冊失敗"); // Display backend error
        console.error("註冊失敗:", response);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "註冊時發生錯誤"); // Handle network errors
      console.error("註冊時發生錯誤:", err);
    }
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
        <h1 className="text-xl font-bold">註冊</h1>
        <label htmlFor="username" className="flex flex-col text-sm gap-1">
          <p className="text-xs text-slate-500">使用者暱稱</p>
          <input
            id="username"
            type="text"
            className="p-2 w-64 md:w-96 rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="email" className="flex flex-col text-sm gap-1">
          <p className="text-xs text-slate-500">電子信箱</p>
          <input
            id="email"
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
        </label>
        <label
          htmlFor="confirm_password"
          className="flex flex-col text-sm gap-1"
        >
          <p className="text-xs text-slate-500">確認密碼</p>
          <input
            id="confirm_password"
            type="password"
            className="p-2 w-64 md:w-96 rounded-lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button
          className="py-4 px-14 bg-teal-700 text-white text-xs rounded-lg hover:drop-shadow-xl hover:px-16 transition-all duration-300 ease-in-out"
          type="submit"
        >
          註冊
        </button>
        <div className="text-xs flex flex-col items-center gap-2">
          <p>已經註冊過帳號了？</p>
          <Link to="/login" className="text-blue-800">
            立即登入
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterBox;
