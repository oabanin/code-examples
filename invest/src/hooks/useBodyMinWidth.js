import { useEffect } from 'react';

export const useBodyMinWidth = () => {
  useEffect(() => {
    document.body.style.minWidth = '360px';
    return () => {
      document.body.style.removeProperty('min-width');
    };
  }, []);
};
