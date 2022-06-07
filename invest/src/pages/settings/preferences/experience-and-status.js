import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import ExperienceAndStatusPage from 'src/modules/Profile/pages/MyPreferences/ExperienceAndStatusPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function ExpAndStatus() {
  const t = useTranslations();
  const { loaded } = useAuthorisationCheck();
  if (!loaded) return <Preloader />;

  return (
    <>
      <Head>
        <title>
          {t('Settings.myPreferences')} - {t('Settings.settings')} - Invest.com
        </title>
        <meta name="title" content={t('Settings.myPreferences')} />
        <meta name="description" content={t('Settings.myPreferences')} />
      </Head>
      <ProfileLayout>
        <ExperienceAndStatusPage />
      </ProfileLayout>
    </>
  );
}

export default ExpAndStatus;

ExpAndStatus.messages = ['Layout', 'Settings', 'SettingsMyPreferences'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../../../intl/${locale}.js`)).default, ExpAndStatus.messages),
    },
  };
}
