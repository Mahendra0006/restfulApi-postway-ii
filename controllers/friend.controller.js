import { FriendRequest } from "../models/FriendRequest.model.js";
import { User } from "../models/User.model.js";

export const getFriends = async (req, res, next) => {
  try {
    const friendRequests = await FriendRequest.find({
      $or: [{ from: req.params.userId }, { to: req.params.userId }],
      status: "accepted",
    }).populate("from to", "name");

    const friends = friendRequests.map((fr) =>
      fr.from._id.toString() === req.params.userId ? fr.to : fr.from
    );
    res.json(friends);
  } catch (error) {
    next(error);
  }
};

export const getPendingRequests = async (req, res, next) => {
  try {
    const requests = await FriendRequest.find({
      to: req.user._id,
      status: "pending",
    }).populate("from", "name");
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const toggleFriendship = async (req, res, next) => {
  try {
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { from: req.user._id, to: req.params.friendId },
        { from: req.params.friendId, to: req.user._id },
      ],
    });

    if (existingRequest) {
      await FriendRequest.deleteOne({ _id: existingRequest._id });
      res.json({ message: "Friend request removed" });
    } else {
      const friendRequest = new FriendRequest({
        from: req.user._id,
        to: req.params.friendId,
      });
      await friendRequest.save();
      res.json({ message: "Friend request sent" });
    }
  } catch (error) {
    next(error);
  }
};

export const respondToRequest = async (req, res, next) => {
  try {
    const { status } = req.body;
    const request = await FriendRequest.findOne({
      to: req.user._id,
      from: req.params.friendId,
      status: "pending",
    });

    if (!request) throw new Error("Friend request not found");

    request.status = status;
    await request.save();
    res.json({ message: `Friend request ${status}` });
  } catch (error) {
    next(error);
  }
};
