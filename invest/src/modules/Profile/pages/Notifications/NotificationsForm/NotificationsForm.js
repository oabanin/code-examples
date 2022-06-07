import React, { useState } from 'react';

import ProfileTitle from 'src/modules/Profile/components/ProfileTitle/ProfileTitle';
import { useFormChanged } from 'src/modules/Profile/hooks/form/useFormChanged';
import { useNotifications } from 'src/modules/Profile/hooks/react-query-hooks/useNotifications';
import s from 'src/modules/Profile/pages/Notifications/NotificationsForm/NotificationsForm.module.scss';
import { notificationsData } from 'src/modules/Profile/pages/Notifications/NotificationsForm/notificationsData';
import {
  ButtonsContainerPlaceholder,
  CheckboxRadioButtonPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';

import Button from 'src/components/Buttons/MuiButton/Button';
import CustomCheckbox from 'src/components/Form/CustomCheckbox/CustomCheckbox';
import NavigationPrompt from 'src/components/NavigationPrompt/NavigationPrompt';

import { useConfirmAddFromLS } from 'src/hooks/saveFormToLs/useConfirmAddFromLS';
import { useSaveFormValues } from 'src/hooks/saveFormToLs/useSaveFormValues';
import { useSavePageState } from 'src/hooks/saveFormToLs/useSavePageState';
import { useToggleNotSavedState } from 'src/hooks/saveFormToLs/useToggleNotSavedState';
import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { patchNotifications } from 'src/api/users';

import { getErrors } from 'src/utils/form/getErrors';

import { useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

function NotificationsForm() {
  const t = useTranslations();
  const router = useRouter();
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const isDesktopOrTabletMax = useMediaQuery('(max-width:784px)');
  const { enqueueSnackbar } = useSnackBar();
  const queryClient = useQueryClient();
  const { handleLogout } = useLogout();

  const [initialValues, setInitialValues] = useState({
    notifications: [],
  });

  const { clearValues, getValues, pageKey } = useSavePageState(router.pathname);

  const onError = (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleLogout(t('Layout.sessionTokenExpired'));
      clearValues();
      return;
    }

    if (error.response.status === 422) {
      const newErrors = getErrors(error.response.data.errors);
      setErrors(newErrors);
      return;
    }

    enqueueSnackbar(t('Layout.server_unexpectedError'));
  };

  const { isSuccess } = useNotifications({
    retry: false,
    cacheTime: 0,
    onSuccess: (result) => {
      const converted = Object.entries(result.data?.profile?.subscriptions);
      const notifications = converted.filter((item) => item[1]).map((item) => item[0]);
      setInitialValues({ notifications: notifications.sort() });
      setValues({ notifications: notifications.sort() });
    },
    onError,
  });

  const {
    values,
    handleChange,
    touched,
    setValues,
    isValid,
    setErrors,
    handleReset,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      editMutation.mutate({ values });
    },
  });

  const FORM_CHANGED = useFormChanged(values, initialValues);

  const mutationFn = ({ values }) => {
    const patchData = {};

    values.notifications.forEach((item) => {
      patchData[item] = true;
    });

    notificationsData.forEach((item) => {
      if (!values.notifications.includes(item.value)) {
        patchData[item.value] = false;
      }
    });

    return patchNotifications(patchData);
  };

  const onSuccess = (result, body) => {
    setValues(body.values);
    setInitialValues(body.values);
    queryClient.invalidateQueries('users/me/profile');
    enqueueSnackbar(t('Settings.updated'));
    clearValues();
  };

  const editMutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
    onSettled: () => setSubmitting(false),
  });

  useSaveFormValues(
    {
      values,
      initialValues,
      touched,
    },
    !isSuccess,
    pageKey,
  );

  const { toggleShowModalLStoForm, showModalLStoForm } = useToggleNotSavedState(isSuccess, pageKey);
  useConfirmAddFromLS({
    showModalLStoForm,
    toggleShowModalLStoForm,
    setValues,
    clearValues,
    getValues,
  });

  return (
    <>
      <NavigationPrompt
        when={isSuccess && FORM_CHANGED}
        title={t('Settings.leavePageTitle')}
        body={t('Settings.leavePageText')}
        declineBtn={t('Settings.leave')}
        approveBtn={t('Settings.stay')}
        onApprove={() => {}}
        onCancel={() => clearValues()}
      />
      <div className={s.titleContainer}>
        <ProfileTitle>{t('SettingsNotifications.emailSubscriptions')}</ProfileTitle>
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        {isSuccess
          ? notificationsData.map((item) => (
              <div key={t(item.label)} className={s.checkbox}>
                <CustomCheckbox
                  disabled={!isSuccess}
                  label={t(item.label)}
                  className={s.checkBoxRoot}
                  name="notifications"
                  value={item.value}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  checked={values.notifications.includes(item.value)}
                />
              </div>
            ))
          : Array(6)
              .fill(0)
              .map((_, i) => (
                <CheckboxRadioButtonPlaceholder
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  width="100%"
                  height={
                    i === 1 && isDesktopOrTablet && isDesktopOrTabletMax
                      ? '38px'
                      : isDesktopOrTablet
                      ? '40px'
                      : '48px'
                  }
                  maxWidth={
                    isDesktopOrTablet
                      ? i === 0 || i === 2 || i === 4
                        ? 260
                        : 309
                      : i === 0 || i === 2 || i === 4
                      ? 242
                      : '100%'
                  }
                  padding={isDesktopOrTablet ? '5px 0 !important' : '7px 16px !important'}
                  notifications
                />
              ))}
        <div className={s.buttonsContainer}>
          {isSuccess ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  handleReset();
                }}
                disabled={!isValid || isSubmitting || !FORM_CHANGED}
                size="large"
                fullWidth
                variant="outlined"
                color="secondary"
              >
                {t('Settings.cancel')}
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting || !FORM_CHANGED}
                size="large"
                fullWidth
                variant="contained"
                color="primary"
              >
                {t('Settings.save')}
              </Button>
            </>
          ) : (
            <ButtonsContainerPlaceholder />
          )}
        </div>
      </form>
    </>
  );
}

export default NotificationsForm;
