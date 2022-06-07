import PasswordRecoveryPage from 'src/modules/Auth/pages/PasswordRecovery/PasswordRecoveryPage';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function PasswordRecovery() {
  const t = useTranslations('PasswordRecovery');
  return (
    <>
      <Head>
        <title>{t('Password recovery')} - Invest.com</title>
        <meta name="title" content={t('Password recovery')} />
        <meta name="description" content={t('Password recovery')} />
      </Head>
      <PasswordRecoveryPage />
    </>
  );
}

export default PasswordRecovery;

PasswordRecovery.messages = ['Layout', 'PasswordRecovery', 'Auth'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, PasswordRecovery.messages),
    },
  };
}
