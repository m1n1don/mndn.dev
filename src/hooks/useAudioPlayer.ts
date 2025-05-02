import { useEffect, useRef, useState } from 'react';

export default function useAudioPlayer(src: string | HTMLAudioElement) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleAudioEnd = () => setPlaying(false);

    audioRef.current = typeof src == 'string' ? new Audio(src) : src;
    audioRef.current.addEventListener('ended', handleAudioEnd);

    return () => {
      audioRef.current?.removeEventListener('ended', handleAudioEnd);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src]);

  function togglePlay() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }

  return { playing, togglePlay };
}
