import { useRef, useEffect } from 'react';
// styling
import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './Player.css';
// context
import { usePlayerContext } from '../Context/PlayerContext';

// I know it seems like I could use a variable name or a local or context state for the currentMixtape rather than currentStream[streamIndex] but for some reason of lifecyles? that breaks it.

const Player = () => {
    const {
        currentStream,
        playing,
        setPlaying,
        streamIndex,
        setStreamIndex,
        muted,
        setMuted,
        setPlaybackPosition } = usePlayerContext()
    // refs
    const totalDurationRef = useRef<HTMLParagraphElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Re-render when current stream or index changes
        console.log('re rendering player')
        if (progressBarRef.current) {
            progressBarRef.current.value = '0';
        }
        if (currentStream[streamIndex]) {
            currentStream[streamIndex].play()
            setPlaying(true);
            setPlaybackPosition(0)
            console.log('playing', currentStream[streamIndex])
        }
    }, [currentStream, streamIndex]);

    useEffect(() => {
        const cleanup = startProgressBarUpdate();
        return cleanup;
    }, [playing, currentStream, streamIndex]);


    const play = () => {
        console.log('play clicked', currentStream[streamIndex]);
        if (!currentStream[streamIndex]) return;
        if (currentStream[streamIndex].playing()) return;
        currentStream[streamIndex].play();
        setPlaying(true);
    };

    const pause = () => {
        console.log('pause clicked', currentStream[streamIndex]);
        if (!currentStream[streamIndex]) return;
        if (!currentStream[streamIndex].playing()) return;
        currentStream[streamIndex].pause();
        setPlaying(false);
    };

    const handleClickNavigation = (newIndex: number) => {
        setStreamIndex(newIndex);
        const newMixtape = currentStream[newIndex];
        newMixtape.play();
        updateRangeValue(0)
        setPlaying(true);
    };

    const handleNextClick = () => {
        currentStream[streamIndex].stop();
        // Calculate the index for the next track
        const newIndex = (streamIndex + 1) % currentStream.length;
        handleClickNavigation(newIndex);
    };

    const handlePreviousClick = () => {
        currentStream[streamIndex].stop();
        // Calculate the index for the previous track
        const newIndex = (streamIndex - 1 + currentStream.length) % currentStream.length;
        handleClickNavigation(newIndex);
    };

    // Time Format
    const formatTime = (seconds: number) => {
        return (
            Math.floor(seconds / 60) +
            ':' +
            ('0' + Math.floor(seconds % 60)).slice(-2)
        );
    };

    const toggleMute = () => {
        if (!currentStream[streamIndex]) {
            return;
        }
        if (currentStream[streamIndex].volume() === 0) {
            currentStream[streamIndex].volume(1);
            setMuted(false)
        } else {
            currentStream[streamIndex].volume(0);
            setMuted(true)
        }
    };

    // update bar as music plays
    const startProgressBarUpdate = () => {
        const timerId = setInterval(() => {
            if (playing && currentStream.length > 0) {
                const currentTime = currentStream[streamIndex].seek();
                updateRangeValue(currentTime);
                setPlaybackPosition(currentTime);
            }
        }, 1000);
        return () => clearInterval(timerId);
    };

    // event for user initiated progress bar change
    const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentTimeState = parseFloat(event.target.value);
        currentStream[streamIndex].seek(currentTimeState);
        setPlaybackPosition(currentTimeState);
        updateRangeValue(currentTimeState);
    };

    // Updates the value of the bar, so that it tracks the played time
    const updateRangeValue = (
        currentTimeState: number
    ) => {
        const percentage = (currentTimeState / currentStream[streamIndex].duration()) * 100;

        if (progressBarRef.current) {
            progressBarRef.current.style.setProperty(
                '--range-value',
                percentage + '%'
            );
        }
    };

    if (currentStream.length === 0 || !currentStream[streamIndex]) {
        // only renders when stream exists
        return null;
    }

    return (
        <div
            id="player"
            className="w-full h-[90px] flex fixed bottom-0 flex-row justify-center items-center bg-tapeDarkBlack "
        >
            <div
                id="progress-bar"
                className="w-11/12 flex flex-row justify-center items-center"
            >
                <div id="btn-playPause">
                    {playing ? (
                        <button
                            type="button"
                            className="text-tapeWhite me-5 border-none"
                            onClick={pause}
                        >
                            <IoMdPause size="25" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="text-tapeWhite me-5 border-none "
                            onClick={play}
                        >
                            <IoMdPlay size="25" />
                        </button>
                    )}
                </div>
                <input
                    type="range"
                    id="seek-slider"
                    ref={progressBarRef}
                    defaultValue="0"
                    max={currentStream[streamIndex].duration().toString()}
                    onChange={handleProgressBarChange}
                    className="me-2"
                />
                <span
                    id="duration"
                    ref={totalDurationRef}
                    className="text-tapeWhite me-5"
                >{formatTime(currentStream[streamIndex].duration())}</span>
                <div id="fastforward-rewind" className=" flex flex-row ">
                    <button
                        type="button"
                        onClick={handleNextClick}
                        className="text-tapeWhite me-2 border-none"
                    >
                        <MdSkipPrevious size="35" />
                    </button>
                    <button
                        type="button"
                        onClick={handlePreviousClick}
                        className="text-tapeWhite me-2 border-none"
                    >
                        <MdSkipNext size="35" />
                    </button>
                    {!muted ? (
                        <button
                            type="button"
                            onClick={toggleMute}
                            className=" text-tapeWhite me-2 border-none "
                        >
                            <GoUnmute size="30" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={toggleMute}
                            className="text-tapeWhite me-2 border-none"
                        >
                            <BiSolidVolumeMute size="25" />
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Player;