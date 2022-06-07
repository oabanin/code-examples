import React from 'react';

import s from 'src/modules/Profile/pages/MyPreferences/Experience/Experience.module.scss';
import FormExperience from 'src/modules/Profile/pages/MyPreferences/Experience/FormExperience/FormExperience';

import { useTranslations } from 'next-intl';

function Experience() {
  const t = useTranslations();
  return (
    <div className={s.container}>
      <div className={s.left}>
        <FormExperience />
      </div>
      <div className={s.right}>
        <img
          alt={t('SettingsMyPreferences.experience')}
          src="/images/profile/my-profile/experience/graph.svg"
          className={s.graph}
        />
      </div>
    </div>
  );
}

export default Experience;
