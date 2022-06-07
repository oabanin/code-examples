import ProfileLayout from 'src/modules/Profile/components/ProfileLayout/ProfileLayout';
import ManageAccessPage from 'src/modules/Profile/pages/ManageAccess/ManageAccessPage';

import Preloader from 'src/components/Preloader/Preloader';

import { useAuthorisationCheck } from 'src/hooks/useAuthorisationCheck';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function SettingsManageAccess() {
  const t = useTranslations();
  const { loaded } = useAuthorisationCheck();
  if (!loaded) return <Preloader />;
  return (
    <>
      <Head>
        <title>
          {t('Settings.manageAccess')} - {t('Settings.settings')} - Invest.com
        </title>
        <meta name="title" content={t('Settings.manageAccess')} />
        <meta name="description" content={t('Settings.manageAccess')} />
      </Head>
      <ProfileLayout>
        <ManageAccessPage />
      </ProfileLayout>
    </>
  );
}

export default SettingsManageAccess;

SettingsManageAccess.messages = [
  'Layout',
  'Settings',
  'SettingsManageAccess',
  'Auth',
  'PasswordRecovery',
  'CreatePassword',
];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick(
        (await import(`../../intl/${locale}.js`)).default,
        SettingsManageAccess.messages,
      ),
    },
  };
}
