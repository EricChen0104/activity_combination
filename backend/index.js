import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";

import { MongoClient } from "mongodb";

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
  const uri =
    "mongodb+srv://vercel-admin-user:dWWcota0xcQ7XNRU@cluster0.luzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  async function run() {
    try {
      // 連接到資料庫
      await client.connect();
      const database = client.db("myFirstDatabase");
      const postsCollection = database.collection("posts");

      // 查詢所有 posts
      const allPosts = await postsCollection.find({}).toArray(); // 使用空條件 {} 查詢所有資料

      // 回傳結果
      res.status(200).json({
        message: "Posts retrieved successfully",
        data: allPosts,
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // 關閉連線
      await client.close();
    }
  }

  await run().catch(console.dir);
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

app.listen(3000, () => {
  console.log("api running");
});

export default app;
