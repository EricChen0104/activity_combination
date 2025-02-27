import React from "react";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ setPosts, posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setprevSearchTerm] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const filterPostsByTags = (currentPosts) => {
    if (selectedTags.length === 0) {
      return currentPosts; // 沒有選擇任何標籤，回傳所有文章
    }

    return currentPosts.filter((post) => {
      // 假設你的 post 物件有一個名為 'tags' 的屬性，且該屬性是一個陣列
      if (!post.tags) return false; // 跳過沒有標籤的文章

      // 檢查 post 的標籤中是否包含至少一個選定的標籤
      return selectedTags.every((tag) => post.tags.includes(tag));
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const params = {
        search: searchTerm,
      };

      const response = await axios.get("http://localhost:3000/posts/search", {
        params: params,
      });

      setPosts(response.data);
      setprevSearchTerm(response.data);
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); // Remove tag
    } else {
      setSelectedTags([...selectedTags, tag]); // Add tag
    }
  };

  useEffect(() => {
    setPosts(filterPostsByTags(prevSearchTerm));
  }, [selectedTags]);

  const tags = [
    "老人",
    "教育",
    "服務",
    "兒童",
    "清潔",
    "活動",
    "身心障礙",
    "其他",
  ];

  return (
    <div className="z-10 w-full flex flex-col py-6 px-12 shadow-xl bg-yellow-50 gap-5 lg:flex-row lg:gap-12 ">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <label htmlFor="search_bar">
          <input
            id="search_bar"
            type="text"
            placeholder="查詢..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-black px-2 py-1 text-sm rounded-md w-64 shadow-lg hover:drop-shadow-2xl transition-all duration-300 ease-in-out"
          />
        </label>
        <IoSearch className="w-6 h-6 cursor-pointer" onClick={handleSearch} />
      </form>
      <div className="flex gap-4 items-center text-sm flex-wrap">
        <p>關鍵字：</p>
        {tags.map((tag) => (
          <div
            key={tag}
            className={`px-3 py-1 rounded-2xl text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-teal-700 text-white"
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </div>
        ))}
        {/* <div className="px-3 py-1 rounded-2xl bg-teal-700 text-white text-xs cursor-pointer hover:drop-shadow-lg transition-all duration-300 ease-in-out">
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
        </div> */}
      </div>
    </div>
  );
};

export default SearchBar;
