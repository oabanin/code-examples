import { useEffect, useState } from 'react';

import { HeaderMenuPlaceholder } from 'src/modules/Profile/pages/Placeholders/Placeholders';
import MenuLink from 'src/modules/layout/components/Header/DesktopMenu/MenuLink/MenuLink';
import { menuDataPersonal } from 'src/modules/layout/components/Header/data/menuDataPersonal';
import { menuDataUnAuthorized } from 'src/modules/layout/components/Header/data/menuDataUnAuthorized';

import { getSessionTokenFromLS } from 'src/utils/local-storage/getSessionTokenFromLS';

import { useTranslations } from 'next-intl';

import s from './DesktopMenu.module.scss';

function DesktopMenu({ isLoaded, accountType, sessionToken, isUserSessionLoaded }) {
  const t = useTranslations('Layout');

  const [links, setLinks] = useState(menuDataUnAuthorized);

  useEffect(() => {
    if (!accountType) return;

    if (accountType === 'personal') {
      setLinks(menuDataPersonal);
    }
  }, [accountType]);

  const menuLinks = isLoaded ? (
    !isUserSessionLoaded && !sessionToken ? (
      links.map((item) => <MenuLink key={item.name} name={t(item.name)} path={item.path} />)
    ) : isLoaded && getSessionTokenFromLS() ? (
      links.map((item) => <MenuLink key={item.name} name={t(item.name)} path={item.path} />)
    ) : (
      <HeaderMenuPlaceholder />
    )
  ) : (
    <HeaderMenuPlaceholder />
  );

  return <div className={s.menu}>{menuLinks}</div>;
}

export default DesktopMenu;
