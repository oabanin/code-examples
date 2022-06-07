import React, { useState } from 'react';

import ProfileCheckboxRadioButton from 'src/modules/Profile/components/ProfileCheckboxRadioButton/ProfileCheckboxRadioButton';
import ProfileTitleWithSubtitle from 'src/modules/Profile/components/ProfileTitleWithSubtitle/ProfileTitleWithSubtitle';
import { useCheckBoxPanelHandler } from 'src/modules/Profile/hooks/form/useCheckBoxPanelHandler';
import { useFormChanged } from 'src/modules/Profile/hooks/form/useFormChanged';
import { useAboutMe } from 'src/modules/Profile/hooks/react-query-hooks/useAboutMe';
import { formAboutMeData } from 'src/modules/Profile/pages/MyPreferences/AboutMe/FormAboutMe/formAboutMeData';
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

import { patchAboutMe } from 'src/api/users';

import { getErrors } from 'src/utils/form/getErrors';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import s from './FormAboutMe.module.scss';

function FormAboutMe() {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();
  const queryClient = useQueryClient();
  const { handleLogout } = useLogout();
  const [initialValues, setInitialValues] = useState({
    aboutMe: [],
  });

  const { clearValues, getValues, pageKey } = useSavePageState(`${router.pathname}/about-me`);

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

  const { isSuccess } = useAboutMe({
    retry: false,
    cacheTime: 0,
    onSuccess: (result) => {
      const converted = Object.entries(result.data?.about_me);
      const aboutMe = converted.filter((item) => item[1]).map((item) => item[0]);
      setInitialValues({ aboutMe: aboutMe.sort() });
      setValues({ aboutMe: aboutMe.sort() });
    },
    onError: onError,
  });

  const { handleCheckbox } = useCheckBoxPanelHandler({ values, setFieldValue, setFieldTouched });

  const mutationFn = ({ values }) => {
    const patchData = {};

    values.aboutMe.forEach((item) => {
      patchData[item] = true;
    });

    return patchAboutMe(patchData);
  };

  const onSuccess = (result, body) => {
    setInitialValues({ aboutMe: body.values.aboutMe });
    setValues({ aboutMe: body.values.aboutMe });
    queryClient.invalidateQueries('users/me/profile/about-me');
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
      <div className={s.container}>
        <div className={s.titleContainer}>
          <ProfileTitleWithSubtitle
            title={t('SettingsMyPreferences.describe')}
            subtitle={t('SettingsMyPreferences.chooseOptions')}
          />
        </div>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            {isSuccess
              ? formAboutMeData.map((item) => {
                  const currentItemChecked = values.aboutMe?.includes(item.value);
                  return (
                    <ProfileCheckboxRadioButton
                      disabled={!isSuccess || (values.aboutMe?.length === 3 && !currentItemChecked)}
                      key={item.label}
                      checked={currentItemChecked}
                      onClick={handleCheckbox}
                      name="aboutMe"
                      label={t(`SettingsMyPreferences.${item.label}`)}
                      icon={item.icon}
                      value={item.value}
                    />
                  );
                })
              : Array(13)
                  .fill(0)
                  .map((_, i) => (
                    <CheckboxRadioButtonPlaceholder
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={sPlaceholders.checkboxRadioButton}
                    />
                  ))}
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
                  </Button>
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

export default FormAboutMe;
