import { useEffect, useState } from 'react';

import { useSnackBar } from 'src/hooks/useSnackBar';

import { getSessionTokenFromLS } from 'src/utils/local-storage/getSessionTokenFromLS';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export const useCheckIfLogged = () => {
  const router = useRouter();
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackBar();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (getSessionTokenFromLS()) {
      router.push('/settings');
      enqueueSnackbar(t('Layout.signedIn'));
    } else {
      setTimeout(() => {
        setIsLogged(true);
      }, 1000);
    }
  }, []);

  return { isLogged };
};
