import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from 'react';

import { User } from '@/types/User';
import { ChannelType } from '@/types/Channel';
import { MixTape } from '@/types/MixTape';
import { getProfile, getUserById } from '@/services/UserClientService';
import { useNavigate } from 'react-router-dom';
import { getChannelsUserMemberOf } from '@/services/ChannelClientService';

type MainContext = {
  user: User;
  channels: ChannelType[];
  friendsChannels: ChannelType[];
  mixTapes: MixTape[];
  setUser: Dispatch<SetStateAction<User>>;
  setChannels: Dispatch<SetStateAction<ChannelType[]>>;
  setMixTapes: Dispatch<SetStateAction<MixTape[]>>;
  setFriendsChannels: Dispatch<SetStateAction<ChannelType[]>>;
};

export const initialStateUser = {
  _id: '',
  userName: '',
  email: '',
  password: '',
  profilePic: '',
  channels: [],
  mixTapes: [],
};

const initialContext = {
  user: initialStateUser,
  channels: [],
  friendsChannels: [],
  mixTapes: [],
  setUser: () => {},
  setChannels: () => {},
  setMixTapes: () => {},
  setFriendsChannels: () => {}
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialStateUser);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [mixTapes, setMixTapes] = useState<MixTape[]>([]);
  const [friendsChannels, setFriendsChannels] = useState<ChannelType[]>([])

  useEffect(() => {

    // get channels that user is member of
    async function getFriendsChannels (userId: string) {
      const channelsUserIn = await getChannelsUserMemberOf(userId);
      setFriendsChannels(channelsUserIn)
    }
    const fetchUser = async () => {
      try {
        // get user profile if there is a session
        const userProfile = await getProfile();
        if (userProfile) {
          // if there is a profile in the session, get user by id, here we use get user by id, because it populates the user
          const foundUser = await getUserById(userProfile._id);
          if (foundUser) {
            setUser(foundUser);
            setChannels(foundUser.channels);
            setMixTapes(foundUser.mixTapes);
            getFriendsChannels(userProfile._id)
          }
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        channels,
        friendsChannels,
        setChannels,
        mixTapes,
        setMixTapes,
        setFriendsChannels
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
