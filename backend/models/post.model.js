import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "",
  },
  detail: {
    type: String,
    default: "",
  },
  region_tag: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
    required: true,
  },
  savedBy: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of User IDs who saved the post
    default: [], // VERY IMPORTANT: Initialize to an empty array
  },
});

export default mongoose.model("Post", postSchema);
