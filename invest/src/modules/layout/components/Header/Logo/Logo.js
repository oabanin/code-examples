import cn from 'classnames';
import { useRouter } from 'next/router';

import s from './Logo.module.scss';

function Logo() {
  const router = useRouter();
  const active = router.pathname === '/';

  return (
    <img
      width={90}
      height={18}
      onClick={() => {
        if (active) return;
        router.push('/');
      }}
      className={cn(s.icon, { [s.active]: active })}
      src="/svg/layout/header/logo.svg"
      alt="logo"
    />
  );
}

export default Logo;
