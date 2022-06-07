import BillingIcon from 'public/svg/layout/header/burger-menu/billing.svg';
import HelpIcon from 'public/svg/layout/header/burger-menu/help.svg';
import SettingsIcon from 'public/svg/layout/header/burger-menu/settings.svg';

export const mobileMenuDataOptions = [
  {
    name: 'Billing',
    path: '/billing',
    icon: <BillingIcon />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: <HelpIcon />,
  },
];
