import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    savedPosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }], // Array of Post IDs
      default: [],
    },
    otp: {
      type: String,
      default: null,
    }, // 儲存 OTP
    otpExpiry: {
      type: Date,
      default: null,
    }, // OTP 到期時間
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
