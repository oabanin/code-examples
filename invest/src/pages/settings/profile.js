import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import ExperienceAndStatusPage from 'src/modules/Profile/pages/MyPreferences/ExperienceAndStatusPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function SettingsMyProfile() {
  const t = useTranslations();
  const { loaded } = useAuthorisationCheck();
  if (!loaded) return <Preloader />;
  return (
    <>
      <Head>
        <title>
          {t('Settings.myProfile')} - {t('Settings.settings')} - Invest.com
        </title>
        <meta name="title" content={t('Settings.myProfile')} />
        <meta name="description" content={t('Settings.myProfile')} />
      </Head>
      <ProfileLayout>profile</ProfileLayout>
    </>
  );
}

export default SettingsMyProfile;

SettingsMyProfile.messages = ['Layout', 'Settings', 'SettingsMyProfile'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../../intl/${locale}.js`)).default, SettingsMyProfile.messages),
    },
  };
}
