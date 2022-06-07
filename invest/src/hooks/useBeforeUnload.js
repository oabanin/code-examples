import { useEffect } from 'react';

export const useBeforeUnload = (isShow) => {
  const handleWindowClose = (e) => {
    if (isShow) {
      e.preventDefault();
      // eslint-disable-next-line no-return-assign
      return (e.returnValue = 'You have unsaved changes - are you sure you wish to close?');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  });

  useEffect(() => {}, []);
};
