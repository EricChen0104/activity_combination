import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    // console.log(process.env.test);
    console.log("Mongodb is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
