import React, { useState } from 'react';

import ProfileTitle from 'src/modules/Profile/components/ProfileTitle/ProfileTitle';
import s from 'src/modules/Profile/pages/ManageAccess/ManageAccessForm/DeleteAccount/DeleteAccount.module.scss';
import {
  ManageAccessInputPlaceholder,
  ManageAccessTextPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';

import Button from 'src/components/Buttons/MuiButton/Button';
import CustomDialog from 'src/components/CustomDialog/CustomDialog';

import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { deleteUser } from 'src/api/users';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

function DeleteAccount({ isSuccess }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackBar();
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const minWidth957 = useMediaQuery('(min-width:958px)');
  const [isConfirmationDialogOpened, setIsConfirmationDialogOpened] = useState(false);
  const { handleLogout } = useLogout();
  return (
    <>
      <CustomDialog
        open={isConfirmationDialogOpened}
        onCancel={async () => {
          try {
            const response = await deleteUser();
            if (response.status === 204) {
              await handleLogout(t('SettingsManageAccess.deleted'));
            }
          } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
              await handleLogout(t('Layout.sessionTokenExpired'));
              return;
            }

            enqueueSnackbar(t('Layout.server_unexpectedError'));
          }
          setIsConfirmationDialogOpened(false);
        }}
        onApprove={() => {
          setIsConfirmationDialogOpened(false);
        }}
        onCloseModal={() => {
          setIsConfirmationDialogOpened(false);
        }}
        title={t('SettingsManageAccess.deleteAccount')}
        body={t('SettingsManageAccess.deleteAccountText')}
        declineBtn={t('SettingsManageAccess.delete')}
        approveBtn={t('SettingsManageAccess.dont')}
        declineBtnColor="secondary-danger"
      />
      <div className={s.container}>
        <div className={s.titleContainer}>
          <ProfileTitle>{t('SettingsManageAccess.deleteAccount')}</ProfileTitle>
        </div>
        <div className={s.text}>
          {isSuccess ? (
            t('SettingsManageAccess.deleteText')
          ) : (
            <ManageAccessTextPlaceholder
              height={minWidth957 ? 32 : 48}
              maxWidth={minWidth957}
              hideLastPlaceholder={minWidth957}
            />
          )}
        </div>
        <div className={s.buttonContainer}>
          {isSuccess ? (
            <Button
              type="submit"
              onClick={() => {
                setIsConfirmationDialogOpened(true);
              }}
              // disabled={!isValid}
              size="large"
              fullWidth
              variant="outlined"
              color="secondary"
            >
              {t('SettingsManageAccess.deleteAccount')}
            </Button>
          ) : (
            <ManageAccessInputPlaceholder
              inputWidth={isDesktopOrTablet ? 190 : 214}
              sameHeight={40}
              display="flex"
              justifyContent={isDesktopOrTablet ? 'flex-start' : 'center'}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DeleteAccount;
