import { useState } from 'react';

import BackButtonMobile from 'src/modules/Profile/components/BackButtonMobile/BackButtonMobile';
import MobileProfileTabs from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileTabs';
import ProfileTabLinks from 'src/modules/Profile/components/ProfileTabs/ProfileTabs/ProfileTabLinks';
import AboutMe from 'src/modules/Profile/pages/MyPreferences/AboutMe/AboutMe';
import s from 'src/modules/Profile/pages/MyPreferences/common.module.scss';
import { tabsLinksData } from 'src/modules/Profile/pages/MyPreferences/tabsLinksData';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import { useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

function AboutMePage() {
  const t = useTranslations();
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  useBodyMinWidth();

  return (
    <>
      {!isDesktopOrTablet ? (
        <>
          {isMobileMenuActive !== false ? (
            <>
              <BackButtonMobile
                handleClick={() => setIsMobileMenuActive(false)}
                text={t('SettingsMyPreferences.interests')}
              />
            </>
          ) : (
            <MobileProfileTabs
              tabsData={tabsLinksData}
              setIsMobileMenuActive={setIsMobileMenuActive}
            />
          )}
        </>
      ) : (
        <ProfileTabLinks tabLinksData={tabsLinksData} />
      )}
      <div className={cn(s.container, { [s.hide]: !isMobileMenuActive && !isDesktopOrTablet })}>
        <AboutMe />
      </div>
    </>
  );
}

export default AboutMePage;
