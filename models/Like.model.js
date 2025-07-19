import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Target ID is required"],
  },
  targetType: {
    type: String,
    enum: ["Post", "Comment"],
    required: [true, "Target type is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Like = mongoose.model("Like", likeSchema);
