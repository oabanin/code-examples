import { useSnackBar } from 'src/hooks/useSnackBar';

import { setCountryCode } from 'src/store/optionsSlice';

import { useTranslations } from 'next-intl';
import CheckedIcon from 'public/svg/layout/header/icons/checked.svg';
import { useDispatch } from 'react-redux';

import s2 from '../CountryMenuMobile.module.scss';

function CountryMenuMobileButton({ setIsMenuOpened, activeCode, code, icon, text }) {
  const isActive = activeCode === code;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackBar();
  const t = useTranslations('Layout');
  return (
    <button
      onClick={() => {
        dispatch(setCountryCode(code));
        setIsMenuOpened(false);
        enqueueSnackbar(`${t('countryChanged')} ${text}`);
      }}
      className={s2.button}
    >
      <div className={s2.innerContainer}>
        <img width={24} height={24} alt={code} src={icon} loading="lazy" />
        <div className={s2.name}>{text}</div>
        {isActive && <CheckedIcon />}
      </div>
    </button>
  );
}

export default CountryMenuMobileButton;
