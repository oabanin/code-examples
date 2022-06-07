import { useState } from 'react';

import { enableScroll } from 'src/utils/disableScroll';

import dynamic from 'next/dynamic';
import MobileMenuIcon from 'public/svg/layout/header/icons/burger.svg';

import s from './BurgerMenu.module.scss';

const OpenedMenu = dynamic(
  () =>
    import(
      /* webpackPreload: true */ 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/OpenedMenu'
    ),
  { ssr: false },
);

function BurgerMenu() {
  const [isOpened, setIsOpened] = useState(false);

  const openMenu = () => {
    setIsOpened(true);
  };

  const handlerCloseMobileMenu = () => {
    enableScroll();
    setIsOpened(false);
  };

  return (
    <div>
      <button type="button" onClick={openMenu} className={s.button}>
        <MobileMenuIcon />
      </button>
      {isOpened && (
        <OpenedMenu isOpened={isOpened} handlerCloseMobileMenu={handlerCloseMobileMenu} />
      )}
    </div>
  );
}

export default BurgerMenu;
