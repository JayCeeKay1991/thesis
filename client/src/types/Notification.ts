import { ChannelType } from "./Channel";

export type NotificationType = {
  _id: string;
  ownerChannel: ChannelType;
  message: string;
  unNotifiedUsers: string[];
  date: Date;
};

export interface displayNotification {
  channelName: string;
  notifications: NotificationType[];
}
