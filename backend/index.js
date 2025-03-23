import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";

import { MongoClient } from "mongodb";

import mongoose from "mongoose";
// import Post from "./models/post.model.js";

const app = express();
app.use(express.json());
app.use(cors());

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
console.log("FRONTEND_URL:", frontendURL);

app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.get("/", async (req, res) => {
//   try {
//     // 確保資料庫已連線
//     if (mongoose.connection.readyState !== 1) {
//       await connectDB();
//     }

//     // 查詢所有 posts
//     const allPosts = await Post.find({}); // 使用 Mongoose 的 find 方法

//     // 回傳結果
//     res.status(200).json({
//       message: "Posts retrieved successfully",
//       data: allPosts,
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!!",
    status: error.status,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
});

// let isConnected = false;
// app.use(async (req, res, next) => {
//   if (!isConnected) {
//     console.log("Attempting DB connection:", new Date());
//     await connectDB();
//     console.log("DB connected:", new Date());
//     isConnected = true;
//   }
//   next();
// });

app.listen(3000, async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  console.log("api running");
});

export default app;
