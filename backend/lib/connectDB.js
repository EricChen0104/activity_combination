import mongoose from "mongoose";

const connectDB = async () => {
  const uri =
    "mongodb+srv://vercel-admin-user:dWWcota0xcQ7XNRU@cluster0.luzul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

export default connectDB;
