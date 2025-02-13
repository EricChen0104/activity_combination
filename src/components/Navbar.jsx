import { BiMenu } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="">
      <BiMenu className="w-8 h-8 mx-4 mt-4 cursor-pointer lg:hidden" />
      <div className="h-full w-52 bg-cyan-200 fixed border-r-2 border-black hidden flex-col gap-12 lg:flex">
        <div className="logo text-3xl mx-9 font-bold tracking-widest mt-8">
          服務學習
          <br />
          整合平台
        </div>
        <div
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          登入
        </div>
        <div
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          首頁
        </div>
        <div
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          關於
        </div>
        <div
          className="bg-teal-700 w-[calc(100%-2.5rem)] py-1.5 px-4 text-white rounded-r-md text-md drop-shadow-lg 
      hover:px-8 hover:w-[calc(100%-1rem)] hover:drop-shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          關於作者
        </div>
      </div>
    </div>
  );
};

export default Navbar;
