import React from 'react';

import FormNewsInterests from 'src/modules/Profile/pages/MyPreferences/NewsInterests/FormNewsInterests/FormNewsInterests';
import s from 'src/modules/Profile/pages/MyPreferences/NewsInterests/NewsInterests.module.scss';

import { useTranslations } from 'next-intl';

function NewsInterests() {
  const t = useTranslations();
  return (
    <div className={s.container}>
      <div className={s.left}>
        <FormNewsInterests />
      </div>
      <div className={s.right}>
        <img
          alt={t('SettingsMyPreferences.newsInterests')}
          src="/images/profile/my-profile/news-interests/graph.svg"
          className={s.graph}
        />
      </div>
    </div>
  );
}

export default NewsInterests;
