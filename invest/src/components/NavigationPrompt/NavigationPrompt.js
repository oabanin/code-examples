import React, { useEffect, useRef, useState } from 'react';

import CustomDialog from 'src/components/CustomDialog/CustomDialog';

import { useRouter } from 'next/router';

function NavigationPrompt({ when, approveBtn, body, onApprove, declineBtn, title, onCancel }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const newPath = useRef();

  useEffect(() => {
    const warningText = 'You have unsaved changes - are you sure you wish to leave this page?';
    const handleWindowClose = (e) => {
      if (!when) return;
      if (newPath.current) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = (currentPath) => {
      if (!when) return;
      if (newPath.current) return;
      setIsOpen(true);
      newPath.current = currentPath;
      router.events.emit('routeChangeError');
      throw 'routeChange aborted because data has not saved';
    };
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [when]);

  if (!when) return null;
  return (
    <CustomDialog
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        onCancel && onCancel();
        router.push(newPath.current);
      }}
      onApprove={() => {
        setIsOpen(false);
        newPath.current = null;
        onApprove && onApprove();
      }}
      onCloseModal={() => {
        setIsOpen(false);
        newPath.current = null;
        onApprove && onApprove();
      }}
      title={title}
      body={body}
      declineBtn={declineBtn}
      approveBtn={approveBtn}
    />
  );
}

export default NavigationPrompt;
