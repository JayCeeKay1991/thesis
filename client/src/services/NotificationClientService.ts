import { apiClient } from "./ApiClient";
import { NotificationType } from "@/types/Notification";

export const deleteNotification = async (
  body: NotificationType,
  userId: string
) => {
  try {
    return await apiClient<NotificationType>(
      `notifications/${userId}`,
      "PUT",
      body
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteNotifications = async (userId: string) => {
  try {
    return apiClient<NotificationType> (
      `notifications/${userId}`,
      'PUT'
    )
  } catch (error) {
    console.error(`error deleting notifications ${error}`)
  }
}
