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
      <h2 className="text-md flex items-center">
        <p className="text-xs text-slate-700">地區：</p>
        <p className="font-bold">{post.region_tag}</p>
      </h2>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-slate-700">招募期限：</p>
        <p className="text-sm">{post.date}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-slate-500">關鍵字：</p>
          <div className="flex gap-4 items-center text-sm flex-wrap">
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
        </div>
        <div className="flex items-center gap-2 ml-5">
          <FaRegBookmark className="w-5 h-5 cursor-pointer hover:drop-shadow-xl transition-all duration-300 ease-in-out" />
          <p className="text-sm text-slate-700">00</p>
        </div>
      </div>

      <button
        className="mt-5 border-2 border-black py-1 rounded-lg bg-teal-700 text-white hover:text-teal-700 hover:bg-transparent transition-all duration-300 ease-in-out"
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
