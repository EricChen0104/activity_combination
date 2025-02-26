import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaRegHandPointer } from "react-icons/fa";
import { IconContext } from "react-icons";

import cardImage from "/assets/images/hamepage/card_img.jpg"; // Import the image

const Card_overlay = ({ setOpenOverlay, overlayPost }) => {
  const [islogin, setIslogin] = useState(true);
  const [openContect, setOpenContect] = useState(false);
  return (
    <div className="w-full lg:w-[calc(100%-13rem)] fixed z-20 h-full flex items-center justify-center bg-slate-800/20 backdrop-blur-sm">
      <div className="w-[calc(100%-2rem)] max-w-[50rem] h-[calc(100%-6rem)] lg:h-fit lg:max-h-[50rem] lg:w-[calc(100%-2rem)] bg-zinc-100 rounded-lg shadow-2xl flex flex-col gap-5 p-4 pb-8 overflow-auto lg:px-8 ">
        <div
          className="size-6 cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => setOpenOverlay(false)}
        >
          <IoChevronBackOutline className="w-full h-full" />
        </div>
        {/* <h1 className="text-slate-800 text-2xl font-bold">標題</h1> */}
        <div className="w-full h-fit">
          <div className="h-48 relative overflow-hidden rounded-lg shadow-md">
            <img
              src={overlayPost.image} // Use the imported image
              alt=""
              className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" // Ensure the image fills the container
            />
          </div>
        </div>
        <h1 className="text-slate-800 text-2xl font-bold">
          {overlayPost.title}
        </h1>
        <p className="text-sm">{overlayPost.date}</p>
        <div className="flex gap-4 items-center text-sm flex-wrap">
          <p>關鍵字：</p>
          {overlayPost.tags.map((t, index) => (
            <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
              {t}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-xs cursor-pointer">
            <FaRegHeart className="w-5 h-5 hover:drop-shadow-xl transition-all duration-300 ease-in-out" />
            <p>00</p>
          </div>
          <FaRegBookmark className="w-5 h-5 cursor-pointer hover:drop-shadow-xl transition-all duration-300 ease-in-out" />
        </div>
        <p className="text-sm">{overlayPost.detail}</p>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setOpenContect((prev) => !prev)}
        >
          <div className="size-5">
            {openContect ? (
              <FaCaretDown className="w-full h-full" />
            ) : (
              <FaCaretRight className="w-full h-full" />
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-700">
            使用 gmail 聯絡主辦方
          </h2>
        </div>
        {openContect && (
          <div>
            {islogin ? (
              <form action="" className="flex flex-col gap-4">
                <label
                  htmlFor=""
                  className="text-xs flex flex-col gap-2 text-slate-500"
                >
                  主旨：
                  <input
                    type="text"
                    className="w-full p-2 rounded-md text-lg text-black font-bold"
                  />
                </label>
                <label
                  htmlFor=""
                  className="text-xs flex flex-col gap-2 text-slate-500"
                >
                  內文：
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full p-2 rounded-md text-md text-black"
                  ></textarea>
                </label>
                <button className="text-xs bg-teal-700 p-3 rounded-md text-white hover:text-teal-700 hover:bg-transparent transition-all duration-300 ease-in-out border-2 border-black">
                  發送
                </button>
              </form>
            ) : (
              <Link
                to="/login"
                className="text-sm text-slate-600 underline cursor-pointer w-fit"
              >
                登入後才能使用此功能
              </Link>
            )}
          </div>
        )}
        {overlayPost.link && (
          <button
            className="flex items-center justify-center gap-2 p-3 bg-teal-700 text-white rounded-lg cursor-pointer hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] transition-all duration-150 ease-in-out"
            onClick={() => {
              window.open(`${overlayPost.link}`);
            }}
          >
            <IconContext.Provider value={{ color: "white", size: "50px" }}>
              <FaRegHandPointer className="size-4" />
            </IconContext.Provider>
            點此至報名網站
          </button>
        )}
      </div>
    </div>
  );
};

export default Card_overlay;
