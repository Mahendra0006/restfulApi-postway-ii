import { Post } from "../models/Post.model.js";
import multer from "multer";
import { body, validationResult } from "express-validator";

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jpg, png files are allowed"), false);
    }
  },
});

// Post Creation Controller
export const createPost = async (req, res, next) => {
  try {
    // Manually validate "content"
    await body("content")
      .trim()
      .notEmpty()
      .withMessage("Content is required")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new Post({
      user: req.user._id,
      content: req.body.content,
      image: req.file ? req.file.path : null,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate(
      "user",
      "name"
    );
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "user",
      "name"
    );
    if (!post) throw new Error("Post not found");
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      user: req.user._id,
    });
    if (!post) throw new Error("Post not found or unauthorized");

    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.postId,
      user: req.user._id,
    });
    if (!post) throw new Error("Post not found or unauthorized");
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
