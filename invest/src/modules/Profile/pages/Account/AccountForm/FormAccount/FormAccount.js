import React, { useCallback, useMemo, useState } from 'react';

import ProfileTitle from 'src/modules/Profile/components/ProfileTitle/ProfileTitle';
import { useFieldBlur } from 'src/modules/Profile/hooks/form/useFieldBlur';
import { useFormWithImageChanged } from 'src/modules/Profile/hooks/form/useFormWithImageChanged';
import { useOnlyDigits } from 'src/modules/Profile/hooks/form/useOnlyDigits';
import { useAccountInformation } from 'src/modules/Profile/hooks/react-query-hooks/useAccountInformation';
import AccountType from 'src/modules/Profile/pages/Account/AccountForm/FormAccount/AccountType/AccountType';
import s from 'src/modules/Profile/pages/Account/AccountForm/FormAccount/FormAccount.module.scss';
import {
  AccountCheckboxPlaceholder,
  AccountInputPlaceholder,
  ButtonsContainerPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';

import Button from 'src/components/Buttons/MuiButton/Button';
import AppAsyncAutocomplete from 'src/components/Form/AutocompleteAsync/AppAsyncAutocomplete';
import AutocompleteSync from 'src/components/Form/AutocompleteSync/AutocompleteSync';
import CustomCheckbox from 'src/components/Form/CustomCheckbox/CustomCheckbox';
import Input from 'src/components/Form/Input/Input';
import NavigationPrompt from 'src/components/NavigationPrompt/NavigationPrompt';

import { useConfirmAddFromLS } from 'src/hooks/saveFormToLs/useConfirmAddFromLS';
import { useSaveFormValues } from 'src/hooks/saveFormToLs/useSaveFormValues';
import { useSavePageState } from 'src/hooks/saveFormToLs/useSavePageState';
import { useToggleNotSavedState } from 'src/hooks/saveFormToLs/useToggleNotSavedState';
import { useLogout } from 'src/hooks/useLogout';
import { useRegions } from 'src/hooks/useRegions';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { INFINITE_TIME_CACHE } from 'src/constants/CACHE_CONFIG';

import { getCitiesAutocomplete } from 'src/api/dictionaries/geo/cities';
import { getCountriesAutocomplete } from 'src/api/dictionaries/geo/countries';
import { postUsersMe } from 'src/api/users';

import store from 'src/store/store';
import { setUserData } from 'src/store/userSlice';

import { debounceAutocomplete } from 'src/utils/debounceAutocomplete';
import { getErrors } from 'src/utils/form/getErrors';
import { regexAlias, regexAliasReplace } from 'src/utils/form/regex';

import { listItemAvatarClasses, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import ArrowDownIcon from 'public/svg/components/autocomplete/arrow-down.svg';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const onSuccessSetInitialValues = ({ result, setInitialValues, initialValues, setValues }) => {
  const newValues = {
    address: result.data.user?.address || '',
    alias: result.data.user?.alias || '',
    first_name: result.data.user?.first_name || '',
    last_name: result.data.user?.last_name || '',
    post_code: result.data.user?.post_code || '',
    email: result.data.user?.email || '',

    is_the_postal_address:
      result.data.user?.is_the_postal_address === null
        ? true
        : result.data.user?.is_the_postal_address,
    region_obj: result.data.user?.city?.country?.region?.id
      ? {
          id: result.data.user?.city?.country?.region?.id,
          title: result.data.user?.city?.country?.region?.title,
          label: result.data.user?.city?.country?.region?.title,
        }
      : null,
    region: result.data.user?.city?.country?.region?.title || '',
    country_obj: result.data.user?.city?.country?.id
      ? { id: result.data.user?.city?.country?.id, title: result.data.user?.city?.country?.title }
      : null,
    country: result.data.user?.city?.country?.title || '',
    city_obj: result.data.user?.city?.id
      ? { id: result.data.user?.city?.id, title: result.data.user?.city?.title }
      : null,
    city: result.data.user?.city?.title || '',

    postal_region_obj: result.data.user?.postal_city?.country?.region?.id
      ? {
          id: result.data.user?.postal_city?.country?.region?.id,
          title: result.data.user?.postal_city?.country?.region?.title,
          label: result.data.user?.postal_city?.country?.region?.title,
        }
      : null,
    postal_region: result.data.user?.postal_city?.country?.region?.title || '',

    postal_country_obj: result.data.user?.postal_city?.country?.id
      ? {
          id: result.data.user?.postal_city?.country?.id,
          title: result.data.user?.postal_city?.country?.title,
        }
      : null,
    postal_country: result.data.user?.postal_city?.country?.title || '',

    postal_city_obj: result.data.user?.postal_city?.id
      ? { id: result.data.user?.postal_city?.id, title: result.data.user?.postal_city?.title }
      : null,
    postal_city: result.data.user?.postal_city?.title || '',
    postal_address: result.data.user?.postal_address || '',
    postal_post_code: result.data.user?.postal_post_code || '',
  };
  setInitialValues({ ...initialValues, ...newValues });
  setValues(newValues);
};

function FormAccount({
  confirmedUserImage,
  confirmedProfileImage,
  setConfirmedProfileImage,
  setConfirmedUserImage,
}) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();
  const accountType = useSelector((state) => state.user.user.account_type);
  const queryClient = useQueryClient();
  const { handleLogout } = useLogout();
  const userData = useSelector((state) => state.user.user);

  const isDesktop = useMediaQuery('(min-width:1440px)');
  const isDesktopOrTabletMin = useMediaQuery('(min-width:768px)');
  const isDesktopOrTabletMax = useMediaQuery('(max-width:888px)');
  const isDesktopOrTabletRadioButtonMax = useMediaQuery('(max-width:843px)');

  const validationSchema = {
    first_name: Yup.string()
      .min(2, t('SettingsAccount.min2'))
      .required(`${t('SettingsAccount.firstName')} ${t('Settings.isRequired')}`),
    last_name: Yup.string()
      .min(2, t('SettingsAccount.min2'))
      .required(`${t('SettingsAccount.lastName')} ${t('Settings.isRequired')}`),
    alias: Yup.string()
      .min(2, t('SettingsAccount.min2'))
      .required(`${t('SettingsAccount.alias')} ${t('Settings.isRequired')}`)
      .test('validAlias', t('SettingsAccount.aliasRegex'), (value) => regexAlias.test(value)),
    address: Yup.string().min(2, t('SettingsAccount.min2')),
    post_code: Yup.string().min(4, t('SettingsAccount.min4digits')),
    postal_address: Yup.string().min(2, t('SettingsAccount.min2')),
    postal_post_code: Yup.string().min(4, t('SettingsAccount.min4digits')),

    country_obj: Yup.mixed().when('region_obj', {
      is: (region_obj) => Boolean(region_obj),
      then: Yup.mixed().required(`${t('SettingsAccount.country')} ${t('Settings.isRequired')}`),
    }),
    city_obj: Yup.mixed().when('country_obj', {
      is: (country_obj) => Boolean(country_obj),
      then: Yup.mixed().required(`${t('SettingsAccount.city')} ${t('Settings.isRequired')}`),
    }),

    postal_country_obj: Yup.mixed().when('postal_region_obj', {
      is: (postal_region_obj) => Boolean(postal_region_obj),
      then: Yup.mixed().required(`${t('SettingsAccount.country')} ${t('Settings.isRequired')}`),
    }),
    postal_city_obj: Yup.mixed().when('postal_country_obj', {
      is: (postal_country_obj) => Boolean(postal_country_obj),
      then: Yup.mixed().required(`${t('SettingsAccount.city')} ${t('Settings.isRequired')}`),
    }),
  };

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    alias: '',
    region_obj: null,
    region: '',
    country_obj: null,
    country: '',
    city_obj: null,
    city: '',
    post_code: '',
    address: '',
    is_the_postal_address: true,

    postal_country: '',
    postal_country_obj: null,
    postal_city: '',
    postal_city_obj: null,
    postal_post_code: '',
    postal_address: '',
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
      if (error.response.data.errors?.profile_image) {
        enqueueSnackbar(error.response.data.errors?.profile_image[0]);
      }
      return;
    }

    enqueueSnackbar(t('Layout.server_unexpectedError'));
  };

  const { isSuccess } = useAccountInformation({
    retry: false,
    cacheTime: 0,
    onSuccess: (result) =>
      onSuccessSetInitialValues({ result, setInitialValues, initialValues, setValues }),
    onError,
  });

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setValues,
    isValid,
    setErrors,
    handleReset,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(validationSchema),
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: (values) => {
      editMutation.mutate({ values });
    },
  });
  const { handleOnlyDigits } = useOnlyDigits({ handleChange });
  const { handleFieldBlur } = useFieldBlur({ handleBlur, setFieldValue });
  const handleChangeAlias = (e) => {
    e.target.value = e.target.value.toLowerCase().replace(regexAliasReplace, '');
    handleChange(e);
  };
  const handleFocusAlias = (e) => {
    if (!values[e.target.name] && !touched[e.target.name]) {
      if (values.first_name && values.last_name) {
        const filteredFirstName = values.first_name.toLowerCase().replace(regexAliasReplace, '');
        const filteredLastName = values.last_name.toLowerCase().replace(regexAliasReplace, '');
        setFieldValue(e.target.name, `${filteredFirstName}_${filteredLastName}`);
      }
    }
  };

  const handleGenerateAlias = (e) => {
    if (touched.alias || initialValues.alias) return;
    if (e.target.name === 'first_name' && e.target.value) {
      const filteredFirstName = e.target.value.toLowerCase().replace(regexAliasReplace, '');
      const filteredLastName = values.last_name.toLowerCase().replace(regexAliasReplace, '');
      setFieldValue(
        'alias',
        `${filteredFirstName}${filteredLastName ? `-${filteredLastName}` : ''}`,
      );
    }
    if (e.target.name === 'last_name' && e.target.value) {
      const filteredFirstName = values.first_name.toLowerCase().replace(regexAliasReplace, '');
      const filteredLastName = e.target.value.toLowerCase().replace(regexAliasReplace, '');
      setFieldValue(
        'alias',
        `${filteredFirstName ? `${filteredFirstName}-` : ''}${filteredLastName}`,
      );
    }

    // if (values.first_name && values.last_name) {
    //   const filteredFirstName = values.first_name.toLowerCase().replace(regexAliasReplace, '');
    //   const filteredLastName = values.last_name.toLowerCase().replace(regexAliasReplace, '');
    //   setFieldValue(e.target.name, `${filteredFirstName}_${filteredLastName}`);
    // }
  };

  const FORM_CHANGED = useFormWithImageChanged(
    values,
    initialValues,
    confirmedUserImage,
    confirmedProfileImage,
  );

  const mutationFn = ({ values }) => {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('alias', values.alias);
    formData.append('is_the_postal_address', values.is_the_postal_address ? 1 : 0);

    values.post_code && formData.append('post_code', values.post_code);
    values.address && formData.append('address', values.address);
    values.city_obj && formData.append('city_id', values.city_obj.id);

    if (!values.is_the_postal_address) {
      values.postal_city_obj && formData.append('postal_city_id', values.postal_city_obj.id);
      values.postal_post_code && formData.append('postal_post_code', values.postal_post_code);
      values.postal_address && formData.append('postal_address', values.postal_address);
    }
    if (confirmedProfileImage) {
      formData.append('profile_image[image]', confirmedProfileImage.file);
      formData.append(
        'profile_image[image_square_parameters][x]',
        confirmedProfileImage.croppedPixels.x,
      );
      formData.append(
        'profile_image[image_square_parameters][y]',
        confirmedProfileImage.croppedPixels.y,
      );
      formData.append(
        'profile_image[image_square_parameters][width]',
        confirmedProfileImage.croppedPixels.width,
      );
    }

    if (confirmedUserImage) {
      formData.append('user_image[image]', confirmedUserImage.file);
      formData.append('user_image[image_square_parameters][x]', confirmedUserImage.croppedPixels.x);
      formData.append('user_image[image_square_parameters][y]', confirmedUserImage.croppedPixels.y);
      formData.append(
        'user_image[image_square_parameters][width]',
        confirmedUserImage.croppedPixels.width,
      );
    }
    return postUsersMe(formData);
  };

  const onSuccess = (result, body) => {
    setValues(body.values);
    setInitialValues(body.values);
    setConfirmedProfileImage(null);
    setConfirmedUserImage(null);

    const { data } = result;
    const jsonData = JSON.parse(localStorage.getItem('user'));
    dispatch(setUserData(data));
    localStorage.setItem(
      'user',
      JSON.stringify({ sessionToken: jsonData.sessionToken, user: data.user }),
    );
    queryClient.invalidateQueries('users/me');
    enqueueSnackbar(t('Settings.updated'));
    clearValues();
  };

  const editMutation = useMutation({
    mutationFn,
    onSuccess,
    onError,
    onSettled: () => setSubmitting(false),
  });

  const { data: regionsData, isSuccess: isRegionsDataDataSuccess } = useRegions({
    staleTime: INFINITE_TIME_CACHE,
  });

  useSaveFormValues(
    {
      values,
      initialValues,
      touched,
    },
    !isSuccess || !isRegionsDataDataSuccess,
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

  const fetchPostalCities = useCallback(
    debounceAutocomplete(
      async (
        inputValue,
        { setOptions, setIsMore, isMore, setLoading, pageSize, page, apiParams },
      ) => {
        if (!isMore) {
          setLoading(false);
          return;
        }
        if (!inputValue) {
          setLoading(false);
        }
        try {
          const result = await getCitiesAutocomplete(
            page + 1,
            pageSize,
            inputValue,
            apiParams.region_id,
            apiParams.country_id,
          );

          let noMoreItems;
          if (result?.data) {
            noMoreItems = !result.data?.hasMore;
          }

          if (noMoreItems) {
            setIsMore(false);
          } else {
            setIsMore(true);
          }
          const newOptions = result?.data?.items.map((item) => item) || [];

          if (result?.data.length !== 0 && !noMoreItems) {
            newOptions.push({
              value: 'loading',
              label: 'loading',
              type: 'LOADING',
            });
          }

          setOptions((prev) => [...prev.filter((item) => item.type !== 'LOADING'), ...newOptions]);

          setLoading(false);

          return result;
        } catch (err) {
          console.error(err);
        }
      },
      200,
    ),
    // [],
    [values.postal_region_obj?.id, values.postal_country_obj?.id],
  );

  const fetchPostalCountries = useMemo(
    () =>
      debounceAutocomplete(
        async (
          inputValue,
          { setOptions, setIsMore, isMore, setLoading, pageSize, page, apiParams },
        ) => {
          if (!isMore) {
            setLoading(false);
            return;
          }

          if (!inputValue) {
            setLoading(false);
          }

          try {
            const result = await getCountriesAutocomplete(
              page + 1,
              pageSize,
              inputValue,
              apiParams.region_id,
            );

            let noMoreItems;
            if (result?.data) {
              noMoreItems = !result.data?.hasMore;
            }

            if (noMoreItems) {
              setIsMore(false);
            } else {
              setIsMore(true);
            }
            const newOptions = result?.data?.items.map((item) => item) || [];

            if (result?.data.length !== 0 && !noMoreItems) {
              newOptions.push({
                value: 'loading',
                label: 'loading',
                type: 'LOADING',
              });
            }

            setOptions((prev) => [
              ...prev.filter((item) => item.type !== 'LOADING'),
              ...newOptions,
            ]);

            setLoading(false);

            return result;
          } catch (err) {
            console.error(err);
          }
        },
        200,
      ),
    [values.postal_region_obj?.id],
    // [],
  );

  const fetchCountries = useMemo(
    () =>
      debounceAutocomplete(
        async (
          inputValue,
          { setOptions, setIsMore, isMore, setLoading, pageSize, page, apiParams },
        ) => {
          if (!isMore) {
            setLoading(false);
            return;
          }

          if (!inputValue) {
            setLoading(false);
          }

          try {
            const result = await getCountriesAutocomplete(
              page + 1,
              pageSize,
              inputValue,
              apiParams.region_id,
            );

            let noMoreItems;
            if (result?.data) {
              noMoreItems = !result.data?.hasMore;
            }

            if (noMoreItems) {
              setIsMore(false);
            } else {
              setIsMore(true);
            }
            const newOptions = result?.data?.items.map((item) => item) || [];

            if (result?.data.length !== 0 && !noMoreItems) {
              newOptions.push({
                value: 'loading',
                label: 'loading',
                type: 'LOADING',
              });
            }

            setOptions((prev) => [
              ...prev.filter((item) => item.type !== 'LOADING'),
              ...newOptions,
            ]);

            setLoading(false);

            return result;
          } catch (err) {
            console.error(err);
          }
        },
        200,
      ),
    [values.region_obj?.id],
    // [],
  );

  const fetchCities = useCallback(
    debounceAutocomplete(
      async (
        inputValue,
        { setOptions, setIsMore, isMore, setLoading, pageSize, page, apiParams },
      ) => {
        if (!isMore) {
          setLoading(false);
          return;
        }
        if (!inputValue) {
          setLoading(false);
        }
        try {
          const result = await getCitiesAutocomplete(
            page + 1,
            pageSize,
            inputValue,
            apiParams.region_id,
            apiParams.country_id,
          );
          const noMoreItems = !result?.data?.hasMore;

          if (noMoreItems) {
            setIsMore(false);
          } else {
            setIsMore(true);
          }
          const newOptions = result?.data?.items.map((item) => item) || [];

          if (result?.data.length !== 0 && !noMoreItems) {
            newOptions.push({
              value: 'loading',
              label: 'loading',
              type: 'LOADING',
            });
          }

          setOptions((prev) => [...prev.filter((item) => item.type !== 'LOADING'), ...newOptions]);

          setLoading(false);

          return result;
        } catch (err) {
          console.error(err);
        }
      },
      200,
    ),
    // [],
    [values.region_obj?.id, values.country_obj?.id],
  );

  const handleValueWithoutCyrillic = (e) => {
    setFieldValue(e.target.name, e.target.value.replace(/[а-яёА-ЯЁ]+/g, ''));
  };

  return (
    <>
      <NavigationPrompt
        when={isSuccess && isRegionsDataDataSuccess && FORM_CHANGED}
        title={t('Settings.leavePageTitle')}
        body={t('Settings.leavePageText')}
        declineBtn={t('Settings.leave')}
        approveBtn={t('Settings.stay')}
        onApprove={() => {}}
        onCancel={() => clearValues()}
      />
      <ProfileTitle>{t('SettingsAccount.accountInformation')}</ProfileTitle>
      <div className={s.accountTypeContainer}>
        <div className={s.borderCard} />
        <AccountType
          title={t(`SettingsAccount.${accountType === 'personal' ? 'personal' : 'business'}`)}
          text={t('SettingsAccount.accountType')}
          isSuccess={isSuccess}
        />
        {accountType === 'business' && (
          <AccountType title={t('SettingsAccount.enterprise')} text={t('SettingsAccount.plan')} />
        )}
      </div>
      <div className={s.titleSectionContainer}>
        <ProfileTitle>{t('SettingsAccount.personalInfo')}</ProfileTitle>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={s.firstInputContainer}>
          {isSuccess ? (
            <Input
              counter
              maxLength={64}
              onBlur={handleFieldBlur}
              onChange={(e) => {
                handleValueWithoutCyrillic(e);
                handleGenerateAlias(e);
              }}
              name="first_name"
              value={values.first_name}
              error={touched.first_name && errors.first_name}
              placeholder={t('SettingsAccount.firstName')}
              label={t('SettingsAccount.firstName')}
            />
          ) : (
            <AccountInputPlaceholder />
          )}
        </div>
        <div className={s.inputContainer}>
          {isSuccess ? (
            <Input
              counter
              maxLength={64}
              onBlur={handleFieldBlur}
              onChange={(e) => {
                handleValueWithoutCyrillic(e);
                handleGenerateAlias(e);
              }}
              name="last_name"
              value={values.last_name}
              error={touched.last_name && errors.last_name}
              placeholder={t('SettingsAccount.lastName')}
              label={t('SettingsAccount.lastName')}
            />
          ) : (
            <AccountInputPlaceholder />
          )}
        </div>
        <div className={s.inputContainer}>
          {isSuccess ? (
            <Input
              counter
              maxLength={128}
              // onFocus={handleFocusAlias}
              onBlur={handleBlur}
              onChange={handleChangeAlias}
              name="alias"
              value={values.alias}
              error={touched.alias && errors.alias}
              placeholder={t('SettingsAccount.alias')}
              label={t('SettingsAccount.alias')}
              helper={t('SettingsAccount.helperAlias')}
            />
          ) : (
            <AccountInputPlaceholder
              height={isDesktopOrTabletMin && isDesktopOrTabletMax && '81px'}
            />
          )}
        </div>
        <div className={s.titleSectionContainerFormResidential}>
          <ProfileTitle>{t('SettingsAccount.residentialAddress')}</ProfileTitle>
        </div>

        <div className={s.firstInputContainer}>
          {isSuccess ? (
            <AutocompleteSync
              onSelect={(newValue) => {
                setFieldValue('country_obj', null);
                setFieldValue('country', '');
                setFieldValue('city_obj', null);
                setFieldValue('city', '');
              }}
              autocompleteValue={values.region_obj}
              setAutocompleteValue={(obj) => setFieldValue('region_obj', obj)}
              autocompleteInputValue={values.region}
              setAutocompleteInputValue={(value) => {
                setFieldValue('region', value);
              }}
              name="region"
              loading={!isRegionsDataDataSuccess}
              disabled={!isRegionsDataDataSuccess}
              label={t('SettingsAccount.region')}
              placeholder={t('SettingsAccount.region')}
              options={regionsData}
              endAdornment={<ArrowDownIcon />}
            />
          ) : (
            <AccountInputPlaceholder />
          )}
        </div>
        <div className={s.inputContainer}>
          {isSuccess ? (
            <AppAsyncAutocomplete
              onBlur={handleFieldBlur}
              onSelect={(newValue) => {
                setFieldValue('country_obj', newValue);
              }}
              autocompleteValue={values.country_obj}
              setAutocompleteValue={(obj) => setFieldValue('country_obj', obj)}
              autocompleteInputValue={values.country}
              setAutocompleteInputValue={(value) => {
                setFieldValue('country', value);
                if (value === '') {
                  setFieldValue('city_obj', null);
                  setFieldValue('city', '');
                }
              }}
              error={touched.country && errors.country_obj}
              name="country"
              disabled={!values.region_obj?.id}
              label={t('SettingsAccount.country')}
              placeholder={t('SettingsAccount.country')}
              maxLength={64}
              apiParams={{ region_id: values.region_obj?.id }}
              fetch={fetchCountries}
              getOptionLabel={(option) => {
                if (!option.id) {
                  return option;
                }
                return `${option.title}`;
              }}
              textRender={(option) => `${option.title}`}
              endAdornment={<ArrowDownIcon />}
            />
          ) : (
            <AccountInputPlaceholder />
          )}
        </div>
        <div className={s.inputContainer}>
          {isSuccess ? (
            <AppAsyncAutocomplete
              onBlur={handleFieldBlur}
              onSelect={(newValue) => {
                setFieldValue('city_obj', newValue);
              }}
              autocompleteValue={values.city_obj}
              setAutocompleteValue={(obj) => setFieldValue('city_obj', obj)}
              autocompleteInputValue={values.city}
              setAutocompleteInputValue={(value) => {
                setFieldValue('city', value);
              }}
              error={touched.city && errors.city_obj}
              name="city"
              disabled={!values.country_obj?.id}
              label={t('SettingsAccount.city')}
              placeholder={t('SettingsAccount.city')}
              maxLength={64}
              fetch={fetchCities}
              apiParams={{ region_id: values.region_obj?.id, country_id: values.country_obj?.id }}
              getOptionLabel={(option) => {
                if (!option.id) {
                  return option;
                }
                return `${option.title}`;
              }}
              textRender={(option) => `${option.title}`}
              endAdornment={<ArrowDownIcon />}
            />
          ) : (
            <AccountInputPlaceholder />
          )}
        </div>
        <div className={`${s.inputContainer} ${s.postalCode}`}>
          {isSuccess ? (
            <Input
              counter
              maxLength={10}
              onBlur={handleFieldBlur}
              onChange={handleOnlyDigits}
              type="tel"
              name="post_code"
              value={values.post_code}
              error={touched.post_code && errors.post_code}
              placeholder={t('SettingsAccount.postalCodePlaceholder')}
              label={t('SettingsAccount.postalCode')}
            />
          ) : (
            <AccountInputPlaceholder width={190} />
          )}
        </div>
        <div className={s.inputContainer}>
          {isSuccess ? (
            <Input
              counter
              maxLength={256}
              onBlur={handleFieldBlur}
              onChange={handleValueWithoutCyrillic}
              name="address"
              value={values.address}
              error={touched.address && errors.address}
              placeholder={t('SettingsAccount.address')}
              label={t('SettingsAccount.address')}
            />
          ) : (
            <AccountInputPlaceholder />
          )}
        </div>
        <div className={s.checkboxContainer}>
          {isSuccess ? (
            <>
              <CustomCheckbox
                label={t('SettingsAccount.samePostal')}
                name="is_the_postal_address"
                value={values.is_the_postal_address}
                onChange={(e) => {
                  handleChange(e);
                  if (!e.target.checked) {
                    values.city && setFieldValue('postal_city', values.city);
                    values.region && setFieldValue('postal_region', values.region);
                    values.country && setFieldValue('postal_country', values.country);
                    values.city_obj && setFieldValue('postal_city_obj', { ...values.city_obj });
                    values.region_obj &&
                      setFieldValue('postal_region_obj', { ...values.region_obj });
                    values.country_obj &&
                      setFieldValue('postal_country_obj', { ...values.country_obj });
                    values.address && setFieldValue('postal_address', values.address);
                    values.post_code && setFieldValue('postal_post_code', values.post_code);
                  }
                }}
                checked={values.is_the_postal_address}
              />
            </>
          ) : (
            <AccountCheckboxPlaceholder
              height={
                isDesktopOrTabletMin && isDesktopOrTabletRadioButtonMax
                  ? '57px'
                  : !isDesktop && '38px'
              }
            />
          )}
        </div>
        {!values.is_the_postal_address && (
          <>
            <div className={s.titleSectionContainerFormPostal}>
              <ProfileTitle>{t('SettingsAccount.postalAddress')}</ProfileTitle>
            </div>
            <div className={s.firstInputContainer}>
              <AutocompleteSync
                onBlur={handleFieldBlur}
                onSelect={() => {
                  setFieldValue('postal_country_obj', null);
                  setFieldValue('postal_country', '');
                  setFieldValue('postal_city_obj', null);
                  setFieldValue('postal_city', '');
                }}
                autocompleteValue={values.postal_region_obj}
                setAutocompleteValue={(obj) => setFieldValue('postal_region_obj', obj)}
                autocompleteInputValue={values.postal_region}
                setAutocompleteInputValue={(value) => {
                  setFieldValue('postal_region', value);
                }}
                name="postal_region"
                loading={!isRegionsDataDataSuccess}
                disabled={!isRegionsDataDataSuccess}
                label={t('SettingsAccount.region')}
                placeholder={t('SettingsAccount.region')}
                options={regionsData}
                endAdornment={<ArrowDownIcon />}
              />
            </div>
            <div className={s.inputContainer}>
              <AppAsyncAutocomplete
                onBlur={handleFieldBlur}
                onSelect={(newValue) => {
                  setFieldValue('postal_country_obj', newValue);
                }}
                autocompleteValue={values.postal_country_obj}
                setAutocompleteValue={(obj) => setFieldValue('postal_country_obj', obj)}
                autocompleteInputValue={values.postal_country}
                setAutocompleteInputValue={(value) => {
                  setFieldValue('postal_country', value);
                  if (value === '') {
                    setFieldValue('postal_city_obj', null);
                    setFieldValue('postal_city', '');
                  }
                }}
                error={touched.postal_country && errors.postal_country_obj}
                name="postal_country"
                disabled={!values.postal_region_obj?.id}
                label={t('SettingsAccount.country')}
                placeholder={t('SettingsAccount.country')}
                maxLength={64}
                apiParams={{ region_id: values.postal_region_obj?.id }}
                fetch={fetchPostalCountries}
                getOptionLabel={(option) => {
                  if (!option.id) {
                    return option;
                  }
                  return `${option.title}`;
                }}
                textRender={(option) => `${option.title}`}
                endAdornment={<ArrowDownIcon />}
              />
            </div>
            <div className={s.inputContainer}>
              <AppAsyncAutocomplete
                onBlur={handleFieldBlur}
                onSelect={(newValue) => {
                  setFieldValue('postal_city_obj', newValue);
                }}
                autocompleteValue={values.postal_city_obj}
                setAutocompleteValue={(obj) => setFieldValue('postal_city_obj', obj)}
                autocompleteInputValue={values.postal_city}
                setAutocompleteInputValue={(value) => {
                  setFieldValue('postal_city', value);
                }}
                error={touched.postal_city && errors.postal_city_obj}
                name="postal_city"
                disabled={!values.postal_country_obj?.id}
                label={t('SettingsAccount.city')}
                placeholder={t('SettingsAccount.city')}
                maxLength={64}
                fetch={fetchPostalCities}
                apiParams={{
                  region_id: values.postal_region_obj?.id,
                  country_id: values.postal_country_obj?.id,
                }}
                getOptionLabel={(option) => {
                  if (!option.id) {
                    return option;
                  }
                  return `${option.title}`;
                }}
                textRender={(option) => `${option.title}`}
                endAdornment={<ArrowDownIcon />}
              />
            </div>
            <div className={`${s.inputContainer} ${s.postalCode}`}>
              <Input
                counter
                maxLength={10}
                onBlur={handleFieldBlur}
                onChange={handleOnlyDigits}
                name="postal_post_code"
                value={values.postal_post_code}
                error={touched.postal_post_code && errors.postal_post_code}
                placeholder={t('SettingsAccount.postalCodePlaceholder')}
                label={t('SettingsAccount.postalCode')}
              />
            </div>
            <div className={s.inputContainer}>
              <Input
                counter
                maxLength={256}
                onBlur={handleFieldBlur}
                onChange={handleChange}
                name="postal_address"
                value={values.postal_address}
                error={touched.postal_address && errors.postal_address}
                placeholder={t('SettingsAccount.address')}
                label={t('SettingsAccount.address')}
              />
            </div>
          </>
        )}
        <div className={s.buttonsContainer}>
          {isSuccess ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  setConfirmedProfileImage(null);
                  setConfirmedUserImage(null);
                  handleReset();
                }}
                disabled={
                  !isValid ||
                  isSubmitting ||
                  !FORM_CHANGED ||
                  (!confirmedProfileImage && !userData?.profile_image?.original)
                }
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
                disabled={
                  !isValid ||
                  isSubmitting ||
                  !FORM_CHANGED ||
                  (!confirmedProfileImage && !userData?.profile_image?.original)
                }
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

export default FormAccount;
