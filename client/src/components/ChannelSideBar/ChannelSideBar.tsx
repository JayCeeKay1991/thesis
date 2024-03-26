import { useState, useEffect } from 'react';
// types
import { ChannelType } from '@/types/Channel';
// services
import { getChannel, deleteChannel } from '@/services/ChannelClientService';
// components
import { useMainContext } from '@/components/Context/Context';
import AddMembersSelect from '@/components/AddMembersSelect/AddMembersSelect';
import AddMixtapeForm from '@/components/AddMixtapeForm/AddMixtapeForm';
import CommentList from '@/components/CommentList/CommentList';
// styling
import AudioWave from '@/components/AudioWave/AudioWave';
import { GoPlus } from 'react-icons/go';
// utils
import ConfirmationDialog from '@/utils/ConfirmationDialog';

type ChannelItemProps = {
  selectedChannel: ChannelType | null;
};

const ChannelSideBar = ({ selectedChannel }:ChannelItemProps) => {
  const { user, setUser } = useMainContext();
  if (selectedChannel === null) {
    return
  }
  const [channel, setChannel] = useState<ChannelType>(selectedChannel);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Toggle members form
  const toggleMemberForm = () => {
    setShowMemberForm(!showMemberForm);
  };

  // Toggle comments
  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  // Asks for a confirmation, shows delete button only on your channel
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  //Deleting after confirmation
  const handleConfirmDelete = async () => {
    await deleteChannel(channel._id);

    // update the dashboard
    setUser((prevList) => ({
      ...prevList,
      channels: prevList.channels.filter((el) => el._id !== channel._id),
    }));

  };

  return (
    <div
      id="channel"
      className="w-[450px] h-[710px] flex flex-col items-center bg-tapeOffBlack p-[20px] rounded-[20px] overflow-scroll abs"
    >
      <div
        id="channel-element"
        className="text-tapeWhite w-full h-[300px] rounded-2xl bg-gradient-to-r from-tapePink to-tapeYellow mb-[20px] relative flex-none"
      >

        <div>
          <div className="flex flex-row ml-[50px] mt-[50px] absolute bottom-[15px]">
            {channel?.members.map((member, index) => {
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
              {showMemberForm && (
                <AddMembersSelect
                  channel={channel}
                  setChannel={setChannel}
                  toggleMemberForm={toggleMemberForm}
                />
              )}
            </div>
          </div>
          <AudioWave></AudioWave>
        </div>

        <img src={channel?.picture} className="w-full rounded-2xl object-cover" />
      </div>

      <div className="flex flex-col">
        <h1 className="text-[55px] font-medium mb-[20px]">{channel?.name}</h1>

        <div className="flex flex-row">
          <p className="mr-[20px] font-medium">
            {channel?.mixTapes.length
              ? `${channel?.mixTapes.length} mixtape${
                  channel?.mixTapes.length === 1 ? "" : "s"
                }`
              : "0 mixtapes"}
          </p>
          <p className="font-medium">
            {channel?.members.length
              ? `${channel?.members.length} member${
                  channel?.members.length === 1 ? "" : "s"
                }`
              : "0 members"}
          </p>
        </div>
      </div>

      <div className="w-[400px] h-[100px] pl-[50px] pr-[50px] flex flex-col items-start">
        <div className="flex flex-row">
          {isCommentsOpen ? (
            <>
              <button
                className="border-none mr-[40px] text-[20px] font-medium text-tapeWhite"
                onClick={toggleComments}
              >
                Comments
              </button>
              <button
                className="border-none mr-[40px] text-[20px] font-medium text-tapeDarkGrey"
                onClick={toggleComments}
              >
                Uploads
              </button>
              {channel?.owner.toString() === user._id && (
                <>
                  <button
                    className="border-none mr-[40px] text-[20px] text-tapeDarkGrey hover:text-tapeWhite"
                    onClick={handleDelete}
                  >
                    Delete
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
            </>
          ) : (
            <>
              <button
                className="border-none mr-[40px] text-[20px] text-tapeDarkGrey"
                onClick={toggleComments}
              >
                Comments
              </button>
              <button
                className="border-none mr-[40px] text-[20px] text-tapeWhite"
                onClick={toggleComments}
              >
                Uploads
              </button>

              {channel?.owner.toString() === user._id && (
                <>
                  <button
                    className="border-none mr-[40px] text-[20px] text-tapeDarkGrey hover:text-tapeWhite"
                    onClick={handleDelete}
                  >
                    Delete
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
            </>
          )}
        </div>
        <hr className="w-full mt-[20px] border-tapeDarkGrey"></hr>
      </div>
      {isCommentsOpen ? (
        <CommentList channel={selectedChannel} />
      ) : (
        <AddMixtapeForm
          channelId={channel._id}
          channel={channel}
          setChannel={setChannel}
        />
      )}
    </div>
  );
};
export default ChannelSideBar;