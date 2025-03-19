import React from "react";
import Card from "../components/homepage/Card";
import Profile_card from "../components/profile/Profile_card";

import { Toaster } from "react-hot-toast";
import Saved_list from "../components/profile/Saved_list";

import { useState, useEffect } from "react";
import Card_overlay from "../components/homepage/Card_overlay";

const Profile = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const [overlayPost, setOverlayPost] = useState([]);

  const [posts, setPosts] = useState([]); // 儲存 axios 取得的資料

  const handleSaveToggle = (updatedPost, isSaved) => {
    const updatedPosts = posts.map((post) =>
      post._id === updatedPost._id ? updatedPost : post
    );
    setPosts(updatedPosts);

    if (openOverlay && overlayPost._id === updatedPost._id) {
      setOverlayPost(updatedPost);
    }
  };

  return (
    <div className="w-full h-full overflow-auto">
      <Toaster />
      {openOverlay && (
        <Card_overlay
          setOpenOverlay={setOpenOverlay}
          overlayPost={overlayPost}
          openOverlay={openOverlay}
          onSaveToggle={handleSaveToggle}
        />
      )}
      <div className="w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-5rem)] h-fit m-auto flex flex-col gap-6 pt-12 max-w-[60rem] items-center bg-lime-50 md:bg-transparent ">
        <h1 className="font-bold text-3xl drop-shadow-xl">個人檔案</h1>
        <div className="items-center flex flex-col gap-20 md:flex-row md:items-start">
          <Profile_card />
          <Saved_list
            setOpenOverlay={setOpenOverlay}
            openOverlay={openOverlay}
            setOverlayPost={setOverlayPost}
            handleSaveToggle={handleSaveToggle}
            setPosts={setPosts}
            posts={posts}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
