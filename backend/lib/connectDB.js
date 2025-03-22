import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://vercel-admin-user:dWWcota0xcQ7XNRU@cluster0.luzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    // console.log(process.env.test);
    console.log("Mongodb is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
