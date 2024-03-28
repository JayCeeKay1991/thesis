import { ChannelType } from "@/types/Channel";
import { Dispatch, SetStateAction } from "react";

// sort channelList by number  of members
  export const sortByMembers = (channelItems: ChannelType[]) => {
    return channelItems.sort((a, b) => b.members.length - a.members.length);
  }

   // sort channelList by number  of members
   export const sortByMixtapes = (channelItems: ChannelType[]) => {
    return channelItems.sort((a, b) => b.mixTapes.length - a.mixTapes.length);
  }
  
  // update context channels
  export const updateContextChannels = (setter: Dispatch<SetStateAction<ChannelType[]>>, updatedChannel: ChannelType) => {
    setter(prev => [...prev.filter((channel) => channel._id !== updatedChannel._id), updatedChannel])
  }