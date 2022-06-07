import { useEffect, useState } from 'react';

import BackButtonMobile from 'src/modules/Profile/components/BackButtonMobile/BackButtonMobile';
import ProfileTabLinks from 'src/modules/Profile/components/ProfileTabs/ProfileTabs/ProfileTabLinks';
import FormInvestmentsInterests from 'src/modules/Profile/pages/MyPreferences/InvestmentInterests/FormInvestmentsInterests';
import s from 'src/modules/Profile/pages/MyPreferences/common.module.scss';
import { tabsLinksData } from 'src/modules/Profile/pages/MyPreferences/tabsLinksData';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

function InvestmentsInterestsPage() {
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const router = useRouter();
  useBodyMinWidth();

  const t = useTranslations();

  return (
    <>
      {!isDesktopOrTablet ? (
        <BackButtonMobile
          handleClick={() => router.push('/settings/preferences')}
          text={t('SettingsMyPreferences.investmentsInterests')}
        />
      ) : (
        <ProfileTabLinks tabLinksData={tabsLinksData} />
      )}
      <div className={s.container}>
        <FormInvestmentsInterests />
      </div>
    </>
  );
}

export default InvestmentsInterestsPage;
