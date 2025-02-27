import Post from "../models/post.model.js";

export const getPost = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
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
