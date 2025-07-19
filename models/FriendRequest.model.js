import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender is required"],
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Recipient is required"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FriendRequest = mongoose.model(
  "FriendRequest",
  friendRequestSchema
);
