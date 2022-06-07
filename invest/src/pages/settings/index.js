import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import AccountPage from 'src/modules/Profile/pages/Account/AccountPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function Settings() {
  const t = useTranslations();
  const { loaded } = useAuthorisationCheck();
  if (!loaded) return <Preloader />;

  return (
    <>
      <Head>
        <title>
          {t('Settings.account')} - {t('Settings.settings')} - Invest.com
        </title>
        <meta name="title" content={t('Settings.account')} />
        <meta name="description" content={t('Settings.account')} />
      </Head>
      <ProfileLayout>
        <AccountPage />
      </ProfileLayout>
    </>
  );
}

export default Settings;

Settings.messages = ['Layout', 'Settings', 'SettingsAccount'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../../intl/${locale}.js`)).default, Settings.messages),
    },
  };
}
