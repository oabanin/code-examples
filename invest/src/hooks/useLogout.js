import { useSnackBar } from 'src/hooks/useSnackBar';

import { PRIVATE_URLS } from 'src/constants/PRIVATE_URLS';

import { logout } from 'src/api/logout';

import { clearUserData } from 'src/store/userSlice';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackBar();
  const handleLogout = async (message) => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
    localStorage.clear();
    dispatch(clearUserData());
    enqueueSnackbar(message);
    if (PRIVATE_URLS.includes(router.pathname) && window.location.pathname !== '/login') {
      await router.push('/login');
    }
  };
  return { handleLogout };
};
