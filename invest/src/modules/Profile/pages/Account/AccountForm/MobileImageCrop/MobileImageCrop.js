import React from 'react';

import BackButtonMobile from 'src/modules/Profile/components/BackButtonMobile/BackButtonMobile';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

function MobileImageCrop({
  setIsShowProfileMobileImage,
  isShowProfileMobileImage,
  setIsShowUserMobileImage,
  isShowUserMobileImage,
  ProfileImageTab,
  UserImageTab,
}) {
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');

  const t = useTranslations();
  return (
    <>
      {isShowProfileMobileImage && !isDesktopOrTablet && (
        <>
          <BackButtonMobile
            handleClick={() => {
              setIsShowProfileMobileImage(false);
            }}
            text={t('SettingsAccount.profileImage')}
          />
          {ProfileImageTab}
        </>
      )}
      {isShowUserMobileImage && !isDesktopOrTablet && (
        <>
          <BackButtonMobile
            handleClick={() => {
              setIsShowUserMobileImage(false);
            }}
            text={t('SettingsAccount.userImage')}
          />
          {UserImageTab}
        </>
      )}
    </>
  );
}

export default MobileImageCrop;
