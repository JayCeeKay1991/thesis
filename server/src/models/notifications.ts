import { InferSchemaType } from "mongoose";
import mongoose from ".";

export type NotificationType = InferSchemaType<typeof Notifications>;

// defining data structure
const Notifications = new mongoose.Schema({
  ownerChannel: {
    type: String,
    required: true,
  },
  message: { type: String, required: true },
  unNotifiedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  date: { type: Date, required: true },
});

const NotificationModel = mongoose.model("Notifications", Notifications);

export default NotificationModel;
