import React from 'react';

import SocialNetworkLinkAccount from 'src/modules/Profile/components/ManageAccess/SocialNetworkLinkAccount/SocialNetworkLinkAccount';
import ProfileTitle from 'src/modules/Profile/components/ProfileTitle/ProfileTitle';
import { socialNetworksData } from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/SocialsNetworks/socialNetworksData';
import { ManageAccessSocialPlaceholder } from 'src/modules/Profile/pages/Placeholders/Placeholders';

import { useTranslations } from 'next-intl';

import s from './SocialNetworks.module.scss';

function SocialNetworks({ isSuccess }) {
  const t = useTranslations();

  return (
    <>
      <div className={s.titleContainer}>
        <ProfileTitle>{t('SettingsManageAccess.socialNetworks')}</ProfileTitle>
      </div>
      <div className={s.socialLinksContainer}>
        {isSuccess
          ? socialNetworksData.map((item) => (
              <SocialNetworkLinkAccount
                key={item.title}
                title={item.title}
                icon={item.icon}
                type={item.type}
              />
            ))
          : Array(3)
              .fill(0)
              .map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <ManageAccessSocialPlaceholder key={i} hideBorderBottom={i === 2} />
              ))}
      </div>
    </>
  );
}

export default SocialNetworks;
