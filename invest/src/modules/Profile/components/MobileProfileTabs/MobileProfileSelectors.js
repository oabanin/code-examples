import React, { useMemo } from 'react';

import BackButtonMobile from 'src/modules/Profile/components/BackButtonMobile/BackButtonMobile';
import MobileProfileTabSelector from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileTab/MobileProfileTabSelector';
import s from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileTabs.module.scss';

import { useTranslations } from 'next-intl';

function MobileProfileSelectors({ activeMobileSelector, setActiveMobileSelector, tabsData }) {
  const t = useTranslations();

  const activeSelectorIndex = useMemo(
    () => tabsData.findIndex((item) => item.value === activeMobileSelector),
    [activeMobileSelector],
  );

  if (activeMobileSelector) {
    return (
      <BackButtonMobile
        handleClick={() => setActiveMobileSelector(null)}
        text={t(tabsData[activeSelectorIndex].label)}
      />
    );
  }

  return (
    <div className={s.tabs}>
      {tabsData.map((item) => (
        <MobileProfileTabSelector
          handleClick={() => setActiveMobileSelector(item.value)}
          key={item.label}
          text={t(item.label)}
        />
      ))}
    </div>
  );
}

export default MobileProfileSelectors;
