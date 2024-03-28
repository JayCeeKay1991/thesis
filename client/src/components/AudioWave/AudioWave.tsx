import { usePlayerContext } from '../Context/PlayerContext';
import WaveSurfer from 'wavesurfer.js';
import { useRef, useEffect, useState } from 'react';


// A React component that will render wavesurfer
const AudioWave = () => {
  const { currentStream, streamIndex, playbackPosition } = usePlayerContext()
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveContainerRef.current && !wavesurfer) {
      const ws = WaveSurfer.create({
        container: waveContainerRef.current,
        height: 90,
        width: 600,
        waveColor: 'white',
        progressColor: '#909090',
        barGap: 1,
      });
      setWavesurfer(ws);
    }

    return () => {
      wavesurfer?.destroy();
    };
  }, [waveContainerRef, wavesurfer, currentStream]);

  useEffect(() => {
    if (wavesurfer && currentStream[streamIndex]) {
      const url = (currentStream[streamIndex] as any)._src
      wavesurfer.load(url);
    }
  }, [wavesurfer, currentStream, streamIndex]);


  useEffect(() => {
    if (wavesurfer && typeof playbackPosition === 'number') {
      const duration = wavesurfer.getDuration();
      if (duration > 0) {
        const seekTo = playbackPosition / duration;
        wavesurfer.seekTo(seekTo);
      }
    }
  }, [wavesurfer, playbackPosition]);

  return (
    <div id="wave" ref={waveContainerRef} className="h-[100px] w-[700px] absolute ml-[50px] bottom-[40px] left-[300px] border-tapeWhite border-[2px] rounded-full flex justify-center" style={{ pointerEvents: 'none' }} />


  )
}

export default AudioWave;
