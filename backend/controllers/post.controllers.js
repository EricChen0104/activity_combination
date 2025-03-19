import Post from "../models/post.model.js";
import User from "../models/user.model.js";

import mongoose from "mongoose";

export const getPost = async (req, res) => {
  console.log("getting post");
  try {
    const posts = await Post.find().lean(); // Use .lean() for faster queries
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res
      .status(500)
      .json({ message: "Failed to get posts", error: error.message });
  }
};

export const searchPost = async (req, res) => {
  const { search } = req.query;
  let query = {};

  try {
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { detail: { $regex: search, $options: "i" } }, // also search in detail field
      ];
    }

    const posts = await Post.find(query);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);

  const post = await newPost.save();
  res.status(200).json("Post has been created!");
};

export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json("Post has been deleted!");
};

export const savePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post is already saved
    const isSaved = user.savedPosts.includes(postId);

    if (isSaved) {
      // If so, remove it
      user.savedPosts = user.savedPosts.filter(
        (savedPostId) => savedPostId.toString() !== postId
      );
      post.savedBy = post.savedBy.filter(
        (savedPostId) => savedPostId.toString() !== userId
      );
    } else {
      // If not, add it
      user.savedPosts.push(postId);
      if (!post.savedBy) {
        post.savedBy = [];
      }
      post.savedBy.push(userId);
    }

    await user.save();
    await post.save();

    res.status(200).json({
      message: `Post ${isSaved ? "unsaved" : "saved"} successfully`,
      post,
    });
  } catch (error) {
    console.error("Error saving/unsaving post:", error);
    res
      .status(500)
      .json({ message: "Failed to save/unsave post", error: error.message });
  }
};
