import React, { useState } from 'react';

import AccountMobileImageButton from 'src/modules/Profile/components/Account/AccountMobileImageButton/AccountMobileImageButton';
import ProfileTabs from 'src/modules/Profile/components/ProfileTabs/ProfileTabs/ProfileTabs';
import { useAccountInformation } from 'src/modules/Profile/hooks/react-query-hooks/useAccountInformation';
import { useActiveImageCrop } from 'src/modules/Profile/hooks/useActiveImageCrop';
import FormAccount from 'src/modules/Profile/pages/Account/AccountForm/FormAccount/FormAccount';
import MobileImageCrop from 'src/modules/Profile/pages/Account/AccountForm/MobileImageCrop/MobileImageCrop';
import { imageCropTabsData } from 'src/modules/Profile/pages/Account/imageCropTabsData';
import {
  AccountImagePreviewPlaceholder,
  AccountMobileImageButtonPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';

import { useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import s from './AccountForm.module.scss';

function AccountForm() {
  const t = useTranslations();
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');

  const { isSuccess } = useAccountInformation({
    retry: false,
    cacheTime: 0,
  });

  const userData = useSelector((state) => state.user.user);
  const [activeDesktopTab, setActiveDesktopTab] = useState(0);

  const {
    DesktopActiveComponent,
    ProfileImageTab,
    UserImageTab,
    isShowProfileMobileImage,
    isShowUserMobileImage,
    setIsShowProfileMobileImage,
    setIsShowUserMobileImage,
    isOtherTabsDisabled,
    confirmedProfileImage,
    confirmedUserImage,
    setConfirmedProfileImage,
    setConfirmedUserImage,
  } = useActiveImageCrop({ activeDesktopTab });

  const profileImage = confirmedProfileImage?.src || userData?.profile_image?.conversions?.small;
  const userImage = confirmedUserImage?.src || userData?.user_image?.conversions?.small;

  return (
    <>
      <MobileImageCrop
        ProfileImageTab={ProfileImageTab}
        UserImageTab={UserImageTab}
        isShowProfileMobileImage={isShowProfileMobileImage}
        isShowUserMobileImage={isShowUserMobileImage}
        setIsShowProfileMobileImage={setIsShowProfileMobileImage}
        setIsShowUserMobileImage={setIsShowUserMobileImage}
      />
      <div
        className={cn(s.container, {
          [s.hide]: (isShowProfileMobileImage || isShowUserMobileImage) && !isDesktopOrTablet,
        })}
      >
        <div className={s.innerContainer}>
          <div className={s.left}>
            <FormAccount
              setConfirmedProfileImage={setConfirmedProfileImage}
              setConfirmedUserImage={setConfirmedUserImage}
              confirmedProfileImage={confirmedProfileImage}
              confirmedUserImage={confirmedUserImage}
            />
          </div>
          <div className={s.right}>
            <div className={s.mobileButtons}>
              {!isSuccess ? (
                <AccountMobileImageButtonPlaceholder />
              ) : (
                <AccountMobileImageButton
                  image={profileImage}
                  handleClick={() => setIsShowProfileMobileImage(true)}
                  text={t('SettingsAccount.profileImage')}
                />
              )}
              {!isSuccess ? (
                <AccountMobileImageButtonPlaceholder marginLeft="16px" />
              ) : (
                <AccountMobileImageButton
                  image={userImage}
                  handleClick={() => setIsShowUserMobileImage(true)}
                  text={t('SettingsAccount.userImage')}
                />
              )}
            </div>
            {isDesktopOrTablet && (
              <div className={s.borderContainer}>
                <ProfileTabs
                  isOtherTabsDisabled={isOtherTabsDisabled}
                  activeDesktopTab={activeDesktopTab}
                  setActiveDesktopTab={setActiveDesktopTab}
                  tabsData={imageCropTabsData}
                />
                {!isSuccess ? (
                  <AccountImagePreviewPlaceholder
                    text={t('SettingsAccount.fileFormats')}
                    title={t('SettingsAccount.uploadProfileImageText')}
                  />
                ) : (
                  <div className={s.imageCropContainer}>{DesktopActiveComponent}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountForm;
