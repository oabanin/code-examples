import React, { useState } from 'react';

import { ImageCrop } from 'src/modules/Profile/components/ProfileImageUploader/ImageCrop/ImageCrop';
import ImagePreview from 'src/modules/Profile/components/ProfileImageUploader/ImagePreview/ImagePreview';

import getImageBlobFromBase64 from 'src/utils/form/image/getImageBlobFromBase64';

import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

export const useActiveImageCrop = ({ activeDesktopTab }) => {
  let DesktopActiveComponent;
  const t = useTranslations();
  const [error, setError] = useState(false);
  const [isShowProfileMobileImage, setIsShowProfileMobileImage] = useState(false);
  const [isShowUserMobileImage, setIsShowUserMobileImage] = useState(false);

  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);
  const [uploadedUserImage, setUploadedUserImage] = useState(null);

  const [confirmedProfileImage, setConfirmedProfileImage] = useState(null);
  const [confirmedUserImage, setConfirmedUserImage] = useState(null);

  const userData = useSelector((state) => state.user.user);

  const ProfileImageTab = uploadedProfileImage ? (
    <ImageCrop
      handleConfirm={async ({ src, croppedAreaPixels, file }) => {
        const imgSrc = await getImageBlobFromBase64(src, croppedAreaPixels);
        const tmpImage = new Image();
        tmpImage.src = imgSrc;
        tmpImage.onload = function () {
          setConfirmedProfileImage({
            croppedPixels: croppedAreaPixels,
            file,
            src: imgSrc,
          });
          setUploadedProfileImage(null);
        };
      }}
      image={uploadedProfileImage}
      handleCancel={() => setUploadedProfileImage(null)}
    />
  ) : (
    <ImagePreview
      setError={setError}
      error={error}
      text={t('SettingsAccount.fileFormats')}
      title={t('SettingsAccount.uploadProfileImageText')}
      buttonText={t('SettingsAccount.uploadProfileImage')}
      imgAlt={t('SettingsAccount.profileImage')}
      imgSrc={confirmedProfileImage?.src || userData?.profile_image?.original}
      onClick={(imageParams) => setUploadedProfileImage(imageParams)}
    />
  );

  const UserImageTab = uploadedUserImage ? (
    <ImageCrop
      handleConfirm={async ({ src, croppedAreaPixels, file }) => {
        const imgSrc = await getImageBlobFromBase64(src, croppedAreaPixels);
        const tmpImage = new Image();
        tmpImage.src = imgSrc;
        tmpImage.onload = function () {
          setConfirmedUserImage({
            croppedPixels: croppedAreaPixels,
            file,
            src: imgSrc,
          });
          setUploadedUserImage(null);
        };
      }}
      image={uploadedUserImage}
      handleCancel={() => setUploadedUserImage(null)}
    />
  ) : (
    <ImagePreview
      setError={setError}
      error={error}
      text={t('SettingsAccount.fileFormats')}
      title={t('SettingsAccount.uploadUserImageText')}
      buttonText={t('SettingsAccount.uploadUserImage')}
      imgAlt={t('SettingsAccount.userImage')}
      imgSrc={confirmedUserImage?.src || userData?.user_image?.original}
      onClick={(imageParams) => setUploadedUserImage(imageParams)}
    />
  );

  switch (activeDesktopTab) {
    case 0:
      DesktopActiveComponent = ProfileImageTab;
      break;
    case 1:
      DesktopActiveComponent = UserImageTab;
      break;
    default:
      DesktopActiveComponent = ProfileImageTab;
  }

  return {
    DesktopActiveComponent,
    isShowProfileMobileImage,
    isShowUserMobileImage,
    uploadedProfileImage,
    uploadedUserImage,
    setIsShowProfileMobileImage,
    setIsShowUserMobileImage,
    setUploadedProfileImage,
    setUploadedUserImage,
    ProfileImageTab,
    UserImageTab,
    confirmedProfileImage,
    confirmedUserImage,
    setConfirmedProfileImage,
    setConfirmedUserImage,
    isOtherTabsDisabled:
      Boolean(uploadedProfileImage) || Boolean(uploadedUserImage) || Boolean(error),
  };
};
