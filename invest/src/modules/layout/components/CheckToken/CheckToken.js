import { useEffect } from 'react';

import { useLogout } from 'src/hooks/useLogout';

import { getUsersMe } from 'src/api/users';

import { setIsLoaded, setIsUserSessionLoaded } from 'src/store/optionsSlice';
import store from 'src/store/store';
import { setUserData } from 'src/store/userSlice';

import { getSessionTokenFromLS } from 'src/utils/local-storage/getSessionTokenFromLS';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export default function CheckToken() {
  const t = useTranslations();
  const router = useRouter();

  const { handleLogout } = useLogout();

  const getUserSession = async (sessionToken) => {
    try {
      const response = await getUsersMe();
      const { data } = response;
      store.dispatch(setUserData({ user: data.user }));
      localStorage.setItem('user', JSON.stringify({ sessionToken, user: data.user }));
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 403) {
        handleLogout(t('Layout.sessionTokenExpired'));
      }
    }
  };

  useEffect(() => {
    const sessionToken = getSessionTokenFromLS();
    store.dispatch(setIsLoaded(true));

    if (!sessionToken) {
      store.dispatch(setIsUserSessionLoaded(false));
    }
    if (sessionToken) {
      getUserSession(sessionToken);
    }

    const handleRouteChange = () => {
      const sessionToken = getSessionTokenFromLS();
      store.dispatch(setIsLoaded(true));

      if (!sessionToken) {
        store.dispatch(setIsUserSessionLoaded(false));
      }
      if (sessionToken) {
        getUserSession(sessionToken);
      }
    };

    if (getSessionTokenFromLS()) {
      handleRouteChange();
    }

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return null;
}
