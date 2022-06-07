import React, { useState } from 'react';

import ProfileCheckboxRadioButton from 'src/modules/Profile/components/ProfileCheckboxRadioButton/ProfileCheckboxRadioButton';
import ProfileTitleWithSubtitle from 'src/modules/Profile/components/ProfileTitleWithSubtitle/ProfileTitleWithSubtitle';
import { useFormChanged } from 'src/modules/Profile/hooks/form/useFormChanged';
import { useProfileRadioButtonHandler } from 'src/modules/Profile/hooks/form/useProfileRadioButtonHandler';
import { useExperienceAndStatus } from 'src/modules/Profile/hooks/react-query-hooks/useExperienceAndStatus';
import s from 'src/modules/Profile/pages/MyPreferences/Experience/FormExperience/FormExperience.module.scss';
import {
  formExperienceData,
  formStatusData,
} from 'src/modules/Profile/pages/MyPreferences/Experience/FormExperience/formExperienceData';
import {
  ButtonsContainerPlaceholder,
  CheckboxRadioButtonPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';
import sPlaceholders from 'src/modules/Profile/pages/Placeholders/Placeholders.module.scss';

import Button from 'src/components/Buttons/MuiButton/Button';
import NavigationPrompt from 'src/components/NavigationPrompt/NavigationPrompt';

import { useConfirmAddFromLS } from 'src/hooks/saveFormToLs/useConfirmAddFromLS';
import { useSaveFormValues } from 'src/hooks/saveFormToLs/useSaveFormValues';
import { useSavePageState } from 'src/hooks/saveFormToLs/useSavePageState';
import { useToggleNotSavedState } from 'src/hooks/saveFormToLs/useToggleNotSavedState';
import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { patchExperienceAndStatus } from 'src/api/users';

import { getErrors } from 'src/utils/form/getErrors';

import { useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

function FormExperience() {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();
  const queryClient = useQueryClient();
  const { handleLogout } = useLogout();
  const [initialValues, setInitialValues] = useState({
    your_experience: null,
    investment_status: null,
  });
  const { clearValues, getValues, pageKey } = useSavePageState(`${router.pathname}`);
  const {
    values,
    touched,
    isValid,
    setValues,
    setErrors,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
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

  const { isSuccess } = useExperienceAndStatus({
    retry: false,
    cacheTime: 0,
    onSuccess: (result) => {
      const newValues = {
        your_experience: result.data?.experience_and_status?.your_experience || 'novice',
        investment_status: result.data?.experience_and_status?.investment_status || 'active',
      };
      setInitialValues(newValues);
      setValues(newValues);
    },
    onError: onError,
  });

  const mutationFn = ({ values }) => patchExperienceAndStatus(values);

  const onSuccess = (result, body) => {
    setInitialValues(body.values);
    setValues(body.values);
    queryClient.invalidateQueries('/users/me/profile/experience-and-status');
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
  const { handleRadioButton } = useProfileRadioButtonHandler({ setFieldValue, setFieldTouched });

  const isMobileMin = useMediaQuery('(min-width:360px)');
  const isMobileMax = useMediaQuery('(max-width:767px)');
  const isDesktopOrTabletMin768 = useMediaQuery('(min-width:768px)');
  const isDesktopOrTabletMax1023 = useMediaQuery('(max-width:1023px)');
  const isDesktopOrTabletMin1024 = useMediaQuery('(min-width:1024px)');
  const isDesktopOrTabletMax1439 = useMediaQuery('(max-width:1439px)');
  const isDesktop = useMediaQuery('(min-width:1440px)');

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
      <div className={s.container}>
        <div className={s.titleContainer}>
          <ProfileTitleWithSubtitle
            title={t('SettingsMyPreferences.yourExperience')}
            subtitle={t('SettingsMyPreferences.describeExperience')}
          />
        </div>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            {isSuccess
              ? formExperienceData.map((item) => (
                  <ProfileCheckboxRadioButton
                    isRadioButton
                    key={item.label}
                    disabled={!isSuccess}
                    checked={values.your_experience === item.value}
                    onClick={handleRadioButton}
                    name="your_experience"
                    label={t(`SettingsMyPreferences.${item.label}`)}
                    subtitle={t(`SettingsMyPreferences.${item.subtitle}`)}
                    icon={item.icon}
                    value={item.value}
                  />
                ))
              : Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <CheckboxRadioButtonPlaceholder
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={`${sPlaceholders.checkboxRadioButton} ${sPlaceholders.experience}`}
                      height={
                        (isMobileMin && isMobileMax && '102px') ||
                        (isDesktopOrTabletMin768 && isDesktopOrTabletMax1023
                          ? i === 2
                            ? '118px'
                            : '102px'
                          : false) ||
                        (isDesktopOrTabletMin1024 && isDesktopOrTabletMax1439
                          ? i === 2
                            ? '102px'
                            : '86px'
                          : false) ||
                        (isDesktop && '86px')
                      }
                    />
                  ))}
            <div className={s.section}>
              <div className={s.titleContainer}>
                <ProfileTitleWithSubtitle
                  title={t('SettingsMyPreferences.status')}
                  subtitle={t('SettingsMyPreferences.statusText')}
                />
              </div>
              <div className={s.sectionContainer}>
                {isSuccess
                  ? formStatusData.map((item) => (
                      <ProfileCheckboxRadioButton
                        disabled={!isSuccess}
                        isRadioButton
                        key={item.label}
                        checked={values.investment_status === item.value}
                        onClick={handleRadioButton}
                        name="investment_status"
                        label={t(`SettingsMyPreferences.${item.label}`)}
                        subtitle={t(`SettingsMyPreferences.${item.subtitle}`)}
                        icon={item.icon}
                        value={item.value}
                      />
                    ))
                  : Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <CheckboxRadioButtonPlaceholder
                          // eslint-disable-next-line react/no-array-index-key
                          key={i}
                          className={`${sPlaceholders.checkboxRadioButton} ${
                            sPlaceholders.experience
                          } ${i === 1 ? sPlaceholders.withoutHeight : ''}`}
                          height={
                            (isMobileMin && isDesktopOrTabletMax1023
                              ? i === 1
                                ? '86px'
                                : '102px'
                              : false) ||
                            (isDesktopOrTabletMin1024 && '86px')
                          }
                        />
                      ))}
              </div>
            </div>
            <div className={s.buttonsContainer}>
              {isSuccess ? (
                <>
                  <Button
                    type="button"
                    onClick={handleReset}
                    disabled={!isValid || isSubmitting || !isSuccess || !FORM_CHANGED}
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
                    disabled={!isValid || isSubmitting || !isSuccess || !FORM_CHANGED}
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    {t('Settings.save')}
                  </Button>{' '}
                </>
              ) : (
                <ButtonsContainerPlaceholder />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormExperience;
