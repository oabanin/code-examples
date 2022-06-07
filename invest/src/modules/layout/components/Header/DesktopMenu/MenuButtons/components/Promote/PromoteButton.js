import MenuButton from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/MenuButton/MenuButton';

import { useTranslations } from 'next-intl';

function PromoteButton() {
  const t = useTranslations('Layout');
  return (
    <MenuButton onClick={() => {}} alt={t('Promote')} src="/svg/layout/header/icons/speaker.svg" />
  );
}

export default PromoteButton;
