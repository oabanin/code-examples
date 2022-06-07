import { useEffect } from 'react';

import LoginComponent from 'src/modules/Auth/pages/Login/LoginPage';
import LoginByLink from 'src/modules/Auth/pages/LoginByLink/LoginByLink';

import { useSnackBar } from 'src/hooks/useSnackBar';

import { setUserData } from 'src/store/userSlice';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

function LinkLogin({ userData, invalidToken, blockedAccount }) {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (invalidToken) {
      router.push('/');
      enqueueSnackbar(t('CreatePassword.invalidToken'));
    }

    if (userData?.sessionToken) {
      dispatch(setUserData(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      setTimeout(() => {
        router.push('/settings');
      }, 3000);

      enqueueSnackbar(t('Auth.signedIn'));
    }
  }, [invalidToken, userData?.sessionToken]);

  return (
    <>
      <Head>
        <title>{t('Layout.Login')} - Invest.com</title>
        <meta name="title" content={t('Layout.Login')} />
        <meta name="description" content={t('Layout.Login')} />
      </Head>
      {blockedAccount && <LoginComponent blockedAccount={blockedAccount} />}
      {userData?.user?.email && <LoginByLink successAccount={userData.user.email} />}
    </>
  );
}

export default LinkLogin;

LinkLogin.messages = ['Layout', 'CreatePassword', 'Auth', 'Login', 'LoginByLink'];

export async function getServerSideProps(props) {
  const { locale, params } = props;
  const returnProps = {
    actionToken: params.token,
    messages: pick((await import(`../../intl/${locale}.js`)).default, LinkLogin.messages),
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/finish`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Action-Token': params.token,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      returnProps.userData = data;
      return {
        props: returnProps,
      };
    }

    if (response.status === 403) {
      const data = await response.json();
      returnProps.blockedAccount = data.email;
      return {
        props: returnProps,
      };
    }

    returnProps.invalidToken = true;
    return {
      props: returnProps,
    };
  } catch (error) {
    returnProps.invalidToken = true;
    return {
      props: returnProps,
    };
  }
}
