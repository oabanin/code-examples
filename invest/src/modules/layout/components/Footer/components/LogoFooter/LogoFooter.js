import s from 'src/modules/layout/components/Footer/components/LogoFooter/LogoFooter.module.scss';

import cn from 'classnames';
import { useRouter } from 'next/router';

function LogoFooter() {
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
      src="/svg/layout/footer/logo-white.svg"
      alt="logo"
    />
  );
}

export default LogoFooter;
