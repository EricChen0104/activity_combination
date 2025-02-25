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
});

export default mongoose.model("Post", postSchema);
