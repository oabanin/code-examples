import CountryMenuLink from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/Country/CountryOpenedMenu/CountryMenuLink/CountryMenuLink';
import { countryData } from 'src/modules/layout/components/Header/data/countryData';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import s from './CountryOpenedMenu.module.scss';

export default function CountryOpenedMenu({ setIsLangMenuOpened }) {
  const handleClickAway = () => {
    setIsLangMenuOpened(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={s.container}>
        {countryData.map((item) => (
          <CountryMenuLink
            code={item.code}
            setIsLangMenuOpened={setIsLangMenuOpened}
            key={item.text}
            icon={item.icon}
          >
            {item.text}
          </CountryMenuLink>
        ))}
      </div>
    </ClickAwayListener>
  );
}
