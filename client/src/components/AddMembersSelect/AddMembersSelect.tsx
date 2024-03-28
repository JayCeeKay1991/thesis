import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import { getAllUsers } from '@/services/UserClientService';
import { User } from '@/types/User';
import { addUserToChannel } from '@/services/ChannelClientService';
import { ChannelType } from '@/types/Channel';
import { useMainContext } from '../Context/Context';
import { HiPlus } from 'react-icons/hi2';

interface AddMembersSelectProps {
  selectedChannel: ChannelType;
  setSelectedChannel: Dispatch<SetStateAction<ChannelType | null>>;
  toggleMemberForm: () => void;
}

const AddMembersSelect = ({ selectedChannel, setSelectedChannel, toggleMemberForm }: AddMembersSelectProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [matchedUsers, setMatchedUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { user: loggedInUser } = useMainContext()


  useEffect(() => {
    // get all users to populate dropdown
    async function retrieveAllUsers() {
      try {
        const allUsers = await getAllUsers();
        // filter out logged in user and members
        const filteredUsers = allUsers.reduce((acc, curr) => {
          if (
            curr._id !== loggedInUser._id &&
            !selectedChannel.members.map((member) => member._id).includes(curr._id)
          )
            acc.push(curr);
          return acc;
        }, [] as User[]);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('error getting all users');
      }
    }
    retrieveAllUsers();
  }, []);


  const handleMemberSelect = async (userId: string) => {
    try {
      setMatchedUsers([]);
      const user = users.find((user) => user._id === userId);
      if (user) {
        // add new user to channel on back end
        const id = selectedChannel._id;
        const updatedChannel = await addUserToChannel(id, user._id);
        
        setSelectedChannel(updatedChannel);
      }
      toggleMemberForm();
    } catch (error) {
      console.error(error);
    }

  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setMatchedUsers(
        users.filter((user) =>
          user.userName
            .toLowerCase()
            .trim()
            .startsWith(e.target.value.toLowerCase().trim())
        )
      );
    } else {
      setMatchedUsers([]);
    }
  };

  return (

    <div className="flex flex-col w-[400px] z-50 pb-[10px] rounded bg-tapeBlack pl-[20px] pr-[10px] absolute">

      <input
        name="user-search"
        type="text"
        placeholder="Search for a friend..."
        onChange={handleChange}
        value={searchQuery}

        className="h-[0px] pr-[30px] pb-[20px] pt-[50px] border-tapeDarkGrey bg-tapeBlack border-none text-[25px] text-tapeWhite font-medium outline-none text-left"
      />
      <hr className="w-11/12 border-tapeDarkGrey"></hr>

      <ul className="text-tapeWhite bg-tapeOffBlack">
        {matchedUsers.length ? (
          matchedUsers.map((user) => (
            <li
              key={user._id}

              className="flex items-center bg-tapeBlack p-[10px] text-[25px] text-tapeWhite font-medium hover:bg-tapeDarkGrey rounded cursor-pointer"
              onClick={() => handleMemberSelect(user._id)}
            >
              <div
                id="profile-pic-mask"
                className="overflow-hidden rounded-full w-[50px] h-[50px] flex-none"
              >
                <img
                  src={user.profilePic}
                  alt={user.userName}
                  className="w-16 h-16 object-cover"
                  style={{ objectPosition: "center-center" }}
                />
              </div>
              <p className="text-tapeWhite mx-8 flex-grow">{user.userName}</p>
              <HiPlus name="add-button" className="mx-8  rounded-full ml-" />

            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default AddMembersSelect;
