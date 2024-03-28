import NotificationModel from "../../models/notifications";
import { Request, Response } from "express";
const { ObjectId } = require("mongoose").Types;

export async function updateNotification(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const { unNotifiedUsers, _id: notificationId } = req.body;
    if (!unNotifiedUsers) {
      return res.status(400).json({
        error: "400",
        message: "Bad request: unNotifiedUsers is required.",
      });
    }

    if (unNotifiedUsers.length === 1) {
      deleteNotification(notificationId);
      return res.status(200).json({
        message: "Successfully deleted notification.",
      });
    } else if (unNotifiedUsers.length > 1) {
      const UpdatedUnNotifiedUsersArray = unNotifiedUsers.filter(
        (user: string) => user.toString() !== userId
      );
      const updatedNotification = await NotificationModel.findOneAndUpdate(
        { _id: notificationId },
        { $set: { unNotifiedUsers: UpdatedUnNotifiedUsersArray } },
        { new: true }
      );
      res.status(201).json(updatedNotification);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An unexpected error occurred while editing the notification. Please try again later.",
    });
  }
}

export async function deleteNotifications(req: Request, res: Response) {
  const userId = req.params.userId;
  try {
    const allNotifications = await NotificationModel.find({
      unNotifiedUsers: userId,
    });

    for (const notification of allNotifications) {
      if (notification.unNotifiedUsers.length > 1) {
        await NotificationModel.findByIdAndUpdate(notification._id, {
          $pull: { unNotifiedUsers: userId },
        });
      } else {
        await NotificationModel.findByIdAndDelete(notification._id);
      }
    }

    res.status(200).json({ message: "Notifications processed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An unexpected error occurred while processing the notifications.",
    });
  }
}

async function deleteNotification(notificationId: string) {
  try {
    const deletedNotification = await NotificationModel.findOneAndDelete({
      _id: notificationId,
    });
    return deletedNotification;
  } catch (error) {
    console.error(error);
    return error;
  }
}
