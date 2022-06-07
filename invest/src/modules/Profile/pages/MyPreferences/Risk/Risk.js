import FormRisk from 'src/modules/Profile/pages/MyPreferences/Risk/FormRisk/FormRisk';
import s from 'src/modules/Profile/pages/MyPreferences/Risk/Risk.module.scss';

import { useTranslations } from 'next-intl';

function Risk() {
  const t = useTranslations();
  return (
    <div className={s.container}>
      <div className={s.left}>
        <FormRisk />
      </div>
      <div className={s.right}>
        <img
          alt={t('SettingsMyPreferences.risk')}
          src="/images/profile/my-profile/risk/graph.svg"
          className={s.graph}
        />
      </div>
    </div>
  );
}

export default Risk;
