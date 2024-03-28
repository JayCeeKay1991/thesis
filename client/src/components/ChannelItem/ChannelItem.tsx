
import React, { Dispatch, SetStateAction, useState } from "react";
import { usePlayerContext } from "../Context/PlayerContext";
import { generateStream } from "@/utils/streamCreationHelpers";
import { ChannelType, } from '@/types/Channel';
import { IoMdPlay } from "react-icons/io";

type ChannelItemProps = {
  channel: ChannelType;
  setSelectedChannel: (channel: ChannelType) => void;
  showChannel: boolean;
  setShowChannel: Dispatch<SetStateAction<boolean>>;
};

const ChannelItem = ({ channel, setSelectedChannel, showChannel, setShowChannel }: ChannelItemProps) => {
  const [isPlayClicked, setIsPlayClicked] = useState<boolean>(false);
  const {currentStream, streamIndex, setStreamIndex, setPlaying, setCurrentStream } = usePlayerContext();

  const handleClick = () => {
    setSelectedChannel(channel)
    setShowChannel(true)
  }

  const playChannel = async () => {
    console.log(channel)
    if (isPlayClicked) {
      return;
    }
    setIsPlayClicked(true);
    if (currentStream[streamIndex]) {
      currentStream[streamIndex].stop();
      setPlaying(false);
    }
    try {
      const stream = await generateStream(channel, setStreamIndex, streamIndex);
      console.log('new stream ready', stream)
      setCurrentStream(stream);
    } catch (error) {
      console.error('Error occurred while loading stream:', error);
    } finally {
      setIsPlayClicked(false);
    }
  };

  return (
    <button
      className="w-[320px] h-[350px] p-[20px] relative border-[1px] border-tapeWhite rounded-[30px] flex flex-col justify-between"
      onClick={handleClick}
    >
      <div
        id="image-wrap"
        className="w-full h-[205px] relative flex flex-col justify-center items-center rounded-[20px] overflow-hidden"
      >
        <div className="w-full h-full absolute flex flex-col justify-center items-center opacity-0 hover:opacity-100 ease-in-out duration-200">
          <IoMdPlay
            size={90}
            className="text-tapeWhite"
            onClick={playChannel}
          />
        </div>
        <img
          id="channel-thumbnail"
          src={channel.picture}
          className="object-cover w-full h-full"
          data-testid="channel-picture"
        ></img>
      </div>

      <h2
        className="w-full text-[28px] text-wrap text-left"
        data-testid="channel-name"
      >
        {channel.name}
      </h2>

      <div id="channel-item-footer" className="flex flex-row">
        <p className="w-[100px] h-[30px] text-[10px] flex flex-row justify-center items-center mr-[10px] border-[1px] rounded-full">
          {channel.mixTapes.length
            ? `${channel.mixTapes.length} mixtape${
                channel.mixTapes.length === 1 ? "" : "s"
              }`
            : "No mixtapes"}
        </p>
        <p className="w-[100px] h-[30px] text-[10px] flex flex-row justify-center items-center mr-[20px] border-[1px] rounded-full">
          {channel.members.length
            ? `${channel.members.length} member${
                channel.members.length === 1 ? "" : "s"
              }`
            : "No members"}
        </p>
      </div>
    </button>
  );
};

export default ChannelItem;
