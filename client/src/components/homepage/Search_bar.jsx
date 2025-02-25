import React from "react";
import { IoSearch } from "react-icons/io5";
const search_bar = () => {
  return (
    <div className="z-10 w-full flex flex-col py-6 px-12 shadow-xl bg-yellow-50 gap-5 lg:flex-row lg:gap-12 ">
      <form action="" className="flex items-center gap-2">
        <label htmlFor="search_bar">
          <input
            id="search_bar"
            type="text"
            placeholder="查詢..."
            className="border-2 border-black px-2 py-1 text-sm rounded-md w-64 shadow-lg hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
          />
        </label>
        <IoSearch className="w-6 h-6 cursor-pointer" />
      </form>
      <div className="flex gap-4 items-center text-sm flex-wrap">
        <p>關鍵字：</p>
        <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          老人
        </div>
        <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          教學
        </div>
        <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          服務
        </div>
        <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          兒童
        </div>
        <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
          清潔
        </div>
      </div>
    </div>
  );
};

export default search_bar;
