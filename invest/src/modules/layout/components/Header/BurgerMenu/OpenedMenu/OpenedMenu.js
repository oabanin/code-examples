import { useEffect } from 'react';

import AuthorizedAccountMobile from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/AuthorizedMenu/AuthorizedAccountMobile/AuthorizedAccountMobile';
import AuthorizedMainMobile from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/AuthorizedMenu/AuthorizedMainMobile/AuthorizedMainMobile';
import CountryMenuMobile from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/CountryMenuMobile/CountryMenuMobile';
import LogoBurgerMenu from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/LogoBurgerMenu/LogoBurgerMenu';
import UnAuthorizedMainMobile from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/UnAuthorizedMenu/UnAuthorizedMainMobile/UnAuthorizedMainMobile';
import SignButtons from 'src/modules/layout/components/Header/SignButtons/SignButtons';

import { disableScroll, enableScroll } from 'src/utils/disableScroll';

import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import s from './OpenedMenu.module.scss';

function OpenedMenu({ handlerCloseMobileMenu, isOpened }) {
  const eventHandlers = useSwipeable({ onSwipedLeft: handlerCloseMobileMenu });
  const accountType = useSelector((state) => state.user.user.account_type);
  useEffect(() => {
    if (isOpened) {
      setTimeout(() => disableScroll(), 50);
    }
  }, [isOpened]);

  return (
    <div {...eventHandlers} className={s.container}>
      <div className={s.menu}>
        <div className={s.header}>
          {accountType ? (
            <AuthorizedAccountMobile />
          ) : (
            <>
              <LogoBurgerMenu handlerCloseMobileMenu={handlerCloseMobileMenu} />
              <div className={s.buttons}>
                <SignButtons handlerCloseMobileMenu={handlerCloseMobileMenu} />
              </div>
            </>
          )}
        </div>
        <div className={s.divider} />
        {accountType ? (
          <AuthorizedMainMobile handlerCloseMobileMenu={handlerCloseMobileMenu} />
        ) : (
          <UnAuthorizedMainMobile handlerCloseMobileMenu={handlerCloseMobileMenu} />
        )}
        <CountryMenuMobile />
      </div>
      <div
        className={s.overlay}
        onClick={() => {
          enableScroll();
          handlerCloseMobileMenu();
        }}
      />
    </div>
  );
}

export default OpenedMenu;

OpenedMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  handlerCloseMobileMenu: PropTypes.func.isRequired,
};
