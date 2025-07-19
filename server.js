import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import postRoutes from "./routes/posts.route.js";
import commentRoutes from "./routes/comments.route.js";
import likeRoutes from "./routes/likes.route.js";
import friendRoutes from "./routes/friends.route.js";
import otpRoutes from "./routes/otp.route.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/otp", otpRoutes);

// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
