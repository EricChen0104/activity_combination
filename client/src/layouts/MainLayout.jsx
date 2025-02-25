import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="fixed right-0 lg:w-[calc(100%-13rem)] h-full w-full">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
