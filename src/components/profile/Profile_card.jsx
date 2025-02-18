import React from "react";

const Profile_card = () => {
  return (
    <div className="w-fit h-fit shadow-[0px_31px_13px_-15px_rgba(0,_0,_0,_0.1)] px-10 lg:px-20 py-10 bg-zinc-100 rounded-lg flex flex-col gap-5 items-center">
      <div className="size-36 rounded-full relative border-2 border-black drop-shadow-lg">
        <img
          src="/assets/images/profile/User Icon.png"
          alt=""
          className="object-cover"
        />
      </div>
      <h2 className="text-xl font-bold">暱稱</h2>
      <div className="flex flex-col">
        <p className="text-sm text-slate-500">帳號：</p>
        <p className="text-md text-slate-800">xxxxx@gmail.com</p>
      </div>
      <button className="border-2 border-black py-1 px-8 rounded-lg bg-teal-700 text-white text-xs hover:text-teal-700 hover:bg-transparent transition-all duration-300 ease-in-out">
        編輯個人檔案
      </button>
    </div>
  );
};

export default Profile_card;
