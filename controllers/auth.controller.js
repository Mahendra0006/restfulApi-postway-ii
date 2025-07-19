import { User } from "../models/User.model.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;
    const user = new User({ name, email, password, gender });
    await user.save();

    const token = generateToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res
      .status(201)
      .json({ user: { id: user._id, name, email, gender }, token });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({
      user: { id: user._id, name: user.name, email, gender: user.gender },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
    await req.user.save();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const logoutAllDevices = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ message: "Logged out from all devices" });
  } catch (error) {
    next(error);
  }
};
