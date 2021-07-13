import { useEffect } from 'react';

export default function useGlobalDOMEvents(props) {
  useEffect(() => {
    Object.entries(props).forEach(([key, func]) => {
      window.addEventListener(key, func, false);
    });

    return () => {
      Object.entries(props).forEach(([key, func]) => {
        window.removeEventListener(key, func, false);
      });
    };
  }, []);
}
