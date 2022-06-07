import React from 'react';

import BurgerMenuLink from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/BurgerMenuLink/BurgerMenuLink';
import s from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/UnAuthorizedMenu/UnAuthorizedMainMobile/UnAuthorizedMainMobile.module.scss';
import { mobileMenuDataUnAuthorized } from 'src/modules/layout/components/Header/data/mobileMenuDataUnAuthorized';

import { useTranslations } from 'next-intl';

import s2 from '../../OpenedMenu.module.scss';

function UnAuthorizedMainMobile({ handlerCloseMobileMenu }) {
  const t = useTranslations('Layout');
  return (
    <>
      <div className={s.container}>
        {mobileMenuDataUnAuthorized.map((item) => (
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
    </>
  );
}

export default UnAuthorizedMainMobile;
