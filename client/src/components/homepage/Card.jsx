import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const Card = ({ setOpenOverlay, post, setOverlayPost }) => {
  return (
    <div className="bg-zinc-100 h-fit w-full p-4 flex flex-col gap-4 rounded-lg shadow-[0px_31px_13px_-15px_rgba(0,_0,_0,_0.1)]">
      <div className="w-full h-32 bg-white rounded-lg shadow-md relative overflow-hidden">
        <img
          src={post.image}
          alt=""
          className="object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        />
      </div>
      <h1 className="text-xl font-bold text-slate-800">{post.title}</h1>
      <p className="text-sm">{post.date}</p>
      <div className="flex gap-4 items-center text-sm flex-wrap">
        <p>關鍵字：</p>
        {post.tags.map((t, index) => (
          <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
            {t}
          </div>
        ))}

        {/* <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          教學
        </div>
        <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          服務
        </div> */}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center text-xs cursor-pointer">
          <FaRegHeart className="w-5 h-5 hover:drop-shadow-xl transition-all duration-300 ease-in-out" />
          <p>00</p>
        </div>
        <FaRegBookmark className="w-5 h-5 cursor-pointer hover:drop-shadow-xl transition-all duration-300 ease-in-out" />
      </div>
      <button
        className="border-2 border-black py-1 rounded-lg bg-teal-700 text-white hover:text-teal-700 hover:bg-transparent transition-all duration-300 ease-in-out"
        onClick={() => {
          setOverlayPost(post);
          setOpenOverlay(true);
        }}
      >
        了解更多
      </button>
    </div>
  );
};

export default Card;
