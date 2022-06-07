import MenuButton from 'src/modules/layout/components/Header/DesktopMenu/MenuButtons/components/MenuButton/MenuButton';

import { useTranslations } from 'next-intl';

function NotificationButton() {
  const t = useTranslations('Layout');

  return (
    <MenuButton
      onClick={() => {}}
      alt={t('Notifications')}
      src="/svg/layout/header/icons/bell.svg"
    />
  );
}

export default NotificationButton;
