import s from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/LogoBurgerMenu/LogoBurgerMenu.module.scss';

import { useRouter } from 'next/router';

function LogoBurgerMenu({ handlerCloseMobileMenu }) {
  const router = useRouter();
  const active = router.pathname === '/';

  return (
    <img
      width={90}
      height={18}
      onClick={() => {
        handlerCloseMobileMenu();
        if (active) return;
        router.push('/');
      }}
      className={s.icon}
      src="/svg/layout/header/logo.svg"
      alt="logo"
    />
  );
}

export default LogoBurgerMenu;
