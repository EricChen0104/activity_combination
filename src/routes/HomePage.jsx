import React from "react";
import Search_bar from "../components/homepage/Search_bar";
import Card from "../components/homepage/Card";
import Card_overlay from "../components/homepage/Card_overlay";
import { useState } from "react";

const HomePage = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      {openOverlay && <Card_overlay setOpenOverlay={setOpenOverlay} />}
      <Search_bar />
      <div className="w-full flex-grow overflow-auto pt-5">
        <div className="max-w-6xl w-[calc(100%-5rem)] h-fill pb-10 mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card setOpenOverlay={setOpenOverlay} />
          <Card setOpenOverlay={setOpenOverlay} />
          <Card setOpenOverlay={setOpenOverlay} />
          <Card setOpenOverlay={setOpenOverlay} />
          <Card setOpenOverlay={setOpenOverlay} />
          <Card setOpenOverlay={setOpenOverlay} />
          <Card setOpenOverlay={setOpenOverlay} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
