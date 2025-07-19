import { User } from "../models/User.model.js";

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -tokens"
    );
    if (!user) throw new Error("User not found");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -tokens");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserDetails = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "gender"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) throw new Error("Invalid updates");

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
