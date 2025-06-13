const post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newPost = await Post.create({ title, description });

    res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // نجيب كل البوستات
    res.json({ data: posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // ناخد ID من الرابط
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ data: post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body, // البيانات الجديدة
      { new: true } // يرجع البوست بعد التعديل
    );

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post updated", data: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted", data: deletedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};
