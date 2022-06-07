import { useEffect } from 'react';

import { PROFILE_NOT_COMPLETED_URL } from 'src/constants/PROFILE_NOT_COMPLETED_URL';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const useProfileNotCompleted = () => {
  const alias = useSelector((state) => state.user.user.alias);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (!alias && router.pathname !== PROFILE_NOT_COMPLETED_URL) {
      router.push(PROFILE_NOT_COMPLETED_URL);
    }
  }, [alias, router.isReady]);
  return { alias };
};
