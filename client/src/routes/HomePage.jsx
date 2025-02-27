import React from "react";
import Search_bar from "../components/homepage/Search_bar";
import Card from "../components/homepage/Card";
import Card_overlay from "../components/homepage/Card_overlay";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [openOverlay, setOpenOverlay] = useState(false);
  const [overlayPost, setOverlayPost] = useState([]);
  const [posts, setPosts] = useState([]); // 儲存 axios 取得的資料
  const [loading, setLoading] = useState(true); // 載入狀態（可選）
  const [error, setError] = useState(null); // 錯誤狀態（可選）

  // 獲取資料的函數
  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/posts`
      );
      setPosts(response.data); // 將資料存入 state
      setLoading(false); // 載入完成
    } catch (err) {
      setError(err.response?.data?.error || "無法獲取資料"); // 儲存錯誤訊息
      setLoading(false);
    }
  };

  // 在元件初次渲染時執行 getPosts
  useEffect(() => {
    getPosts();
  }, []); // 空陣列表示僅在初次渲染時執行

  return (
    <div className="flex flex-col h-screen">
      {openOverlay && (
        <Card_overlay
          setOpenOverlay={setOpenOverlay}
          overlayPost={overlayPost}
        />
      )}
      <Search_bar setPosts={setPosts} posts={posts} />
      <div className="w-full flex-grow overflow-auto pt-5">
        <div className="max-w-6xl w-[calc(100%-5rem)] h-fill pb-10 mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p>載入中...</p> // 載入狀態顯示
          ) : error ? (
            <p className="text-red-500">{error}</p> // 錯誤訊息顯示
          ) : (
            posts.map((post, index) => (
              <Card
                key={index} // 唯一 key（建議使用 post.id 如果有的話）
                setOpenOverlay={setOpenOverlay}
                post={post} // 將單一 post 資料傳給 Card
                setOverlayPost={setOverlayPost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
