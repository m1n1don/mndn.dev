import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { MenuState } from 'hooks/useMenu';

export const icons = {
  open: faBars,
  close: faClose,
};

export default function MenuWidget({ isOpen, toggleOpen }: MenuState) {
  const icon = isOpen ? icons.close : icons.open;

  return (
    <button
      onClick={toggleOpen}
      className="absolute left-4 top-4 z-50 p-2 sm:hidden"
    >
      <FontAwesomeIcon icon={icon} size="2x" opacity={0.8} />
    </button>
  );
}
