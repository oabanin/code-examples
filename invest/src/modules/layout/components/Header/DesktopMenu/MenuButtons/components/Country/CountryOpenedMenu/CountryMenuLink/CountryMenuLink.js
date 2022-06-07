import React from 'react';

import s from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/Country/CountryOpenedMenu/CountryMenuLink/CountryMenuLink.module.scss';

import { useSnackBar } from 'src/hooks/useSnackBar';

import { setCountryCode } from 'src/store/optionsSlice';

import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';

function CountryMenuLink({ code, setIsLangMenuOpened, children, icon }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackBar();
  const t = useTranslations('Layout');
  return (
    <div
      onClick={() => {
        dispatch(setCountryCode(code));
        setIsLangMenuOpened(false);
        enqueueSnackbar(`${t('countryChanged')} ${children}`);
      }}
      className={s.container}
    >
      <div className={s.imageContainer}>
        <img alt={children} src={icon} loading="lazy" />
      </div>
      <div className={s.text}>{children}</div>
    </div>
  );
}

export default CountryMenuLink;
