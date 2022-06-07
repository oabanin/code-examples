import React, { useEffect } from 'react';

import NotificationsForm from 'src/modules/Profile/pages/Notifications/NotificationsForm/NotificationsForm';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import { useTranslations } from 'next-intl';

import s from './NotificationsPage.module.scss';

function NotificationsPage() {
  const t = useTranslations();
  useBodyMinWidth();
  return (
    <div className={s.pageContainer}>
      <div className={s.container}>
        <div className={s.left}>
          <NotificationsForm />
        </div>
        <div className={s.right}>
          <div className={s.imageContainer}>
            <img
              alt={t('Settings.notifications')}
              src="/images/profile/notifications/graph.svg"
              className={s.graph}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
