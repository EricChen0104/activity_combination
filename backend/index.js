import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";

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

app.get("/", async (req, res) => {
  connectDB();
  try {
    // 連接到資料庫
    const db = await connectDB();

    // 從 "posts" 集合中抓取所有資料
    const postsCollection = db.collection("posts");
    const posts = await postsCollection.find({}).toArray(); // 查詢所有資料並轉為陣列

    // 回傳資料
    res.status(200).json({
      message: "API is running",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // 關閉資料庫連線（可選）
    await client.close();
    console.log("MongoDB connection closed");
  }
  res.status(200).send("API is running");
});

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

let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    console.log("Attempting DB connection:", new Date());
    await connectDB();
    console.log("DB connected:", new Date());
    isConnected = true;
  }
  next();
});

export default app;
