import { apiClient } from "./ApiClient";
import { ChannelType } from "@/types/Channel";
import { CommentsType } from "../types/Comments";


// GET REQUESTS

// Get channel by id GET
export const getChannel = async (channelId: string) => {
  return await apiClient<ChannelType>(`channels/${channelId}`);
};

// Get channels for the logged in user GET
export const getChannelsByUser = async (userId: string) => {
  return await apiClient<ChannelType[]>(`channels/${userId}`);
};

// POST REQUESTS
export const createChannel = async (body: Omit<ChannelType, "_id">) => {
  return await apiClient<ChannelType>("channels", "POST", body);
};

// Add user to channel
export const addUserToChannel = async (channelId: string, userId: string) => {
  return await apiClient<ChannelType>(
    `channels/${channelId}/${userId}`,
    "POST"
  );
};

// Add message to channel
export const addComment = async (channelId: string, body: CommentsType) => {
  return await apiClient<ChannelType>(`channels/${channelId}`, 'POST', body);
};


// PUT REQUESTS

// Edit channel
export const editChannel = async (channelId: string, body: ChannelType) => {
  return await apiClient<ChannelType>(`channels/${channelId}`, "PUT", body);
};

// Delete channel
export async function deleteChannel(channelId: string) {
  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER ||
        'http://localhost:3001' + '/channels/' + channelId,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }
    );
    if (!response.ok) throw new Error('Failed to delete');

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

