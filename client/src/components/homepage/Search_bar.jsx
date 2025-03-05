import React from "react";
import { IoSearch } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchBar = ({ setPosts, prevSearchTerm, setprevSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const dropdownRef = useRef(null); // Ref for dropdown container

  const filterPostsByTags = (currentPosts, selectedRegion) => {
    if (selectedTags.length === 0 && selectedRegion === "") {
      return currentPosts; // 沒有選擇任何標籤，回傳所有文章
    }

    return currentPosts.filter((post) => {
      // 假設你的 post 物件有一個名為 'tags' 的屬性，且該屬性是一個陣列
      if (!post.tags) return false; // 跳過沒有標籤的文章

      // 檢查 post 的標籤中是否包含 *所有* 選定的標籤
      const tagsMatch = selectedTags.every((tag) => post.tags.includes(tag));

      if (selectedRegion !== "") {
        // 如果有選擇地區，則必須同時符合地區和標籤
        if (!post.region_tag) return false; // 如果文章沒有地區資訊，則不符合
        return post.region_tag === selectedRegion && tagsMatch; // 必須符合地區和標籤
      } else {
        // 如果沒有選擇地區，則只需符合標籤
        return tagsMatch;
      }
    });
  };
  const filterPostsByRegion = (currentPosts) => {
    if (selectedRegion === "") {
      return currentPosts; // 沒有選擇任何標籤，回傳所有文章
    }

    return currentPosts.filter((post) => {
      // 假設你的 post 物件有一個名為 'tags' 的屬性，且該屬性是一個陣列
      if (!post.tags) return false; // 跳過沒有標籤的文章

      // 檢查 post 的標籤中是否包含至少一個選定的標籤
      return post.region_tag === selectedRegion;
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
    setPosts(filterPostsByTags(prevSearchTerm, selectedRegion));
  }, [selectedTags]);

  useEffect(() => {
    setPosts(filterPostsByRegion(prevSearchTerm));
  }, [selectedRegion]);

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

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const regions = [
    "臺北",
    "新北",
    "桃園",
    "基隆",
    "新竹",
    "苗栗",
    "台中",
    "彰化",
    "雲林",
    "嘉義",
    "台南",
    "高雄",
    "屏東",
    "台東",
    "花蓮",
    "宜蘭",
    "南投",
    "線上",
  ];

  const renderDropdownOptions = () => {
    return regions.map((region, index) => (
      <option
        key={index}
        value={region}
        className="bg-white hover:bg-gray-100 text-black"
      >
        {region}
      </option>
    ));
  };

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
      <div className="flex flex-col gap-2">
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
        </div>
        <div
          className="flex gap-2 text-sm items-center relative"
          ref={dropdownRef}
        >
          <p className="">地區：</p>
          <select
            name="region"
            id="region"
            className="w-[calc(100%-4rem)] px-2 py-1 bg-white border-2 border-black rounded-md appearance-none cursor-pointer relative"
            onChange={handleRegionChange} // Capture selected value
            value={selectedRegion}
          >
            <option value="">選擇地區</option>
            {renderDropdownOptions()}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
            <TiArrowSortedDown className="fill-current h-4 w-4 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
