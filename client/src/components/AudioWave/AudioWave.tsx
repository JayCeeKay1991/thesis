import { useState, useRef, useEffect } from 'react';
import { useMainContext } from '../Context/Context';
import WaveSurfer from 'wavesurfer.js';


// A React component that will render wavesurfer
const AudioWave = () => {
  const { currentStreamUrls, streamIndex, currentPlaybackTime } = useMainContext();
  const waveContainerRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveContainerRef.current && !wavesurfer) {
      const ws = WaveSurfer.create({
        container: waveContainerRef.current,
        height: 90,
        waveColor: 'white',
        progressColor: '#909090',
        barGap: 1,
      });
      setWavesurfer(ws);
    }

    return () => {
      wavesurfer?.destroy();
    };
  }, [waveContainerRef, wavesurfer]);

  useEffect(() => {
    if (wavesurfer && currentStreamUrls[streamIndex]) {
      wavesurfer.load(currentStreamUrls[streamIndex]);
    }
  }, [wavesurfer, currentStreamUrls, streamIndex]);


  useEffect(() => {
    if (wavesurfer && typeof currentPlaybackTime === 'number') {
      const duration = wavesurfer.getDuration();
      if (duration > 0) {
        const seekTo = currentPlaybackTime / duration;
        wavesurfer.seekTo(seekTo);
      }
    }
  }, [currentPlaybackTime, wavesurfer]);

  return (
    <div id="wave" className="h-[100px] absolute ml-[50px] bottom-[40px] left-[300px] border-tapeWhite border-[2px] rounded-full" style={{pointerEvents: 'none'}}>
      <div
      className='w-[600px]'
      ref={waveContainerRef}>
      </div>
    </div>
  )
}

export default AudioWave;
