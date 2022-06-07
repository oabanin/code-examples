import React from 'react';

import FormAboutMe from 'src/modules/Profile/pages/MyPreferences/AboutMe/FormAboutMe/FormAboutMe';

import { useTranslations } from 'next-intl';

import s from './AboutMe.module.scss';

function AboutMe() {
  const t = useTranslations();
  return (
    <div className={s.container}>
      <div className={s.left}>
        <FormAboutMe />
      </div>
      <div className={s.right}>
        <img
          alt={t('SettingsMyPreferences.interests')}
          src="/images/profile/my-profile/about-me/graph.svg"
          className={s.graph}
        />
      </div>
    </div>
  );
}

export default AboutMe;
