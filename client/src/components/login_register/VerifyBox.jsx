import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { lookInSession } from "../../common/session";

const VerifyBox = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (index, event) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = event.target.value;
    setOtpValues(newOtpValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const otpString = otpValues.join("");
    console.log("驗證碼:", otpString);
    const email = lookInSession("email");
    console.log(email);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/reset/verifyOTP`,
        {
          email,
          otp: otpString,
        }
      );
      if (response.status == 200) {
        toast.success("驗證成功");
        setTimeout(() => {
          navigate("/reset");
        }, 1500);
      } else {
        toast.error(response.data.message || "驗證失敗"); // Display backend error
        console.error("驗證失敗:", response);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "驗證時發生錯誤"); // Handle network errors
      console.error("驗證時發生錯誤:", err);
    }

    // 在這裡可以將 otpString 傳送到後端進行驗證
  };

  return (
    <div className="">
      <Toaster position="top-center" />
      <form
        action=""
        className="bg-zinc-100 flex flex-col gap-10 p-5 py-12 items-center rounded-lg drop-shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold tracking-widest drop-shadow-xl">
          服務學習
          <br />
          整合平台
        </h1>
        <h1 className="text-xl font-bold">驗證信箱</h1>
        <div className="flex gap-3 h-14">
          {" "}
          {/* Adjust height */}
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="text"
              className="w-10 h-10 md:w-14 md:h-14 text-center rounded-md bg-zinc-200 focus:outline-none text-lg font-bold shadow-inner" /* Added styles */
              maxLength="1" /* Limit input to one character */
              value={value}
              onChange={(event) => handleInputChange(index, event)}
            />
          ))}
        </div>

        <button
          className="py-4 px-14 bg-teal-700 text-white text-xs rounded-lg hover:drop-shadow-xl hover:px-16 transition-all duration-300 ease-in-out"
          type="submit"
        >
          驗證
        </button>
        <div className="text-xs flex flex-col items-center gap-2">
          <p>還沒收到驗證碼嗎？</p>
          <Link to="/register" className="text-blue-800">
            重新傳送
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VerifyBox;
