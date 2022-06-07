import { useEffect } from 'react';

import SignUpPage from 'src/modules/Auth/pages/SignUp/SignUpPage';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function SignUp() {
  const t = useTranslations('SignUp');
  useBodyMinWidth();
  return (
    <>
      <Head>
        <title>{t('Sign up')} - Invest.com</title>
        <meta name="title" content={t('Sign up')} />
        <meta name="description" content={t('Sign up')} />
      </Head>
      <SignUpPage />
    </>
  );
}

export default SignUp;

SignUp.messages = ['Common', 'Layout', 'SignUp', 'Auth'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, SignUp.messages),
    },
  };
}
