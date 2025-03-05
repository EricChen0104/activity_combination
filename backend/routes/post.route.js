import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  savePost,
  searchPost,
} from "../controllers/post.controllers.js";
import Post from "../models/post.model.js";
import fs from "fs/promises";

const router = express.Router();

router.get("/", getPost);
router.get("/search", searchPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/save/post", savePost);
router.post("/insertFile", async () => {
  const filePath =
    "/Users/ericchen980104/Desktop/專案們/服務學習資源整合平台/web/full-stack-blog/backend/tagged_data.json";

  try {
    // 讀取 JSON 檔案
    const jsonData = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(jsonData); // 將字串解析為物件

    // 檢查是否為陣列並儲存
    if (Array.isArray(parsedData)) {
      await Post.insertMany(parsedData);
      console.log(`成功儲存 ${parsedData.length} 筆資料`);
    } else {
      const posts = new Post(parsedData);
      await posts.save();
      console.log("成功儲存 1 筆資料");
    }
  } catch (error) {
    console.error("處理失敗:", error);
  }
});

export default router;
