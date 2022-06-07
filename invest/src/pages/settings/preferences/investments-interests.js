import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import InvestmentsInterestsPage from 'src/modules/Profile/pages/MyPreferences/InvestmentsInterestsPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function InvInterests() {
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
        <InvestmentsInterestsPage />
      </ProfileLayout>
    </>
  );
}

export default InvInterests;

InvInterests.messages = ['Layout', 'Settings', 'SettingsMyPreferences', 'InvestmentsInterests'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../../../intl/${locale}.js`)).default, InvInterests.messages),
    },
  };
}
