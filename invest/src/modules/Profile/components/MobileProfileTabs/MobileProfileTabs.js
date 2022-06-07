import MobileProfileTab from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileTab/MobileProfileTab';
import s from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileTabs.module.scss';

import { useTranslations } from 'next-intl';

function MobileProfileTabs({ setIsMobileMenuActive, tabsData }) {
  const t = useTranslations();
  return (
    <div className={s.tabs}>
      {tabsData.map((item, index) => (
        <MobileProfileTab
          index={index}
          handleFirstClick={() => setIsMobileMenuActive(true)}
          path={item.path}
          prefix="/settings/preferences"
          key={item.text}
          text={t(item.text)}
        />
      ))}
    </div>
  );
}

export default MobileProfileTabs;
