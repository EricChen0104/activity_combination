import React from "react";
import Card from "../components/homepage/Card";
import Profile_card from "../components/profile/profile_card";

const Profile = () => {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-5rem)] h-fit m-auto flex flex-col gap-6 pt-12 max-w-[60rem] items-center bg-lime-50 md:bg-transparent ">
        <h1 className="font-bold text-3xl drop-shadow-xl">個人檔案</h1>
        <div className="items-center flex flex-col gap-20 md:flex-row md:items-start">
          <Profile_card />
          <div className="h-fit w-full py-4 px-5 md:px-0 flex flex-col gap-5 bg-lime-50">
            <h2 className="font-bold text-lg px-[1rem]">您收藏的活動</h2>
            <div className="flex flex-col gap-5 h-fit w-full md:w-[calc(100%-2rem)] m-auto max-w-[30rem]">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
