import { ChannelType } from "./Channel";
import { MixTape } from "./MixTape";

export type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  channels: ChannelType[];
  mixTapes: MixTape[];
};
