import MenuButton from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/MenuButton/MenuButton';

import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

function CountryButton({ onClick }) {
  const t = useTranslations('Layout');
  const countryCode = useSelector((state) => state.options.countryCode);

  return (
    <MenuButton
      onClick={onClick}
      alt={t('Country')}
      src={`/svg/layout/header/countries/${countryCode}.svg`}
    />
  );
}

export default CountryButton;
