import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 連接到 MongoDB
    await mongoose.connect(
      "mongodb+srv://vercel-admin-user:dWWcota0xcQ7XNRU@cluster0.luzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    // 監聽連線成功事件
    mongoose.connection.on("connected", async () => {
      console.log("MongoDB is connected successfully");
    });

    // 監聽連線錯誤事件
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    // 監聽斷線事件（可選）
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB is disconnected");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err; // 可選：拋出錯誤，讓呼叫者處理
  }
};

export default connectDB;
