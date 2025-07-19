import { useEffect, useState } from 'react';
import twConfig from '~/tailwind.config.js';

const BP = Number.parseInt(twConfig.theme.screens.sm);

export type MenuState = {
  isOpen: boolean;
  toggleOpen: VoidFunction;
};

export default function useMenu(): MenuState {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= BP) {
        setIsOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return { isOpen, toggleOpen };
}
