import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { logout } from 'src/api/logout';

import { clearUserData } from 'src/store/userSlice';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import LogoutIcon from 'public/svg/layout/header/burger-menu/logout.svg';
import { useDispatch } from 'react-redux';

import s from './LogoutMobile.module.scss';

function LogoutMobile({ handlerCloseMobileMenu }) {
  const t = useTranslations('Layout');
  const { handleLogout } = useLogout();
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        handlerCloseMobileMenu();
        handleLogout(t('loggedOut'));
      }}
      className={s.button}
    >
      <div className={s.innerContainer}>
        <LogoutIcon />
        <div className={s.name}>{t('Logout')}</div>
      </div>
    </button>
  );
}

export default LogoutMobile;
