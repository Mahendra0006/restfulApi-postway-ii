import { Comment } from "../models/Comment.model.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      "name"
    );
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      post: req.params.postId,
      user: req.user._id,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      user: req.user._id,
    });
    if (!comment) throw new Error("Comment not found or unauthorized");

    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      user: req.user._id,
    });
    if (!comment) throw new Error("Comment not found or unauthorized");
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
