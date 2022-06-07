import { useEffect } from 'react';

import { HeaderProfiilePlaceholder } from 'src/modules/Profile/pages/Placeholders/Placeholders';
import AuthorizedAccount from 'src/modules/layout/components/Header/AuthorizedAccount/AuthorizedAccount';
import BurgerMenu from 'src/modules/layout/components/Header/BurgerMenu/BurgerMenu';
import DesktopMenu from 'src/modules/layout/components/Header/DesktopMenu/DesktopMenu';
import MenuButtons from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/MenuButtons';
import Logo from 'src/modules/layout/components/Header/Logo/Logo';
import SignButtons from 'src/modules/layout/components/Header/SignButtons/SignButtons';

import { getSessionTokenFromLS } from 'src/utils/local-storage/getSessionTokenFromLS';

import { useSelector } from 'react-redux';

import s from './Header.module.scss';

function Header() {
  const [sessionToken, accountType] = useSelector(({ user }) => [
    user.sessionToken,
    user.user.account_type,
  ]);
  const [isLoaded, isUserSessionLoaded] = useSelector(({ options }) => [
    options.isLoaded,
    options.isUserSessionLoaded,
  ]);

  const userProfile = isLoaded ? (
    !isUserSessionLoaded && !sessionToken ? (
      <div className={s.buttons}>
        <SignButtons />
      </div>
    ) : isLoaded && getSessionTokenFromLS() ? (
      <AuthorizedAccount />
    ) : (
      <HeaderProfiilePlaceholder />
    )
  ) : (
    <HeaderProfiilePlaceholder />
  );

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (window.pageYOffset > 1) {
        document.getElementById('header').classList.add(s.box_shadow);
      } else {
        document.getElementById('header').classList.remove(s.box_shadow);
      }
    }

    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <div className={s.header} id="header">
      <div className="container">
        <div className={s.innerContainer}>
          <div className={s.leftContainer}>
            <Logo />
            <DesktopMenu
              isLoaded={isLoaded}
              accountType={accountType}
              sessionToken={sessionToken}
              isUserSessionLoaded={isUserSessionLoaded}
            />
          </div>
          <div className={s.rightContainer}>
            <MenuButtons
              isLoaded={isLoaded}
              accountType={accountType}
              sessionToken={sessionToken}
              isUserSessionLoaded={isUserSessionLoaded}
              hideOnMobile
            />
            {userProfile}
            <div className={s.mobileContainer}>
              <MenuButtons
                isLoaded={isLoaded}
                accountType={accountType}
                sessionToken={sessionToken}
                isUserSessionLoaded={isUserSessionLoaded}
              />
              <BurgerMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
