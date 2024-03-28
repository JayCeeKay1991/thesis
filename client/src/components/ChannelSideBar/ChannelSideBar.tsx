import { useState, useEffect } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
// types
import { ChannelType } from '@/types/Channel';
// services
import { getChannel, deleteChannel } from '@/services/ChannelClientService';
import {
  deleteImageFromCoudinary,
  deleteMixesFromCloudinary,
} from '@/services/CloudinaryService';
// components
import { useMainContext } from '@/components/Context/Context';
import AddMembersSelect from '@/components/AddMembersSelect/AddMembersSelect';
import AddMixtapeForm from '@/components/AddMixtapeForm/AddMixtapeForm';
import CommentList from '@/components/CommentList/CommentList';
// styling
import AudioWave from '@/components/AudioWave/AudioWave';
import { GoPlus } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin5Line } from "react-icons/ri";


// utils
import ConfirmationDialog from '@/utils/ConfirmationDialog';
import { updateContextChannels } from '@/utils/sortingUtils';

type ChannelItemProps = {
  selectedChannel: ChannelType;
  setSelectedChannel: Dispatch<SetStateAction<ChannelType | null>>;
};

const ChannelSideBar = ({
  selectedChannel,
  setSelectedChannel,
}: ChannelItemProps) => {
  const { user, setUser, setChannels, setFriendsChannels, channels } = useMainContext();
  

  useEffect(() => {
    // update context channels
    if (channels.find(channel => channel._id === selectedChannel._id)) {
      updateContextChannels(setChannels, selectedChannel)
    } else {
      updateContextChannels(setFriendsChannels, selectedChannel)
    }
  }, [selectedChannel]);


  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const closeSideBar = () => {
    setSelectedChannel(null);
  };

  // Toggle members form
  const toggleMemberForm = () => {
    setShowMemberForm(!showMemberForm);
  };


  // Asks for a confirmation, shows delete button only on your channel
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  //Deleting after confirmation
  const handleConfirmDelete = async () => {
    await deleteChannel(selectedChannel._id);

    // if there is a channel picture, delete the pic from cloudinary
    if (selectedChannel.picture) {
      await deleteImageFromCoudinary(selectedChannel.picture);
    }

    // if there is a mixtape in the channel, delete the mixtapes from cloudinary
    if (selectedChannel.mixTapes.length) {
      for (const mixTape of selectedChannel.mixTapes) {
        await deleteMixesFromCloudinary(mixTape.url);
      }
    }

    // update the dashboard
    setUser((prevList) => ({
      ...prevList,
      channels: prevList.channels.filter((el) => el._id !== selectedChannel._id),
    }));
    setSelectedChannel(null);
  };

  return (
    <div
      id="channel"
      className="w-[390px] h-[700px] ml-[30px] flex-none flex flex-col items-center p-[30px] rounded-[30px] overflow-scroll border-[1px]"
    >
      <div
        id="channel-element"
        className="text-tapeWhite w-full h-[300px] flex-none rounded-[20px] bg-gradient-to-r from-tapePink to-tapeYellow mb-[10px] relative overflow-hidden"
      >
        <div className="absolute right-[10px] top-[10px]">
          <button className="border-none" onClick={closeSideBar}>
            <RxCross2 size={30} />
          </button>
        </div>
        <div className="flex flex-row ml-[50px] mt-[50px] absolute bottom-[15px]">
          {selectedChannel?.members.map((member, index) => {
            return (
              <div
                key={index}
                className="w-[60px] h-[60px] overflow-hidden rounded-full border-tapePink border-[2px] -ml-[30px] flex-none bg-tapeOffBlack"
              >
                <img src={member.profilePic}></img>
              </div>
            );
          })}
          <div className="-ml-[30px] z-10 ">
            <button
              className="w-[60px] h-[60px] flex flex-row justify-center items-center bg-tapeBlack rounded-full border-tapePink border-[2px]"
              onClick={toggleMemberForm}
            >
              <GoPlus className="text-tapeWhite" size={30} />
            </button>
          </div>
          <AudioWave></AudioWave>
        </div>

        <img src={selectedChannel?.picture} className="w-full h-full object-cover" />
      </div>

      {showMemberForm && (
        <AddMembersSelect
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          toggleMemberForm={toggleMemberForm}
        />
      )}

      <div className="w-full flex flex-col mb-[40px]">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-[26px] font-semibold mb-[6px]">
            {selectedChannel?.name}
          </h1>
          {selectedChannel?.owner.toString() === user._id && (
            <>
              <button
                className="border-none text-[20px] font-medium text-tapeDarkGrey hover:text-tapeWhite"
                onClick={handleDelete}
              >
                <RiDeleteBin5Line
                  className="text-tapeDarkGrey hover:text-tapeWhite cursor-pointer"
                  size={17}
                />
              </button>
              {showConfirmation && (
                <ConfirmationDialog
                  isOpen={showConfirmation}
                  onCancel={() => setShowConfirmation(false)}
                  onConfirm={handleConfirmDelete}
                />
              )}
            </>
          )}
        </div>

        <div className="flex flex-row">
          <p className="mr-[10px] pr-[10px] pl-[10px] pb-[5px] pt-[5px] text-[10px] font-semibold border-[1px] rounded-full border-tapeDarkGrey text-tapeDarkGrey flex-none">
            {selectedChannel?.mixTapes.length
              ? `${selectedChannel?.mixTapes.length} mixtape${
                  selectedChannel?.mixTapes.length === 1 ? "" : "s"
                }`
              : "0 mixtapes"}
          </p>
          <p className="text-[10px] pr-[10px] pl-[10px] pb-[5px]  pt-[5px] font-semibold border-[1px] rounded-full border-tapeDarkGrey text-tapeDarkGrey">
            {selectedChannel?.members.length
              ? `${selectedChannel?.members.length} member${
                  selectedChannel?.members.length === 1 ? "" : "s"
                }`
              : "0 members"}
          </p>
        </div>
      </div>

      <CommentList channel={selectedChannel} />

      <AddMixtapeForm
        channelId={selectedChannel._id}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />
    </div>
  );
};
export default ChannelSideBar;
