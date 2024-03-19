import { Request, Response } from "express";
import MixTapeModel from "../../models/mixTape";
import ChannelModel from "../../models/channel";
import UserModel from "../../models/user";

export const createMixTape = async (req: Request, res: Response) => {
  try {
    const {name, url, duration, channels, creator, parentChannel } = req.body;
    const creatorId = creator._id.toString();
    const parentChannelId = parentChannel._id.toString();
    const newMixTape = new MixTapeModel({
      name: name,
      url: url,
      duration: duration,
      creator: creatorId,
      channels: channels || []
    });
    const savedMixTape = await newMixTape.save();

    // update the channel
    const channel = await ChannelModel.findOneAndUpdate(
      {_id: parentChannelId},
      {$push: {mixTapes: savedMixTape._id}},
      {new: true}
    ).orFail(new Error('Channel not found in db'));;

    // update the owner
    const userToUpdate = await UserModel.findOneAndUpdate(
      {_id: creatorId},
      {$push: {mixTapes: savedMixTape._id}},
      {new: true}
    ).orFail(new Error('User not found in db'));;

    res.send(savedMixTape);
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ message: "Could not create mixtape." });
  }
}