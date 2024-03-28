import { Request, Response } from "express";
import ChannelModel, { ChannelType } from "../../models/channel";
import UserModel from "../../models/user";
import CommentsModel from "../../models/comments";
import mongoose from "mongoose";

export const getChannelsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const channelsWithUser = await ChannelModel.find({ members: userId })
      .populate({
        path: "members",
        model: "User",
      })
      .populate({
        path: "mixTapes",
        model: "MixTape",
      })
      .populate({
        path: "comments",
        model: "Comments",
        populate: [
          {
            path: "owner",
            model: "User"
          },
        ],
      })
      .populate({
        path: "notifications",
        model: "Notifications"
      })
    res.status(200).json(channelsWithUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getChannel = async (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  try {
    const channel = await ChannelModel.findById(channelId)
      .populate({
        path: "members",
        model: "User",
      })
      .populate({
        path: "mixTapes",
        model: "MixTape",
      })
      .populate({
        path: "comments",
        model: "Comments",
        populate: [
          {
            path: "owner",

          },
        ],
      });

    if (!channel) {
      res.status(400).json("No channel with that id!");
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json(`Error retrieving channel`);
  }
};

export const createChannel = async (req: Request, res: Response) => {
  try {
    const newChannel = new ChannelModel<ChannelType>(req.body);
    const savedChannel = await newChannel.save();

    // update owner
    const updatedUser = await UserModel.updateOne({ _id: savedChannel.owner }, { $push: { channels: savedChannel._id } });

    res.status(201).json(savedChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create channel." });
  }
};

export const addUserToChannel = async (req: Request, res: Response) => {
  try {
    const channelId = req.params.channelId;
    const userId = req.params.userId;

    const newMember = await UserModel.findById(userId);

    if (!userId) {
      res.status(400).json("UserId required");
    }

    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      res.status(400).json("Channel not found");
    } else {
      if (channel.members.includes(newMember!._id)) {
        res.status(400).json("User is already a member of this channel");
      }

      // user not already a member, add and save
      channel.members.push(newMember!._id);
      await channel.save();
      const updatedChannel = await ChannelModel.findById(channelId).populate(
        "members"
      );
      res.status(201).json(updatedChannel);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json(`Error adding user to channel`);
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const channelId = req.params.channelId;
    const { owner, message, date } = req.body;

    const newComment = await CommentsModel.create({ owner, message, date });

    const updatedChannel = await ChannelModel.findByIdAndUpdate(
      channelId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");

    if (!updatedChannel) {
      return res.status(400).json("Channel not found");
    }

    res.status(201).json(updatedChannel);
  } catch (error) {
    console.error(error);
    res.status(500).json(`Error adding comment`);
  }
};

// DELETE CHANNEL
export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const channelId = req.params.channelId;

    const deletedChannel = await ChannelModel.findOneAndDelete({
      _id: channelId,
    });

    if (!deletedChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    if (deletedChannel) {
      await mongoose
        .model('User')
        .updateOne(
          { _id: deletedChannel.owner },
          { $pull: { channels: channelId } }
        );
    }

    res.status(204).json({ msg: 'Channel deleted' });
    return;

  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred while deleting the channel",
    });
  }
};
