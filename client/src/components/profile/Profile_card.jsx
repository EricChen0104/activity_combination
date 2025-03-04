import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { removeFromSession } from "../../common/session";
import { UserContext } from "../../main";
import { useNavigate } from "react-router-dom";

const Profile_card = () => {
  const {
    userAuth,
    userAuth: { token },
    setUserAuth,
  } = useContext(UserContext);

  const navigate = useNavigate(); // Hook for navigation

  const signOut = () => {
    toast.success("成功登出");
    setTimeout(() => {
      removeFromSession("User");
      setUserAuth({ token: null });
      navigate("/login");
    }, 1500);
  };
  if (!token) {
    return <div>Loading profile...</div>; // Or a spinner
  }
  console.log("Token:", token); // Log the token

  return (
    <div className="w-fit h-fit shadow-[0px_31px_13px_-15px_rgba(0,_0,_0,_0.1)] px-10 lg:px-20 py-10 bg-zinc-100 rounded-lg flex flex-col gap-5 items-center">
      <div className="size-36 rounded-full relative border-2 border-black drop-shadow-lg">
        <img
          src="/assets/images/profile/User Icon.png"
          alt=""
          className="object-cover"
        />
      </div>
      <h2 className="text-xl font-bold">{userAuth.user.username}</h2>
      <div className="flex flex-col">
        <p className="text-sm text-slate-500">帳號：</p>
        <p className="text-md text-slate-800">{userAuth.user.email}</p>
      </div>
      <button className="border-2 border-black py-1 px-8 rounded-lg bg-teal-700 text-white text-xs hover:text-teal-700 hover:bg-transparent transition-all duration-300 ease-in-out">
        編輯個人檔案
      </button>
      <button
        className="bg-red-600 text-white px-8 text-sm py-1 rounded-lg hover:text-red-600 hover:bg-transparent border-2 border-transparent hover:border-red-600 transition-all duration-300 ease-in-out"
        onClick={signOut}
      >
        登出
      </button>
    </div>
  );
};

export default Profile_card;
