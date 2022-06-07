import { useEffect, useState } from 'react';

import { useSnackBar } from 'src/hooks/useSnackBar';

import store from 'src/store/store';
import { clearUserData, setUserData } from 'src/store/userSlice';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const useAuthorisationCheck = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const enqueueSnackbar = useSnackBar();
  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('user');
      if (!item) {
        store.dispatch(clearUserData());
        router.push('/login');
      } else {
        store.dispatch(setUserData(JSON.parse(item)));
      }
      setTimeout(() => {
        setLoaded(true);
      }, 5000);
    }

    checkUserData();

    const checkUsersMe = async () => {
      if (!document.hidden) {
        try {
          if (!store.getState().user.sessionToken) {
            localStorage.clear();
            store.dispatch(clearUserData());
            if (window.location.pathname !== '/login') {
              router.push('/login');
            }
          } else {
            setLoaded(true);
          }
        } catch (err) {
          localStorage.clear();
          store.dispatch(clearUserData());
          router.push('/login');
          enqueueSnackbar(t('Layout.pleaseAuthorize'));
          window.removeEventListener('storage', checkUserData);
          window.removeEventListener('visibilitychange', checkUsersMe);
        }
      }
    };
    checkUsersMe();
    window.addEventListener('storage', checkUserData);
    window.addEventListener('visibilitychange', checkUsersMe);
    return () => {
      window.removeEventListener('storage', checkUserData);
      window.removeEventListener('visibilitychange', checkUsersMe);
    };
  }, []);

  return {
    loaded,
  };
};

export { useAuthorisationCheck };
