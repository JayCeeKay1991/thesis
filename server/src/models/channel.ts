import { InferSchemaType } from 'mongoose';
import mongoose from '.';
import { Document } from 'mongoose';
import MixTapeModel from './mixTape';

type ChannelDocument = Document<unknown, {}, ChannelType> & ChannelType;

export type ChannelType = InferSchemaType<typeof Channel>;

// defining data structure
const Channel = new mongoose.Schema({
  name: { type: String, required: true },
  picture: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  mixTapes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MixTape',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notifications',
    },
  ],
});

const deleteAllMixTapes = async (doc: ChannelDocument) => {
  doc.mixTapes.forEach(async (mixTape) => {
    await MixTapeModel.findByIdAndDelete(mixTape);
  });
};

Channel.post('findOneAndDelete', deleteAllMixTapes);

const ChannelModel = mongoose.model('Channel', Channel);

export default ChannelModel;
