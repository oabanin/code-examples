import { useState } from 'react';

import { HeaderPromoteIconPlaceholder } from 'src/modules/Profile/pages/Placeholders/Placeholders';
import CountryButton from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/Country/CountryButton';
import CountryOpenedMenu from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/Country/CountryOpenedMenu/CountryOpenedMenu';
import NotificationButton from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/Notification/NotificationButton';
import PromoteButton from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/Promote/PromoteButton';

import cn from 'classnames';

import s from './MenuButtons.module.scss';

function MenuButtons({ hideOnMobile, isLoaded, sessionToken, isUserSessionLoaded }) {
  const [isLangMenuOpened, setIsLangMenuOpened] = useState(false);

  const showPromoteIcon = isLoaded ? (
    !isUserSessionLoaded && !sessionToken ? (
      <PromoteButton />
    ) : isLoaded && sessionToken ? (
      false
    ) : (
      <HeaderPromoteIconPlaceholder />
    )
  ) : (
    <HeaderPromoteIconPlaceholder />
  );

  return (
    <div
      className={cn(s.buttons, {
        [s.hide_on_mobile]: hideOnMobile,
      })}
    >
      <NotificationButton />
      {showPromoteIcon}
      <div className={s.langContainer}>
        <CountryButton onClick={() => setIsLangMenuOpened(true)} />
        {isLangMenuOpened && <CountryOpenedMenu setIsLangMenuOpened={setIsLangMenuOpened} />}
      </div>
    </div>
  );
}

export default MenuButtons;
