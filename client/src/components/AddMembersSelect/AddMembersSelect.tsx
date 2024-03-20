import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { getAllUsers } from '../../services/UserClientService'
import { User } from '../../types/User'
import johnMartin from '../../components/AppNav/johnmartin.jpg'
import { addUserToChannel } from '../../services/ChannelClientService';
import { ChannelType } from '../../types/Channel';
import { HiPlus } from "react-icons/hi";
import { useMainContext } from '../Context/Context';


interface AddMembersSelectProps {
  channel: ChannelType
  setChannel: Dispatch<SetStateAction<ChannelType>>
}

const AddMembersSelect = ({ channel, setChannel }: AddMembersSelectProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [matchedUsers, setMatchedUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { user: loggedInUser } = useMainContext()

  useEffect(() => {
    // get all users to populate dropdown
    async function retrieveAllUsers() {
      try {
        const allUsers = await getAllUsers();
        const filteredUsers = allUsers.filter( user => user._id !== loggedInUser._id)
        setUsers(filteredUsers)
      } catch (error) {
        console.error('error getting all users')
      }
    }
    retrieveAllUsers();
  }, [])

  const handleMemberSelect = async (userId: string) => {
    setMatchedUsers([])
    const user = users.find(user => user._id === userId);
    if (user) {
      // add new user to channel on back end
      const id = channel._id;
      const updatedChannel = await addUserToChannel(id, user._id)
      setChannel(updatedChannel);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value) {
      setMatchedUsers(users.filter(user => user.userName.toLowerCase().trim().startsWith(e.target.value.toLowerCase().trim())))
    } else {
      setMatchedUsers([])
    }
  }

  return (

    <div className='flex flex-col w-[400px] pb-[10px] rounded bg-tapeBlack'>
      <input type='text' placeholder='Search for a friend...' onChange={handleChange} value={searchQuery} className="h-[0px] p-[30px] border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-medium outline-none" />
      <ul className='text-tapeWhite bg-tapeOffBlack'>
        {matchedUsers.length ? matchedUsers.map(user => (
          <li
            key={user._id}
            className='flex items-center bg-tapeBlack p-[10px] text-[25px] text-tapeWhite font-medium hover:bg-tapeOffBlack rounded cursor-pointer'> {/* Changed here */}
            <div id='profile-pic-mask' className="overflow-hidden rounded-full w-[50px] h-[50px]">
              <img
                src={user.profilePic ? user.profilePic : johnMartin}
                alt={user.userName}
                className='w-16 h-16 object-cover'
                style={{ objectPosition: 'center-center' }}
              />
            </div>
            <p className='text-tapeWhite mx-8'>{user.userName}</p>
            <HiPlus onClick={() => handleMemberSelect(user._id)} className='mx-8  rounded-full ml-40'/>
          </li>
        )) : <></>}
      </ul>
    </div>
  );
};

export default AddMembersSelect