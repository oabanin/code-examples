import React, { useState } from 'react';

import MobileProfileSelectors from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileSelectors';
import { useAccountInformation } from 'src/modules/Profile/hooks/react-query-hooks/useAccountInformation';
import DeleteAccount from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/DeleteAccount/DeleteAccount';
import FormChangeEmail from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/FormChangeEmail/FormChangeEmail';
import FormChangePassword from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/FormChangePassword/FormChangePassword';
import FormChangePhone from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/FormChangePhone/FormChangePhone';
import SocialNetworks from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/SocialsNetworks/SocialNetworks';
import s from 'src/modules/Profile/pages/ManageAccess/ManageAccessPage.module.scss';
import { mobileSelectorsData } from 'src/modules/Profile/pages/ManageAccess/mobileSelectorsData';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function ManageAccessPage() {
  const router = useRouter();
  const t = useTranslations();
  useBodyMinWidth();

  const [activeMobileSelector, setActiveMobileSelector] = useState(null);
  const userData = useSelector((state) => state.user.user);
  const { isSuccess } = useAccountInformation({
    retry: false,
    cacheTime: 0,
  });

  return (
    <>
      <div className={s.mobileSelectorContainer}>
        <MobileProfileSelectors
          tabsData={mobileSelectorsData}
          setActiveMobileSelector={setActiveMobileSelector}
          activeMobileSelector={activeMobileSelector}
        />
      </div>
      <div className={cn(s.pageContainer, { [s.hideOnMobile]: !activeMobileSelector })}>
        <div className={s.container}>
          <div className={s.left}>
            <div className={activeMobileSelector !== 'email' ? s.hideOnMobile : undefined}>
              <FormChangeEmail initialValue={userData.email} isSuccess={isSuccess} />
            </div>
            <div className={cn(s.section, { [s.hideOnMobile]: activeMobileSelector !== 'phone' })}>
              <FormChangePhone initialValue={userData?.phone} isSuccess={isSuccess} />
            </div>
            <div className={cn(s.section, { [s.hideOnMobile]: activeMobileSelector !== 'social' })}>
              <SocialNetworks isSuccess={isSuccess} />
            </div>
            <div
              className={cn(s.section, { [s.hideOnMobile]: activeMobileSelector !== 'password' })}
            >
              <FormChangePassword isSuccess={isSuccess} />
            </div>
            <div className={cn(s.section, { [s.hideOnMobile]: activeMobileSelector !== 'delete' })}>
              <DeleteAccount isSuccess={isSuccess} />
            </div>
          </div>
          <div className={s.right}>
            <img
              alt={t('Settings.manageAccess')}
              src="/images/profile/manage-access/graph.svg"
              className={s.graph}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAccessPage;
