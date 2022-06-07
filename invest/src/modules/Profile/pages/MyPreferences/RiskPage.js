import { useEffect } from 'react';

import BackButtonMobile from 'src/modules/Profile/components/BackButtonMobile/BackButtonMobile';
import ProfileTabLinks from 'src/modules/Profile/components/ProfileTabs/ProfileTabs/ProfileTabLinks';
import Risk from 'src/modules/Profile/pages/MyPreferences/Risk/Risk';
import s from 'src/modules/Profile/pages/MyPreferences/common.module.scss';
import { tabsLinksData } from 'src/modules/Profile/pages/MyPreferences/tabsLinksData';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

function RiskPage() {
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const router = useRouter();
  useBodyMinWidth();

  const t = useTranslations();

  return (
    <>
      {!isDesktopOrTablet ? (
        <BackButtonMobile
          handleClick={() => router.push('/settings/preferences')}
          text={t('SettingsMyPreferences.risk')}
        />
      ) : (
        <ProfileTabLinks tabLinksData={tabsLinksData} />
      )}

      <div className={s.container}>
        <Risk />
      </div>
    </>
  );
}

export default RiskPage;
