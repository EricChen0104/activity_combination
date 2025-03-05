import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaRegBookmark } from "react-icons/fa6";
import { GoBookmarkSlashFill } from "react-icons/go";

import { UserContext } from "../../main";
import { IconContext } from "react-icons";

const Card = ({ setOpenOverlay, post, setOverlayPost, onSaveToggle }) => {
  let {
    userAuth,
    userAuth: { token },
  } = useContext(UserContext);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [savedByLength, setSavedByLength] = useState(
    post.savedBy ? post.savedBy.length : 0
  );

  useEffect(() => {
    // Check if the user is logged in AND the post has been loaded
    if (userAuth && userAuth.user && post && post.savedBy) {
      // Convert user._id to string for comparison. _id are Mongoose ObjectIds.
      const userIdString = userAuth.user._id.toString();

      // Check if post.savedBy includes userIdString.
      const isPostSavedByUser = post.savedBy.some(
        (savedUserId) => savedUserId.toString() === userIdString
      );

      setSavedByLength(post.savedBy ? post.savedBy.length : 0);
      setIsBookmarked(isPostSavedByUser);
    } else {
      setIsBookmarked(false); // Ensure isBookmarked is false if user is not logged in or data is missing
    }
  }, [userAuth, post]); // Dependencies: userAuth, post (re-run effect when these change)

  const savePost = async () => {
    if (!token) {
      return toast.error("請先登入以使用此功能");
    }
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/posts/save/post`,
      {
        userId: userAuth.user._id,
        postId: post._id,
      }
    );

    if (response.status == 200) {
      const updatedPost = response.data.post;
      console.log(updatedPost);
      setSavedByLength(updatedPost.savedBy.length);

      if (response.data.message == "Post saved successfully") {
        setIsBookmarked(true);
        // Pass updated post data back to parent
        onSaveToggle(updatedPost, true);
        return toast.success("成功收藏");
      } else {
        setIsBookmarked(false);
        // Pass updated post data back to parent
        onSaveToggle(updatedPost, false);
        return toast.success("成功取消收藏");
      }
    } else {
      toast.error(response.data.message || "收藏失敗"); // Display backend error
    }
  };

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
        {isBookmarked ? (
          <div
            className="flex items-center gap-2 ml-5 cursor-pointer"
            onClick={savePost}
          >
            <IconContext.Provider value={{ color: "#00FF00", size: "50px" }}>
              <GoBookmarkSlashFill className="size-6" />
            </IconContext.Provider>
            <p className="text-sm text-slate-700">{savedByLength}</p>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 ml-5 cursor-pointer"
            onClick={savePost}
          >
            <IconContext.Provider value={{ color: "black", size: "50px" }}>
              <FaRegBookmark className="size-5" />
            </IconContext.Provider>
            <p className="text-sm text-slate-700">{savedByLength}</p>
          </div>
        )}
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
