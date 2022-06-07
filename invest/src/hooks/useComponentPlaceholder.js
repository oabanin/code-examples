import { useEffect, useState } from 'react';

export const useComponentPlaceholder = () => {
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  useEffect(() => {
    function load() {
      if (!isComponentLoaded) setIsComponentLoaded(true);
    }
    window.addEventListener('mouseover', load, { once: true });
    window.addEventListener('touchend', load);

    return () => {
      window.removeEventListener('mouseover', load);
      window.removeEventListener('touchend', load);
    };
  }, []);
  return { isComponentLoaded, setIsComponentLoaded };
};
