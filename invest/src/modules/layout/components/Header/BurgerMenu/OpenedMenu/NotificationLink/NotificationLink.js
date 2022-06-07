import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import NotificationsIcon from 'public/svg/layout/header/icons/bell.svg';

import s from '../BurgerMenuLink/BurgerMenuLink.module.scss';
import s2 from './NotificationLink.module.scss';

function NotificationLink({ handlerCloseMobileMenu, path }) {
  const router = useRouter();
  const active = router.pathname === path;
  const t = useTranslations('Layout');

  return (
    <a
      href={path}
      onClick={(e) => {
        e.preventDefault();
        router.push(path);
        handlerCloseMobileMenu();
      }}
      className={s.link}
    >
      <div className={cn(s.innerContainer, { [s.selected]: active })}>
        <div className={s.icon}>
          <NotificationsIcon />
        </div>
        <div className={s.name}>{t('Notifications')}</div>
        <div className={s2.notification}>12</div>
      </div>
    </a>
  );
}

export default NotificationLink;
