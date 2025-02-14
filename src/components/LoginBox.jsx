import React from "react";
import { Link } from "react-router-dom";

const LoginBox = () => {
  return (
    <form
      action=""
      className="bg-slate-100 flex flex-col gap-4 p-5 py-12 items-center rounded-lg"
    >
      <h1 className="text-xl font-bold">登入</h1>
      <label htmlFor="username" className="flex flex-col text-sm gap-1">
        <p className="text-xs text-slate-500">使用者名稱 / 電子信箱</p>
        <input
          id="username"
          type="text"
          className="p-2 w-64 md:w-96 rounded-lg"
        />
      </label>
      <label htmlFor="password" className="flex flex-col text-sm gap-1">
        <p className="text-xs text-slate-500">密碼</p>
        <input
          id="password"
          type="password"
          className="p-2 w-64 md:w-96 rounded-lg"
        />
      </label>
      <button className="py-4 px-14 bg-teal-700 text-white text-xs rounded-lg">
        登入
      </button>
      <div className="text-xs flex flex-col items-center gap-2">
        <p>還沒註冊帳號嗎？</p>
        <Link to="/register" className="text-blue-800">
          立即註冊
        </Link>
      </div>
    </form>
  );
};

export default LoginBox;
