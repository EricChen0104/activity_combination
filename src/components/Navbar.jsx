import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-10">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-5 h-5 lg:hidden fixed z-10 mx-4 mt-4 cursor-pointer"
      >
        {open ? (
          <RxCross2 className="w-full h-full" />
        ) : (
          <BiMenu className="w-full h-full" />
        )}
      </div>

      <div
        className={`h-full w-52 bg-cyan-200 fixed border-r-2 border-black flex-col gap-12 flex ${
          open ? "-left-0" : "-left-[100%]"
        } transition-all duration-500 ease-in-out`}
      >
        <Link
          to="/"
          className="logo text-3xl mx-9 font-bold tracking-widest mt-8 cursor-pointer"
        >
          服務學習
          <br />
          整合平台
        </Link>
        <Link
          to="/login"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          登入 / 註冊
        </Link>
        <Link
          to="/"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          首頁
        </Link>
        <Link
          to="/about"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          關於
        </Link>
        <Link
          to="/aboutauthor"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          關於作者
        </Link>
      </div>

      <div className="h-full w-52 bg-cyan-200 fixed border-r-2 border-black flex-col gap-12 hidden lg:flex">
        <Link
          to="/"
          className="logo text-3xl mx-9 font-bold tracking-widest mt-8 cursor-pointer"
        >
          服務學習
          <br />
          整合平台
        </Link>
        <Link
          to="/login"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          登入 / 註冊
        </Link>
        <Link
          to="/"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          首頁
        </Link>
        <Link
          to="/about"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          關於
        </Link>
        <Link
          to="/aboutauthor"
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          關於作者
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
