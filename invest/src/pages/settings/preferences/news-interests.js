import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import NewsInterestsPage from 'src/modules/Profile/pages/MyPreferences/NewsInterestsPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function NewsInt() {
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
        <NewsInterestsPage />
      </ProfileLayout>
    </>
  );
}

export default NewsInt;

NewsInt.messages = ['Layout', 'Settings', 'SettingsMyPreferences', 'NewsInterests'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../../../intl/${locale}.js`)).default, NewsInt.messages),
    },
  };
}
