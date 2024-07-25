const postModel = require("../model/postmodel");

const listPost = async (req, res) => {
  try {
    const allPost = await postModel.find();
    if (!allPost||allPost.length === 0) {
      return res.status(404).json({ message: "No post found" });
    }
    res.json({
      success:true,
      message: "All post found successfully",
      data: allPost,
    });
  } catch {
    res.json({
      success:false,
      message: "Internal server error",
    });
  }
};

const createPost = async (req, res) => {
  try {
    const postdata = await postModel.create(req.body);
    res.json({
      success: true,
      message: "post created successfully",
      dataId: postdata._id,
    });
  } catch {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
};

const singlePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    res.json({
      success:true,
      message:"Post found successfully",
      data: post,
    });
  } catch {
    res.json({
      success:false,
      message: "Internal server error",
    });
  }
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const updatPost = await postModel.findByIdAndUpdate(postId, {
      $set: req.body,
    });
    if (!updatPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({
      success:true,
      message: "Post updated successfully",
    });
  } catch {
    res.json({
      success:false,
      message: "Internal server error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletePost = await postModel.findByIdAndDelete(postId);
    if (!deletePost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({
      success:true,
      message: "post deleted successfully",
    });
  } catch {
    res.json({
      success:false,
      message: "Internal server error",
    });
  }
};

const postController = {
  listPost,
  createPost,
  singlePost,
  editPost,
  deletePost,
};

module.exports = postController;