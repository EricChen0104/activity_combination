import React from "react";
import { UserContext } from "../../main";
import { useContext } from "react";

import axios from "axios";
import { useEffect, useState } from "react";

import Card from "../homepage/Card";

const Saved_list = ({
  setOpenOverlay,
  openOverlay,
  setOverlayPost,
  setPosts,
  posts,
  handleSaveToggle,
}) => {
  const {
    userAuth,
    userAuth: { token },
  } = useContext(UserContext);

  if (!token) {
    return <div>Loading profile...</div>; // Or a spinner
  }

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/users/savedpost?userId=${
          userAuth.user._id
        }`
      );
      if (response.status == 200) {
        console.log(response.data);
        setPosts(response.data);
      } else {
        console.log("資料抓取失敗");
      }
    } catch (err) {
      console.log(err.response?.data?.error || "無法獲取資料");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-fit w-full py-4 px-5 md:px-0 flex flex-col gap-5 bg-lime-50">
      <h2 className="font-bold text-lg px-[1rem]">您收藏的活動</h2>
      <div className="flex flex-col gap-5 h-fit w-full md:w-[calc(100%-2rem)] m-auto max-w-[30rem]">
        {posts.length == 0 ? (
          <div className="">尚無收藏活動</div>
        ) : (
          posts.map((post, index) => (
            <Card
              key={index} // 唯一 key（建議使用 post.id 如果有的話）
              setOpenOverlay={setOpenOverlay}
              post={post} // 將單一 post 資料傳給 Card
              setOverlayPost={setOverlayPost}
              openOverlay={openOverlay}
              onSaveToggle={handleSaveToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Saved_list;
