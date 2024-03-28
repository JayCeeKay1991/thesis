import { User } from './User';
import { MixTape } from './MixTape';
import { CommentsType } from './Comments';
import { NotificationType } from './Notification';

export type ChannelType = {
  _id: string;
  name: string;
  picture: string;
  owner: User;
  members: User[];
  mixTapes: MixTape[];
  comments: CommentsType[];
  notifications: NotificationType[];
};