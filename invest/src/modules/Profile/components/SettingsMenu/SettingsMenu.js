import AccountLink from 'src/modules/Profile/components/SettingsMenu/AccountLink/AccountLink';
import s from 'src/modules/Profile/components/SettingsMenu/SettingsMenu.module.scss';
import { settingsMenuData } from 'src/modules/Profile/components/SettingsMenu/settingsMenuData';
import { useProfileNotCompleted } from 'src/modules/Profile/hooks/useProfileNotCompleted';

import { useTranslations } from 'next-intl';

function SettingsMenu({ menuData, prefix }) {
  const t = useTranslations(prefix === '/subscription' ? 'Subscription' : 'Settings');
  const { alias } = useProfileNotCompleted();

  return (
    <div className={s.container}>
      {(menuData || settingsMenuData).map((item) => (
        <AccountLink
          subPaths={item.subPaths}
          disabled={!alias}
          key={item.name}
          path={item.path}
          name={t(item.name)}
          prefix={prefix || '/settings'}
        />
      ))}
    </div>
  );
}

export default SettingsMenu;
