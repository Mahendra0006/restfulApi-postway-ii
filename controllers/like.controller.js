import { Like } from "../models/Like.model.js";

export const getLikes = async (req, res, next) => {
  try {
    const likes = await Like.find({ targetId: req.params.id }).populate(
      "user",
      "name"
    );
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const { targetType } = req.body;
    const existingLike = await Like.findOne({
      user: req.user._id,
      targetId: req.params.id,
      targetType,
    });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      res.json({ message: "Like removed" });
    } else {
      const like = new Like({
        user: req.user._id,
        targetId: req.params.id,
        targetType,
      });
      await like.save();
      res.json({ message: "Like added" });
    }
  } catch (error) {
    next(error);
  }
};
