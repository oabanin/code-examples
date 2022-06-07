import LoginComponent from 'src/modules/Auth/pages/Login/LoginPage';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function Login() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t('Layout.Login')} - Invest.com</title>
        <meta name="title" content={t('Layout.Login')} />
        <meta name="description" content={t('Layout.Login')} />
      </Head>
      <LoginComponent />
    </>
  );
}

export default Login;

Login.messages = ['Common', 'Layout', 'Login', 'Auth'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../../intl/${locale}.js`)).default, Login.messages),
    },
  };
}
