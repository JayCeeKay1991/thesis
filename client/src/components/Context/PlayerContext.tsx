import {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    useEffect
} from 'react';

import { Howl } from 'howler';


type PlayerContext = {
    
    // current stream of mixtapes, rendered by channel
    currentStream: Howl[];
    setCurrentStream: Dispatch<SetStateAction<Howl[]>>;

    // index of current mixtape in stream
    streamIndex: number;
    setStreamIndex: Dispatch<SetStateAction<number>>;

    // playing or not
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;

    // muted or not
    muted: boolean;
    setMuted: Dispatch<SetStateAction<boolean>>;

    playbackPosition: number,
    setPlaybackPosition: Dispatch<SetStateAction<number>>


};

const initialContext = {
    currentStream: [],
    setCurrentStream: () => { },

    streamIndex: 0,
    setStreamIndex: () => 0,

    playing: false,
    setPlaying: () => { },

    muted: false,
    setMuted: () => {},

    playbackPosition: 0,
    setPlaybackPosition: () => 0,

};

const PlayerContext = createContext<PlayerContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
    // player contexts
    const [currentStream, setCurrentStream] = useState<Howl[]>([]);
    const [streamIndex, setStreamIndex] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(false);
    const [playbackPosition, setPlaybackPosition] = useState<number>(0)

    useEffect(() => {
        return () => {
            console.log('cleaning up player context')
            Howler.stop()
            Howler.unload()
        };
    }, [currentStream]);
    
    return (
        <PlayerContext.Provider
            value={{
                currentStream,
                setCurrentStream,
                streamIndex,
                setStreamIndex,
                playing,
                setPlaying,
                muted,
                setMuted,
                playbackPosition,
                setPlaybackPosition
            }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}
