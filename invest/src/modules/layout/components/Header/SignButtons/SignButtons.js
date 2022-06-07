import React from 'react';

import Button from 'src/components/Buttons/MuiButton/Button';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

function SignButtons({ handlerCloseMobileMenu }) {
  const router = useRouter();
  const t = useTranslations('Layout');
  return (
    <>
      <Button
        disabled={router.pathname === '/login'}
        onClick={() => {
          router.push('/login');
          if (handlerCloseMobileMenu) handlerCloseMobileMenu();
        }}
        variant="outlined"
        color="secondary"
      >
        {t('Login')}
      </Button>
      <Button
        disabled={router.pathname === '/sign-up'}
        onClick={() => {
          router.push('/sign-up');
          if (handlerCloseMobileMenu) handlerCloseMobileMenu();
        }}
        variant="contained"
        color="secondary"
      >
        {t('Join')}
      </Button>
    </>
  );
}

export default SignButtons;
