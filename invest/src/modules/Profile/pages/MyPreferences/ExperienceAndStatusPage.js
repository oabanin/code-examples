import { useEffect, useState } from 'react';

import BackButtonMobile from 'src/modules/Profile/components/BackButtonMobile/BackButtonMobile';
import ProfileTabLinks from 'src/modules/Profile/components/ProfileTabs/ProfileTabs/ProfileTabLinks';
import Experience from 'src/modules/Profile/pages/MyPreferences/Experience/Experience';
import s from 'src/modules/Profile/pages/MyPreferences/common.module.scss';
import { tabsLinksData } from 'src/modules/Profile/pages/MyPreferences/tabsLinksData';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

function ExperienceAndStatusPage() {
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const router = useRouter();
  useBodyMinWidth();

  const t = useTranslations();

  return (
    <>
      {!isDesktopOrTablet ? (
        <BackButtonMobile
          handleClick={() => router.push('/settings/preferences')}
          text={t('SettingsMyPreferences.experience')}
        />
      ) : (
        <ProfileTabLinks tabLinksData={tabsLinksData} />
      )}

      <div className={s.container}>
        <Experience />
      </div>
    </>
  );
}

export default ExperienceAndStatusPage;
