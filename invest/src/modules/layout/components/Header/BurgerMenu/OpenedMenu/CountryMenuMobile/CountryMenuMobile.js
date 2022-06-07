import { useMemo, useState } from 'react';

import CountryMenuMobileButton from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/CountryMenuMobile/CountryMenuMobileButton/CountryMenuMobileButton';
import { countryData } from 'src/modules/layout/components/Header/data/countryData';

import { findCountyIndexByValue } from 'src/utils/findCountyIndexByValue';

import cn from 'classnames';
import ArrowDropdownIcon from 'public/svg/layout/header/icons/arrow-dropdown.svg';
import { useSelector } from 'react-redux';

import s from './CountryMenuMobile.module.scss';

function CountryMenuMobile() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const countryCode = useSelector((state) => state.options.countryCode);

  const selectedCountyIndex = useMemo(
    () => findCountyIndexByValue(countryCode, countryData),
    [countryCode],
  );
  const selectedIndex = countryData[selectedCountyIndex];

  return (
    <div className={s.container}>
      <button
        onClick={async (e) => {
          setIsMenuOpened((state) => !state);
        }}
        className={s.button}
      >
        <div className={s.innerContainer}>
          <img
            width={24}
            height={24}
            alt={selectedIndex.code}
            src={selectedIndex.icon}
            loading="lazy"
          />
          <div className={s.name}>{selectedIndex.text}</div>
          <ArrowDropdownIcon className={cn(s.arrow, { [s.rotate]: isMenuOpened })} />
        </div>
      </button>
      {isMenuOpened && (
        <div>
          {countryData.map((item) => (
            <CountryMenuMobileButton
              setIsMenuOpened={setIsMenuOpened}
              key={item.text}
              text={item.text}
              icon={item.icon}
              code={item.code}
              activeCode={countryCode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryMenuMobile;
