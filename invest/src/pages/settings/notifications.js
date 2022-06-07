import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import NotificationsPage from 'src/modules/Profile/pages/Notifications/NotificationsPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function SettingsNotifications() {
  const t = useTranslations();
  const { loaded } = useAuthorisationCheck();
  if (!loaded) return <Preloader />;
  return (
    <>
      <Head>
        <title>
          {t('Settings.notifications')} - {t('Settings.settings')} - Invest.com
        </title>
        <meta name="title" content={t('Settings.notifications')} />
        <meta name="description" content={t('Settings.notifications')} />
      </Head>
      <ProfileLayout>
        <NotificationsPage />
      </ProfileLayout>
    </>
  );
}

export default SettingsNotifications;

SettingsNotifications.messages = ['Layout', 'Settings', 'SettingsNotifications'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick(
        (await import(`../../intl/${locale}.js`)).default,
        SettingsNotifications.messages,
      ),
    },
  };
}
