import React, { useState } from 'react';

import AccordionInvestmentsInterests from 'src/modules/Profile/components/InvestmestsInterests/Accordion/AccordionInvestmentsInterests';
import ProfileTitleWithSubtitle from 'src/modules/Profile/components/ProfileTitleWithSubtitle/ProfileTitleWithSubtitle';
import { useFormChanged } from 'src/modules/Profile/hooks/form/useFormChanged';
import { useProfileCheckBoxHandler } from 'src/modules/Profile/hooks/form/useProfileCheckBoxHandler';
import { useInvestmentsInterests } from 'src/modules/Profile/hooks/react-query-hooks/useInvestmentsInterests';
import { formInvestmentsData } from 'src/modules/Profile/pages/MyPreferences/InvestmentInterests/formInvestmentsData';
import {
  CheckboxRadioButtonPlaceholder,
  RiskRangeButtonsPlaceholder,
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

import { patchInvestmentInterests } from 'src/api/users';

import { getErrors } from 'src/utils/form/getErrors';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import s from './FormInvestmentsInterests.module.scss';

const formInvestmentsDataArray = Object.entries(formInvestmentsData);

function FormInvestmentsInterests() {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();
  const queryClient = useQueryClient();
  const { handleLogout } = useLogout();

  const [initialValues, setInitialValues] = useState({
    managed_funds: [],
    bonds: [],
    private_equity: [],
    stocks: [],
    bank_products: [],
    cryptocurrency: [],
    commodities: [],
    real_estate: [],
    insurance: [],
    businesses_for_sale: [],
    miscellaneous: [],
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

  const { isSuccess } = useInvestmentsInterests({
    retry: false,
    cacheTime: 0,
    onSuccess: (result) => {
      const { investment_interests: data } = result.data;
      setInitialValues(data);
      setValues(data);
    },
    onError,
  });

  const mutationFn = ({ values }) => {
    const patchData = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const property in values) {
      if (formInvestmentsData[property].data.length === values[property].length) {
        patchData[property] = ['all'];
      } else {
        patchData[property] = [...values[property]];
      }
    }
    return patchInvestmentInterests(patchData);
  };

  const onSuccess = (result, body) => {
    setInitialValues(body.values);
    setValues(body.values);
    queryClient.invalidateQueries('/users/me/profile/investment-interests');
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

  const PAGE_IS_LOADED = isSuccess;

  const { handleCheckbox } = useProfileCheckBoxHandler({ values, setFieldValue, setFieldTouched });

  return (
    <>
      <NavigationPrompt
        when={PAGE_IS_LOADED && FORM_CHANGED}
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
            title={t('SettingsMyPreferences.investmentsInterests')}
            subtitle={t('SettingsMyPreferences.investmentsInterestsText')}
          />
        </div>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            {isSuccess ? (
              <AccordionInvestmentsInterests
                disabled={!isSuccess}
                formInvestmentsDataArray={formInvestmentsDataArray}
                handleCheckbox={handleCheckbox}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                values={values}
              />
            ) : (
              Array(11)
                .fill(0)
                .map((_, i) => (
                  <CheckboxRadioButtonPlaceholder
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={sPlaceholders.checkboxRadioButton}
                  />
                ))
            )}
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
                <RiskRangeButtonsPlaceholder />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormInvestmentsInterests;
