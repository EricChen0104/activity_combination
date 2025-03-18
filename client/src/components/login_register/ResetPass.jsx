import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../main";
import { lookInSession } from "../../common/session";
import { removeFromSession } from "../../common/session";

const ResetPass = () => {
  const [email, setEmail] = useState(lookInSession("email"));
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  console.log(access_token);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Basic front-end validation (you should also have backend validation)
    if (!password || !confirm_password) {
      return toast.error("所有欄位都必須填寫");
    }

    if (password != confirm_password) {
      return toast.error("密碼與確認密碼不一致");
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/reset/changepassword`,
        {
          email,
          password,
          confirm_password,
        }
      );
      if (response.status === 200) {
        toast.success("密碼修改成功");
        removeFromSession("email");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(response.data.message || "密碼修改失敗"); // Display backend error
        console.error("密碼修改失敗:", response);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "密碼修改時發生錯誤"); // Handle network errors
      console.error("密碼修改時發生錯誤:", err);
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
        <h1 className="text-xl font-bold">修改密碼</h1>
        <p className="text-xs text-slate-500">{email}</p>
        <label htmlFor="username" className="flex flex-col text-sm gap-1">
          <p className="text-xs text-slate-500">更改密碼</p>
          <input
            id="username"
            type="password"
            className="p-2 w-64 md:w-96 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="flex flex-col text-sm gap-1">
          <p className="text-xs text-slate-500">確認更改密碼</p>
          <input
            id="password"
            type="password"
            className="p-2 w-64 md:w-96 rounded-lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button
          className="py-4 px-14 bg-teal-700 text-white text-xs rounded-lg hover:drop-shadow-xl hover:px-16 transition-all duration-300 ease-in-out"
          type="submit"
        >
          確認修改
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
