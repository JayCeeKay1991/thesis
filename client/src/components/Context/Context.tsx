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
import { MixTape } from '@/types/Mixtape';
import { getUserById } from '@/services/UserClientService';
import { useNavigate } from 'react-router-dom';

type MainContext = {
  user: User;
  currentStreamUrls: string[];
  streamIndex: number;
  playing: boolean;
  currentPlaybackTime: number;
  isAuthenticated: boolean; // New authentication state
  setUser: Dispatch<SetStateAction<User>>;
  setChannels: Dispatch<SetStateAction<ChannelType[]>>;
  setMixTapes: Dispatch<SetStateAction<MixTape[]>>;
  setCurrentStreamUrls: Dispatch<SetStateAction<string[]>>;
  setStreamIndex: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setCurrentPlaybackTime: Dispatch<SetStateAction<number>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>; // New setter for authentication state
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

const initialStateAuthentication =
  localStorage.getItem('isAuthenticated') === 'true';

const initialContext = {
  user: initialStateUser,
  currentStreamUrls: [],
  playing: false,
  streamIndex: 0,
  currentPlaybackTime: 0,
  isAuthenticated: initialStateAuthentication, // Initialize isAuthenticated to false
  setUser: () => {},
  setChannels: () => {},
  setMixTapes: () => {},
  setCurrentStreamUrls: () => {},
  setPlaying: () => false,
  setStreamIndex: () => 0,
  setCurrentPlaybackTime: () => 0,
  setIsAuthenticated: () => {}, // Initialize setIsAuthenticated
};

const MainContext = createContext<MainContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialStateUser);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [mixTapes, setMixTapes] = useState<MixTape[]>([]);
  const [currentStreamUrls, setCurrentStreamUrls] = useState<string[]>([]);
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialStateAuthentication
  ); // Initialize isAuthenticated state

  console.log(isAuthenticated);

  useEffect(() => {
    // Check if user is authenticated
    // const initialState = auth.isAuthenticated();
    // console.log(initialState);
    // setIsAuthenticated(initialState);
    const storedIsAuthenticated =
      localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedIsAuthenticated);

    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('loggedinUser');

        if (userId) {
          const foundUser = await getUserById(userId);
          if (foundUser) {
            setUser(foundUser);
            setChannels(foundUser.channels);
            setMixTapes(foundUser.mixTapes);
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
        currentStreamUrls,
        setUser,
        setChannels,
        setMixTapes,
        setCurrentStreamUrls,
        streamIndex,
        setStreamIndex,
        playing,
        setPlaying,
        currentPlaybackTime,
        setCurrentPlaybackTime,
        isAuthenticated, // Pass isAuthenticated to context value
        setIsAuthenticated, // Pass setIsAuthenticated to context value
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}
