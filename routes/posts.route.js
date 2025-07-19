import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPost,
  updatePost,
  deletePost,
  upload,
} from "../controllers/post.controller.js";
import {
  auth,
  validate,
  postValidation,
} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/all", auth, getAllPosts);
router.get("/:postId", auth, getPost);
router.get("/user/:userId", auth, getUserPosts);

// Upload middleware FIRST, then custom validation inside createPost
router.post("/", auth, upload.single("image"), createPost);

router.put("/:postId", auth, validate(postValidation), updatePost);
router.delete("/:postId", auth, deletePost);

export default router;
