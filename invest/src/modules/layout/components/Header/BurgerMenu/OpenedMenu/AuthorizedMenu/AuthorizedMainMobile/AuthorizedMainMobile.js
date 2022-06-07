import React from 'react';

import LogoutMobile from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/AuthorizedMenu/AuthorizedMainMobile/Logout/LogoutMobile';
import BurgerMenuLink from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/BurgerMenuLink/BurgerMenuLink';
import NotificationLink from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/NotificationLink/NotificationLink';
import { mobileMenuDataOptions } from 'src/modules/layout/components/Header/data/mobileMenuDataOptions';
import {
  mobileMenuDataPersonalPart1,
  mobileMenuDataPersonalPart2,
} from 'src/modules/layout/components/Header/data/mobileMenuDataPersonal';

import { useTranslations } from 'next-intl';

import s2 from '../../OpenedMenu.module.scss';
import s from './AuthorizedMainMobile.module.scss';

function AuthorizedMainMobile({ handlerCloseMobileMenu }) {
  const t = useTranslations('Layout');
  return (
    <>
      <div className={s.container}>
        {mobileMenuDataPersonalPart1.map((item) => (
          <BurgerMenuLink
            key={item.name}
            handlerCloseMobileMenu={handlerCloseMobileMenu}
            icon={item.icon}
            path={item.path}
            name={t(item.name)}
          />
        ))}
        <NotificationLink path="/notifications" handlerCloseMobileMenu={handlerCloseMobileMenu} />
        {mobileMenuDataPersonalPart2.map((item) => (
          <BurgerMenuLink
            key={item.name}
            handlerCloseMobileMenu={handlerCloseMobileMenu}
            icon={item.icon}
            path={item.path}
            name={t(item.name)}
          />
        ))}
      </div>
      <div className={s2.divider} />
      <div className={s.options}>
        {mobileMenuDataOptions.map((item) => (
          <BurgerMenuLink
            handlerCloseMobileMenu={handlerCloseMobileMenu}
            icon={item.icon}
            path={item.path}
            name={t(item.name)}
            key={item.name}
          />
        ))}
      </div>
      <div className={s.logoutContainer}>
        <LogoutMobile handlerCloseMobileMenu={handlerCloseMobileMenu} />
      </div>
    </>
  );
}

export default AuthorizedMainMobile;
