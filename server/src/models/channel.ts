import { InferSchemaType } from 'mongoose';
import mongoose from '.';
import { Document } from 'mongoose';

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
});

// update the user when a channel has been posted
async function updateUser(doc: ChannelDocument) {
  await mongoose
    .model('User')
    .updateOne({ _id: doc.owner }, { $push: { channels: doc } });
}

Channel.post('save', updateUser);

const ChannelModel = mongoose.model('Channel', Channel);

export default ChannelModel;
