import React, { useState } from 'react';

import s from 'src/modules/Profile/components/ManageAccess/SocialNetworkLinkAccount/SocialNetworkLinkAccount.module.scss';
import AppleLinkAccount from 'src/modules/Profile/components/ManageAccess/Socials/AppleLinkAccount';
import FacebookLinkAccount from 'src/modules/Profile/components/ManageAccess/Socials/FacebookLinkAccount';
import GoogleLinkAccount from 'src/modules/Profile/components/ManageAccess/Socials/GoogleLinkAccount';

import Button from 'src/components/Buttons/MuiButton/Button';
import CustomDialog from 'src/components/CustomDialog/CustomDialog';

import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { linkSocial, unlinkSocial } from 'src/api/users';

import { setUserData } from 'src/store/userSlice';

import { firstCapital } from 'src/utils/string/firstCapital/firstCapital';

import { useTranslations } from 'next-intl';
import CloseIcon from 'public/svg/components/modal/close.svg';
import { useDispatch, useSelector } from 'react-redux';

function SocialNetworkLinkAccount({ icon, title, type }) {
  const socials = useSelector(({ user }) => user?.user?.socials);
  const is_linked = socials ? socials[type].is_linked : false;
  const dispatch = useDispatch();
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackBar();
  const [disconnectConfirmation, setDisconnectConfirmation] = useState(false);
  const { handleLogout } = useLogout();

  const handleSuccess = async ({ response }) => {
    try {
      if (!response?.accessToken && !response?.authorization?.id_token) {
        enqueueSnackbar(t('Layout.server_unexpectedError'));
        return;
      }

      const authObj = {
        social: type,
        token: response.accessToken || response.authorization.id_token,
      };

      try {
        const response = await linkSocial(authObj);
        if (response.status === 204) {
          const jsonData = JSON.parse(localStorage.getItem('user'));
          const newUserdata = {
            sessionToken: jsonData.sessionToken,
            user: {
              ...jsonData.user,
              socials: { ...jsonData.user.socials, [type]: { is_linked: true } },
            },
          };

          dispatch(setUserData(newUserdata));
          localStorage.setItem('user', JSON.stringify(newUserdata));
          enqueueSnackbar(t('SettingsManageAccess.connected'));
          return;
        }
      } catch (error) {
        if (error.response?.status === 400) {
          enqueueSnackbar(
            t('SettingsManageAccess.alreadyConnected', {
              account: firstCapital(type),
            }),
          );
          return;
        }

        if (error.response?.status === 401) {
          await handleLogout(t('Layout.sessionTokenExpired'));
          return;
        }

        if (error.response?.status === 403) {
          if (error.response.data.error === 'email_alreadyTaken') {
            enqueueSnackbar(t('SettingsManageAccess.email_alreadyTaken'));
          } else {
            await handleLogout(t('Layout.sessionTokenExpired'));
          }
          return;
        }

        if (error.response.status === 419) {
          enqueueSnackbar(t('Auth.tooMany'));
          return;
        }

        console.dir(error);
        console.log(error.response);
        enqueueSnackbar(t('Layout.server_unexpectedError'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlink = async () => {
    try {
      const authObj = {
        social: type,
      };

      try {
        const response = await unlinkSocial(authObj);
        if (response.status === 204) {
          const jsonData = JSON.parse(localStorage.getItem('user'));
          const newUserdata = {
            sessionToken: jsonData.sessionToken,
            user: {
              ...jsonData.user,
              socials: { ...jsonData.user.socials, [type]: { is_linked: false } },
            },
          };
          dispatch(setUserData(newUserdata));
          localStorage.setItem('user', JSON.stringify(newUserdata));
          enqueueSnackbar(t('SettingsManageAccess.disconnected'));
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await handleLogout(t('Layout.sessionTokenExpired'));
          return;
        }

        if (error.response.status === 419) {
          enqueueSnackbar(t('Auth.tooMany'));
          return;
        }

        console.dir(error);
        console.log(error.response);
        enqueueSnackbar(t('Layout.server_unexpectedError'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let SocialComponent;
  switch (type) {
    case 'apple':
      SocialComponent = <AppleLinkAccount handleSuccess={handleSuccess} />;
      break;
    case 'facebook':
      SocialComponent = <FacebookLinkAccount handleSuccess={handleSuccess} />;
      break;
    case 'google':
      SocialComponent = <GoogleLinkAccount handleSuccess={handleSuccess} />;
      break;
    default:
  }

  return (
    <>
      <CustomDialog
        open={Boolean(disconnectConfirmation)}
        onCancel={async () => {
          await handleUnlink();
          setDisconnectConfirmation(false);
        }}
        onApprove={() => {
          setDisconnectConfirmation(false);
        }}
        onCloseModal={() => {
          setDisconnectConfirmation(false);
        }}
        title={`${t('SettingsManageAccess.disconnect')} ${firstCapital(type)}`}
        body={t('SettingsManageAccess.disconnectText', {
          account: firstCapital(type),
        })}
        declineBtn={t('SettingsManageAccess.disconnect')}
        approveBtn={t('Settings.cancel')}
      />
      <div className={s.container}>
        <div className={s.left}>
          <img width={24} height={24} alt={title} src={icon} />
          <div className={s.title}>{title}</div>
        </div>
        <div className={s.right}>
          {is_linked ? (
            <>
              <img width={24} height={24} alt={title} src="/svg/profile/manage-access/linked.svg" />
              <button onClick={() => setDisconnectConfirmation(type)} className={s.unlink}>
                <CloseIcon />
              </button>
            </>
          ) : (
            <div className={s.buttonContainer}>{SocialComponent}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default SocialNetworkLinkAccount;
