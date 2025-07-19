import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("AUTH HEADER:", authHeader); // 🐞 Debug
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) throw new Error("Authentication required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error("User not found");

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
