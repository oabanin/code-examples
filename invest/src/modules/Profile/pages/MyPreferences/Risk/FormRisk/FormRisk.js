import React, { useState } from 'react';

import ProfileCheckboxRadioButton from 'src/modules/Profile/components/ProfileCheckboxRadioButton/ProfileCheckboxRadioButton';
import ProfileTitleWithSubtitle from 'src/modules/Profile/components/ProfileTitleWithSubtitle/ProfileTitleWithSubtitle';
import { useAmountHandler } from 'src/modules/Profile/hooks/form/useAmountHandler';
import { useCheckBoxPanelHandler } from 'src/modules/Profile/hooks/form/useCheckBoxPanelHandler';
import { useFormChanged } from 'src/modules/Profile/hooks/form/useFormChanged';
import { useProfileRadioButtonHandler } from 'src/modules/Profile/hooks/form/useProfileRadioButtonHandler';
import { useRiskAndRange } from 'src/modules/Profile/hooks/react-query-hooks/useRiskAndRange';
import {
  formRiskData,
  formWealthData,
} from 'src/modules/Profile/pages/MyPreferences/Risk/FormRisk/formRiskData';
import {
  ButtonsContainerPlaceholder,
  CheckboxRadioButtonPlaceholder,
  RiskRangeSelectPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';
import sPlaceholders from 'src/modules/Profile/pages/Placeholders/Placeholders.module.scss';

import Button from 'src/components/Buttons/MuiButton/Button';
import AutocompleteSync from 'src/components/Form/AutocompleteSync/AutocompleteSync';
import Input from 'src/components/Form/Input/Input';
import NavigationPrompt from 'src/components/NavigationPrompt/NavigationPrompt';

import { useConfirmAddFromLS } from 'src/hooks/saveFormToLs/useConfirmAddFromLS';
import { useSaveFormValues } from 'src/hooks/saveFormToLs/useSaveFormValues';
import { useSavePageState } from 'src/hooks/saveFormToLs/useSavePageState';
import { useToggleNotSavedState } from 'src/hooks/saveFormToLs/useToggleNotSavedState';
import { useCurrencies } from 'src/hooks/useCurrencies';
import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { INFINITE_TIME_CACHE } from 'src/constants/CACHE_CONFIG';

import { patchRiskAndRange } from 'src/api/users';

import { getErrors } from 'src/utils/form/getErrors';
import { handleAmount } from 'src/utils/string/handleAmout/handleAmount';
import { removeNonDigits } from 'src/utils/string/removeNonDigits/removeNonDigits';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import ArrowDownIcon from 'public/svg/components/autocomplete/arrow-down.svg';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';

import s from './FormRisk.module.scss';

function FormRisk() {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();
  const queryClient = useQueryClient();
  const { handleLogout } = useLogout();

  const [initialValues, setInitialValues] = useState({
    risk_profile: '',
    wealth_phase: '',

    five_year_average_currency_obj: null,
    five_year_average_currency: '',
    five_year_average_amount: '',

    your_income_currency_obj: null,
    your_income_currency: '',
    your_income_amount: '',

    your_assets_currency_obj: null,
    your_assets_currency: '',
    your_assets_amount: '',

    range_currency_obj: null,
    range_currency: '',
    range_min: 0,
    range_max: 0,
  });

  const { clearValues, getValues, pageKey } = useSavePageState(`${router.pathname}`);
  const {
    values,
    errors,
    touched,
    isValid,
    setValues,
    setErrors,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleBlur,
    handleReset,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(
      {
        risk_profile: Yup.string().required('Risk profile is required'),
        wealth_phase: Yup.string().required('Wealth phase is required'),
        five_year_average_currency_obj: Yup.mixed().when('five_year_average_amount', {
          is: (five_year_average_amount) => Boolean(five_year_average_amount),
          then: Yup.mixed().required(
            `${t('SettingsMyPreferences.currency')} ${t('Settings.isRequired')}`,
          ),
        }),
        five_year_average_amount: Yup.string()
          .min(3, t('SettingsMyPreferences.min100'))
          .when('five_year_average_currency_obj', {
            is: (five_year_average_currency_obj) => Boolean(five_year_average_currency_obj),
            then: Yup.string().required(
              `${t('SettingsMyPreferences.amount')} ${t('Settings.isRequired')}`,
            ),
          }),

        your_income_currency_obj: Yup.mixed().when('your_income_amount', {
          is: (your_income_amount) => Boolean(your_income_amount),
          then: Yup.mixed().required(
            `${t('SettingsMyPreferences.currency')} ${t('Settings.isRequired')}`,
          ),
        }),
        your_income_amount: Yup.string()
          .min(3, t('SettingsMyPreferences.min100'))
          .when('your_income_currency_obj', {
            is: (your_income_currency_obj) => Boolean(your_income_currency_obj),
            then: Yup.string().required(
              `${t('SettingsMyPreferences.amount')} ${t('Settings.isRequired')}`,
            ),
          }),
        your_assets_currency_obj: Yup.mixed().when('your_assets_amount', {
          is: (your_assets_amount) => Boolean(your_assets_amount),
          then: Yup.mixed().required(
            `${t('SettingsMyPreferences.currency')} ${t('Settings.isRequired')}`,
          ),
        }),
        your_assets_amount: Yup.string()
          .min(3, t('SettingsMyPreferences.min100'))
          .when('your_assets_currency_obj', {
            is: (your_assets_currency_obj) => Boolean(your_assets_currency_obj),
            then: Yup.string().required(
              `${t('SettingsMyPreferences.amount')} ${t('Settings.isRequired')}`,
            ),
          }),
        range_currency_obj: Yup.mixed().required(
          `${t('SettingsMyPreferences.currency')} ${t('Settings.isRequired')}`,
        ),
        range_min: Yup.string()
          .min(3, t('SettingsMyPreferences.min100'))
          .required(`${t('SettingsMyPreferences.amount')} ${t('Settings.isRequired')}`)
          .test({
            name: 'lessThanMax',
            exclusive: false,
            params: {},
            message: t('SettingsMyPreferences.lessThanMax'),
            test: function (value) {
              const range_max = this.parent.range_max?.trim();
              if (!range_max) return true;
              return +removeNonDigits(range_max) > +removeNonDigits(value);
            },
          }),
        range_max: Yup.string()
          .min(3, t('SettingsMyPreferences.min100'))
          .required(`${t('SettingsMyPreferences.amount')} ${t('Settings.isRequired')}`)
          .test({
            name: 'greaterThanMin',
            exclusive: false,
            params: {},
            message: t('SettingsMyPreferences.greaterThanMin'),
            test: function (value) {
              const range_min = this.parent.range_min?.trim();
              if (!range_min) return true;
              return +removeNonDigits(range_min) < +removeNonDigits(value);
            },
          }),
      },
      [
        ['five_year_average_currency_obj', 'five_year_average_amount'],
        ['your_income_currency_obj', 'your_income_amount'],
        ['your_assets_currency_obj', 'your_assets_amount'],
      ],
    ),
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

  const { isSuccess } = useRiskAndRange({
    retry: false,
    cacheTime: 0,
    onSuccess: (result) => {
      const { risk_and_range: data } = result.data;

      const newValues = {
        risk_profile: data?.risk_profile || 'low',
        wealth_phase: data?.wealth_phase || 'creation',

        five_year_average_currency_obj: data?.five_year_average_currency?.id
          ? {
              id: data?.five_year_average_currency?.id,
              label: data?.five_year_average_currency?.code.toUpperCase(),
            }
          : null,
        five_year_average_currency: data?.five_year_average_currency?.code.toUpperCase() || '',
        five_year_average_amount: data?.five_year_average_amount
          ? handleAmount(data.five_year_average_amount)
          : '',

        your_income_currency_obj: data?.your_income_currency?.id
          ? {
              id: data?.your_income_currency?.id,
              label: data?.your_income_currency?.code.toUpperCase(),
            }
          : null,
        your_income_currency: data?.your_income_currency?.code.toUpperCase() || '',
        your_income_amount: data?.your_income_amount ? handleAmount(data.your_income_amount) : '',

        your_assets_currency_obj: data?.your_assets_currency?.id
          ? {
              id: data?.your_assets_currency?.id,
              label: data?.your_assets_currency?.code.toUpperCase(),
            }
          : null,
        your_assets_currency: data?.your_assets_currency?.code.toUpperCase() || '',
        your_assets_amount: data?.your_assets_amount ? handleAmount(data.your_assets_amount) : '',

        range_currency_obj: data?.range_currency?.id
          ? {
              id: data?.range_currency?.id,
              label: data?.range_currency?.code.toUpperCase(),
            }
          : null,
        range_currency: data?.range_currency?.code.toUpperCase() || '',

        range_min: data?.range_min ? handleAmount(data.range_min) : '0',
        range_max: data?.range_max ? handleAmount(data.range_max) : '0',
      };

      setInitialValues(newValues);
      setValues(newValues);
    },
    onError,
  });

  const mutationFn = ({ values }) => {
    const patchData = JSON.parse(JSON.stringify(values));

    if (patchData.your_assets_amount) {
      patchData.your_assets_amount = Number(removeNonDigits(patchData.your_assets_amount));
    } else {
      delete patchData.your_assets_amount;
    }

    if (patchData.your_income_amount) {
      patchData.your_income_amount = Number(removeNonDigits(patchData.your_income_amount));
    } else {
      delete patchData.your_income_amount;
    }

    if (patchData.five_year_average_amount) {
      patchData.five_year_average_amount = Number(
        removeNonDigits(patchData.five_year_average_amount),
      );
    } else {
      delete patchData.five_year_average_amount;
    }

    if (patchData.range_min) {
      patchData.range_min = Number(removeNonDigits(patchData.range_min));
    } else {
      delete patchData.range_min;
    }

    if (patchData.range_max) {
      patchData.range_max = Number(removeNonDigits(patchData.range_max));
    } else {
      delete patchData.range_max;
    }

    if (patchData.five_year_average_currency_obj) {
      patchData.five_year_average_currency_id = patchData.five_year_average_currency_obj.id;
    }
    delete patchData.five_year_average_currency_obj;
    delete patchData.five_year_average_currency;

    if (patchData.your_income_currency_obj) {
      patchData.your_income_currency_id = patchData.your_income_currency_obj.id;
    }
    delete patchData.your_income_currency_obj;
    delete patchData.your_income_currency;

    if (patchData.your_assets_currency_obj) {
      patchData.your_assets_currency_id = patchData.your_assets_currency_obj.id;
    }
    delete patchData.your_assets_currency_obj;
    delete patchData.your_assets_currency;

    if (patchData.range_currency_obj) {
      patchData.range_currency_id = patchData.range_currency_obj.id;
    }
    delete patchData.range_currency_obj;
    delete patchData.range_currency;

    return patchRiskAndRange(patchData);
  };

  const onSuccess = (result, body) => {
    setInitialValues(body.values);
    setValues(body.values);
    queryClient.invalidateQueries('/users/me/profile/risk-and-range');
    enqueueSnackbar(t('Settings.updated'));
    clearValues();
  };

  const editMutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
    onSettled: () => setSubmitting(false),
  });

  const { data: currenciesData, isSuccess: isCurrenciesDataSuccess } = useCurrencies({
    staleTime: INFINITE_TIME_CACHE,
    enabled: isSuccess,
  });

  useSaveFormValues(
    {
      values,
      initialValues,
      touched,
    },
    !isSuccess || !isCurrenciesDataSuccess,
    pageKey,
  );

  const { toggleShowModalLStoForm, showModalLStoForm } = useToggleNotSavedState(
    isSuccess && isCurrenciesDataSuccess,
    pageKey,
  );
  useConfirmAddFromLS({
    showModalLStoForm,
    toggleShowModalLStoForm,
    setValues,
    clearValues,
    getValues,
  });

  const PAGE_IS_LOADED = isSuccess && isCurrenciesDataSuccess;

  const { handleRadioButton } = useProfileRadioButtonHandler({ setFieldValue, setFieldTouched });
  const { handleAmountField } = useAmountHandler({ handleChange });

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
            title={t('SettingsMyPreferences.riskProfile')}
            subtitle={t('SettingsMyPreferences.riskProfileText')}
          />
        </div>
        <div className={s.formContainer}>
          <form onSubmit={handleSubmit}>
            {isSuccess
              ? formRiskData.map((item) => (
                  <ProfileCheckboxRadioButton
                    isRadioButton
                    disabled={!isSuccess}
                    key={item.label}
                    checked={values.risk_profile === item.value}
                    onClick={handleRadioButton}
                    name="risk_profile"
                    label={t(`SettingsMyPreferences.${item.label}`)}
                    subtitle={t(`SettingsMyPreferences.${item.subtitle}`)}
                    icon={item.icon}
                    value={item.value}
                  />
                ))
              : Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <CheckboxRadioButtonPlaceholder
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      className={`${sPlaceholders.checkboxRadioButton} ${sPlaceholders.riskRange} ${
                        i === 2 || i === 4 ? sPlaceholders.withHeight : ''
                      }`}
                    />
                  ))}
            <div className={s.section}>
              <div className={s.titleContainer}>
                <ProfileTitleWithSubtitle
                  title={t('SettingsMyPreferences.wealthPhase')}
                  subtitle={t('SettingsMyPreferences.wealthPhaseText')}
                />
              </div>
              <div className={s.sectionContainer}>
                {isSuccess
                  ? formWealthData.map((item) => (
                      <ProfileCheckboxRadioButton
                        isRadioButton
                        disabled={!isSuccess}
                        key={item.label}
                        checked={values.wealth_phase === item.value}
                        onClick={handleRadioButton}
                        name="wealth_phase"
                        label={t(`SettingsMyPreferences.${item.label}`)}
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
                          className={sPlaceholders.checkboxRadioButton}
                        />
                      ))}
              </div>
            </div>
            <div className={s.section}>
              <div className={s.titleContainer}>
                <ProfileTitleWithSubtitle
                  title={t('SettingsMyPreferences.averageYears')}
                  subtitle={t('SettingsMyPreferences.averageYearsText')}
                />
              </div>
              <div className={s.sectionContainerInputs}>
                {isSuccess ? (
                  <div className={s.inputs}>
                    <div className={s.input}>
                      <AutocompleteSync
                        error={
                          touched.five_year_average_currency_obj &&
                          (errors.five_year_average_currency_id ||
                            errors.five_year_average_currency_obj)
                        }
                        onSelect={() => {
                          setFieldTouched('five_year_average_currency_obj', true, false);
                        }}
                        autocompleteValue={values.five_year_average_currency_obj}
                        setAutocompleteValue={(obj) =>
                          setFieldValue('five_year_average_currency_obj', obj)
                        }
                        autocompleteInputValue={values.five_year_average_currency}
                        setAutocompleteInputValue={(value) => {
                          setFieldValue('five_year_average_currency', value);
                        }}
                        name="five_year_average_currency"
                        loading={!isCurrenciesDataSuccess}
                        disabled={!PAGE_IS_LOADED}
                        label={t('SettingsMyPreferences.currency')}
                        placeholder={t('SettingsMyPreferences.currency')}
                        options={currenciesData}
                        endAdornment={<ArrowDownIcon />}
                      />
                    </div>
                    <div className={s.input}>
                      <Input
                        inputMode="numeric"
                        disabled={!isSuccess}
                        maxLength={10}
                        onBlur={handleBlur}
                        onChange={handleAmountField}
                        name="five_year_average_amount"
                        value={values.five_year_average_amount}
                        error={touched.five_year_average_amount && errors.five_year_average_amount}
                        placeholder={t('SettingsMyPreferences.amount')}
                        label={t('SettingsMyPreferences.amount')}
                        helper={t('SettingsMyPreferences.digits3_8')}
                      />
                    </div>
                  </div>
                ) : (
                  <RiskRangeSelectPlaceholder />
                )}
              </div>
            </div>
            <div className={s.sectionIncome}>
              <div className={s.titleContainer}>
                <ProfileTitleWithSubtitle
                  title={t('SettingsMyPreferences.yourIncome')}
                  subtitle={t('SettingsMyPreferences.yourIncomeText')}
                />
              </div>
              <div className={s.sectionContainerInputs}>
                {isSuccess ? (
                  <div className={s.inputs}>
                    <div className={s.input}>
                      <AutocompleteSync
                        error={
                          touched.your_income_currency_obj &&
                          (errors.your_income_currency_id || errors.your_income_currency_obj)
                        }
                        onSelect={() => {
                          setFieldTouched('your_income_currency_obj', true, false);
                        }}
                        autocompleteValue={values.your_income_currency_obj}
                        setAutocompleteValue={(obj) =>
                          setFieldValue('your_income_currency_obj', obj)
                        }
                        autocompleteInputValue={values.your_income_currency}
                        setAutocompleteInputValue={(value) => {
                          setFieldValue('your_income_currency', value);
                        }}
                        name="your_income_currency"
                        loading={!isCurrenciesDataSuccess}
                        disabled={!PAGE_IS_LOADED}
                        label={t('SettingsMyPreferences.currency')}
                        placeholder={t('SettingsMyPreferences.currency')}
                        options={currenciesData}
                        endAdornment={<ArrowDownIcon />}
                      />
                    </div>
                    <div className={s.input}>
                      <Input
                        inputMode="numeric"
                        disabled={!isSuccess}
                        maxLength={10}
                        onBlur={handleBlur}
                        onChange={handleAmountField}
                        name="your_income_amount"
                        value={values.your_income_amount}
                        placeholder={t('SettingsMyPreferences.amount')}
                        label={t('SettingsMyPreferences.amount')}
                        error={touched.your_income_amount && errors.your_income_amount}
                        helper={t('SettingsMyPreferences.digits3_8')}
                      />
                    </div>
                  </div>
                ) : (
                  <RiskRangeSelectPlaceholder />
                )}
              </div>
            </div>
            <div className={s.sectionIncome}>
              <div className={s.titleContainer}>
                <ProfileTitleWithSubtitle
                  title={t('SettingsMyPreferences.yourAssets')}
                  subtitle={t('SettingsMyPreferences.yourAssetsText')}
                />
              </div>
              <div className={s.sectionContainerInputs}>
                {isSuccess ? (
                  <div className={s.inputs}>
                    <div className={s.input}>
                      <AutocompleteSync
                        error={
                          touched.your_assets_currency_obj &&
                          (errors.your_assets_currency_id || errors.your_assets_currency_obj)
                        }
                        onSelect={() => {
                          setFieldTouched('your_assets_currency_obj', true, false);
                        }}
                        autocompleteValue={values.your_assets_currency_obj}
                        setAutocompleteValue={(obj) =>
                          setFieldValue('your_assets_currency_obj', obj)
                        }
                        autocompleteInputValue={values.your_assets_currency}
                        setAutocompleteInputValue={(value) => {
                          setFieldValue('your_assets_currency', value);
                        }}
                        name="your_assets_currency"
                        loading={!isCurrenciesDataSuccess}
                        disabled={!PAGE_IS_LOADED}
                        label={t('SettingsMyPreferences.currency')}
                        placeholder={t('SettingsMyPreferences.currency')}
                        options={currenciesData}
                        endAdornment={<ArrowDownIcon />}
                      />
                    </div>
                    <div className={s.input}>
                      <Input
                        inputMode="numeric"
                        disabled={!isSuccess}
                        maxLength={10}
                        onBlur={handleBlur}
                        onChange={handleAmountField}
                        name="your_assets_amount"
                        value={values.your_assets_amount}
                        error={touched.your_assets_amount && errors.your_assets_amount}
                        placeholder={t('SettingsMyPreferences.amount')}
                        label={t('SettingsMyPreferences.amount')}
                        helper={t('SettingsMyPreferences.digits3_8')}
                      />
                    </div>
                  </div>
                ) : (
                  <RiskRangeSelectPlaceholder />
                )}
              </div>
            </div>
            <div className={s.sectionIncome}>
              <div className={s.titleContainer}>
                <ProfileTitleWithSubtitle
                  title={t('SettingsMyPreferences.range')}
                  subtitle={t('SettingsMyPreferences.rangeText')}
                />
              </div>
              <div className={s.sectionContainerInputs}>
                {isSuccess ? (
                  <div className={s.inputs}>
                    <div className={s.inputOne}>
                      <AutocompleteSync
                        error={
                          touched.range_currency_obj &&
                          (errors.range_currency_id || errors.range_currency_obj)
                        }
                        onSelect={() => {
                          setFieldTouched('range_currency_obj', true, false);
                        }}
                        autocompleteValue={values.range_currency_obj}
                        setAutocompleteValue={(obj) => setFieldValue('range_currency_obj', obj)}
                        autocompleteInputValue={values.range_currency}
                        setAutocompleteInputValue={(value) => {
                          setFieldValue('range_currency', value);
                        }}
                        name="range_currency"
                        loading={!isCurrenciesDataSuccess}
                        disabled={!PAGE_IS_LOADED}
                        label={t('SettingsMyPreferences.currency')}
                        placeholder={t('SettingsMyPreferences.currency')}
                        options={currenciesData}
                        endAdornment={<ArrowDownIcon />}
                      />
                    </div>
                  </div>
                ) : (
                  <RiskRangeSelectPlaceholder hide />
                )}
                <div className={s.inputsDivider} />
                {isSuccess ? (
                  <div className={s.inputs}>
                    <div className={s.input}>
                      <Input
                        disabled={!isSuccess}
                        maxLength={10}
                        onBlur={handleBlur}
                        onChange={handleAmountField}
                        name="range_min"
                        value={values.range_min}
                        error={touched.range_min && errors.range_min}
                        placeholder={t('SettingsMyPreferences.minimum')}
                        label={t('SettingsMyPreferences.minimum')}
                        helper={t('SettingsMyPreferences.digits3_8')}
                        inputMode="numeric"
                      />
                    </div>
                    <div className={s.input}>
                      <Input
                        disabled={!isSuccess}
                        maxLength={10}
                        onBlur={handleBlur}
                        onChange={handleAmountField}
                        name="range_max"
                        value={values.range_max}
                        error={touched.range_max && errors.range_max}
                        placeholder={t('SettingsMyPreferences.maximum')}
                        label={t('SettingsMyPreferences.maximum')}
                        helper={t('SettingsMyPreferences.digits3_8')}
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                ) : (
                  <RiskRangeSelectPlaceholder />
                )}
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

export default FormRisk;
