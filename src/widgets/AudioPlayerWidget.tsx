import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPauseCircle,
  faPlayCircle,
} from '@fortawesome/free-regular-svg-icons';
import useAudioPlayer from 'hooks/useAudioPlayer';

export const icons = {
  play: faPlayCircle,
  pause: faPauseCircle,
};

export type AudioPlayerWidgetProps = {
  src: string | HTMLAudioElement;
};

export default function AudioPlayerWidget({ src }: AudioPlayerWidgetProps) {
  const { playing, togglePlay } = useAudioPlayer(src);
  const icon = playing ? icons.pause : icons.play;

  return (
    <button
      onClick={togglePlay}
      className="px-3 opacity-60 hover:opacity-80 print:hidden"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
