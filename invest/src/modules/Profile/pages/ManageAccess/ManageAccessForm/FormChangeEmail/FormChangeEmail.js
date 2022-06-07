import React, { useRef, useState } from 'react';

import ProfileTitle from 'src/modules/Profile/components/ProfileTitle/ProfileTitle';
import ProfileTitleWithSubtitle from 'src/modules/Profile/components/ProfileTitleWithSubtitle/ProfileTitleWithSubtitle';
import { useFormChanged } from 'src/modules/Profile/hooks/form/useFormChanged';
import {
  ManageAccessEmailTextPlaceholder,
  ManageAccessInputPlaceholder,
} from 'src/modules/Profile/pages/Placeholders/Placeholders';

import Button from 'src/components/Buttons/MuiButton/Button';
import TextButton from 'src/components/Buttons/TextButton/TextButton';
import Countdown from 'src/components/Form/Countdown/CountDown';
import Input from 'src/components/Form/Input/Input';

import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { emailChangeConfirm, emailChangeInit, emailChangeSave } from 'src/api/users';

import { setUserData } from 'src/store/userSlice';

import { getErrors } from 'src/utils/form/getErrors';
import { initYupMethods } from 'src/utils/yup-custom-methods/init';

import { useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import s from './FormChangeEmail.module.scss';

initYupMethods();

function FormChangeEmail({ initialValue, isSuccess }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackBar();
  const { handleLogout } = useLogout();
  const isDesktop = useMediaQuery('(min-width:1440px)');
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const isDesktopOrTabletMax = useMediaQuery('(max-width:803px)');
  const [countDownValue, setCountDownValue] = useState(59);
  const dispatch = useDispatch();
  const confirm_code_2 = useRef();
  const confirm_code_3 = useRef();
  const confirm_code_4 = useRef();

  const [initialValues, setInitialValues] = useState({
    email: initialValue || '',
    is_field_read_only: true,
    is_confirm_code_sent: false,
    confirm_code_1: '',
    confirm_code_2: '',
    confirm_code_3: '',
    confirm_code_4: '',
  });

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
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .emailValid(t('Auth.emailInvalid'))
        .when('is_field_read_only', {
          is: (is_field_read_only) => !is_field_read_only,
          then: Yup.string().required(t('Auth.emailRequired')),
        }),
      confirm_code_1: Yup.string().when('is_confirm_code_sent', {
        is: (is_confirm_code_sent) => is_confirm_code_sent,
        then: Yup.string().required(`Code is required`),
      }),
      confirm_code_2: Yup.string().when('is_confirm_code_sent', {
        is: (is_confirm_code_sent) => is_confirm_code_sent,
        then: Yup.string().required(`Code is required`),
      }),
      confirm_code_3: Yup.string().when('is_confirm_code_sent', {
        is: (is_confirm_code_sent) => is_confirm_code_sent,
        then: Yup.string().required(`Code is required`),
      }),
      confirm_code_4: Yup.string().when('is_confirm_code_sent', {
        is: (is_confirm_code_sent) => is_confirm_code_sent,
        then: Yup.string().required(`Code is required`),
      }),
    }),
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values.is_field_read_only) {
        await setFieldValue('is_field_read_only', false);
        return;
      }

      if (!values.is_confirm_code_sent) {
        await changeInit();
        return;
      }

      await confirmAndSave();
    },
  });

  const handleFieldBlur = (e) => {
    handleBlur(e);
    setFieldValue(e.target.name, e.target.value.replace(/\s/g, ''));
  };

  const handleChangeCode = async (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    e.target.value = e.target.value.slice(0, 4);
    if (e.target.value.length === 4) {
      const splittedCode = e.target.value.split('');
      e.target.value = splittedCode[0];
      await setFieldValue('confirm_code_1', splittedCode[0]);
      await setFieldValue('confirm_code_2', splittedCode[1]);
      await setFieldValue('confirm_code_3', splittedCode[2]);
      await setFieldValue('confirm_code_4', splittedCode[3]);
      return;
    }
    e.target.value = e.target.value.substr(0, 1);
    handleChange(e);
    if (!e.target.value) return;
    const last = e.target.name.at(-1);
    switch (last) {
      case '1':
        confirm_code_2.current.firstChild.focus();
        confirm_code_2.current.firstChild.setSelectionRange(0, 0);
        break;
      case '2':
        confirm_code_3.current.firstChild.focus();
        confirm_code_3.current.firstChild.setSelectionRange(0, 0);
        break;
      case '3':
        confirm_code_4.current.firstChild.focus();
        confirm_code_4.current.firstChild.setSelectionRange(0, 0);
        break;
      default:
    }
  };

  const handleFocus = (e) => {
    e.target.setSelectionRange(0, 0);
    setTimeout(() => e.target.setSelectionRange(0, 0), 100);
  };

  const FORM_CHANGED = useFormChanged(values.email, initialValues.email);

  const changeInit = async () => {
    const body = { email: values.email };
    try {
      const response = await emailChangeInit(body);
      if (response.status === 204) {
        enqueueSnackbar(t('SettingsManageAccess.codeSent'));
        setFieldValue('is_confirm_code_sent', true);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(t('Layout.sessionTokenExpired'));
        return;
      }

      if (error.response?.status === 419) {
        enqueueSnackbar(t('Auth.tooMany'));
        setSubmitting(false);
        return;
      }
      if (error.response.status === 422) {
        const newErrors = getErrors(error.response.data.errors);
        setErrors(newErrors);
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      enqueueSnackbar(t('Layout.server_unexpectedError'));
    }
  };
  const confirmAndSave = async () => {
    const code = `${values.confirm_code_1}${values.confirm_code_2}${values.confirm_code_3}${values.confirm_code_4}`;
    const body = { code };
    try {
      const result = await emailChangeConfirm(body);
      if (result.status === 204) {
        const newValues = { ...initialValues, email: values.email };
        setInitialValues(newValues);
        setValues(newValues);
        enqueueSnackbar(t('Settings.updated'));
        const jsonData = JSON.parse(localStorage.getItem('user'));
        const newUserdata = {
          sessionToken: jsonData.sessionToken,
          user: { ...jsonData.user, email: values.email },
        };
        dispatch(setUserData(newUserdata));
        localStorage.setItem('user', JSON.stringify(newUserdata));
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(t('Layout.sessionTokenExpired'));
        return;
      }
      if (error.response.status === 422) {
        const newErrors = getErrors(error.response.data.errors);
        setErrors(newErrors);
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      enqueueSnackbar(t('Layout.server_unexpectedError'));
    }
  };

  return (
    <>
      <form className={s.formContainer} onSubmit={handleSubmit}>
        {values.is_confirm_code_sent ? (
          <div className={s.subtitleContainer}>
            <ProfileTitleWithSubtitle
              title={isDesktopOrTablet && t('Auth.Email')}
              subtitle={t('SettingsManageAccess.followEmail')}
            />
          </div>
        ) : (
          <div className={s.firstStepTitleContainer}>
            <ProfileTitle>{t('Auth.Email')}</ProfileTitle>
          </div>
        )}
        {values.is_confirm_code_sent ? (
          <>
            <p className={s.label}>{t('SettingsManageAccess.verificationCode')}</p>
            <div className={s.codeContainer}>
              <Input
                className={s.inputCode}
                shrinkLabel
                inputMode="numeric"
                onBlur={handleFieldBlur}
                onChange={handleChangeCode}
                onFocus={handleFocus}
                onClick={handleFocus}
                name="confirm_code_1"
                value={values.confirm_code_1}
                placeholder="X"
                error={touched.confirm_code_1 && Boolean(errors.code) && ' '}
              />
              <Input
                ref={confirm_code_2}
                className={s.inputCode}
                shrinkLabel
                inputMode="numeric"
                onBlur={handleFieldBlur}
                onChange={handleChangeCode}
                onFocus={handleFocus}
                onClick={handleFocus}
                name="confirm_code_2"
                value={values.confirm_code_2}
                placeholder="X"
                error={touched.confirm_code_2 && Boolean(errors.code) && ' '}
              />
              <Input
                ref={confirm_code_3}
                shrinkLabel
                inputMode="numeric"
                className={s.inputCode}
                onBlur={handleFieldBlur}
                onChange={handleChangeCode}
                onFocus={handleFocus}
                onClick={handleFocus}
                name="confirm_code_3"
                value={values.confirm_code_3}
                placeholder="X"
                error={touched.confirm_code_3 && Boolean(errors.code) && ' '}
              />
              <Input
                ref={confirm_code_4}
                shrinkLabel
                inputMode="numeric"
                className={s.inputCode}
                onBlur={handleFieldBlur}
                onChange={handleChangeCode}
                onFocus={handleFocus}
                onClick={handleFocus}
                name="confirm_code_4"
                value={values.confirm_code_4}
                placeholder="X"
                error={touched.confirm_code_4 && Boolean(errors.code) && ' '}
              />
              <div className={s.error}>{errors.code}</div>
            </div>
          </>
        ) : (
          <div className={s.inputContainer}>
            {isSuccess ? (
              <Input
                counter={!values.is_field_read_only}
                readOnly={values.is_field_read_only}
                maxLength={254}
                onBlur={handleFieldBlur}
                onChange={handleChange}
                name="email"
                value={values.email}
                error={touched.email && errors.email}
                placeholder={t('SettingsManageAccess.currentEmail')}
                label={t('SettingsManageAccess.currentEmail')}
              />
            ) : (
              <ManageAccessInputPlaceholder boxHeight={71} inputHeight={48} />
            )}
          </div>
        )}
        <div className={s.textAndBtnContainer}>
          <div className={cn(s.text, { [s.codeSent]: values.is_confirm_code_sent })}>
            {isSuccess ? (
              values.is_confirm_code_sent ? (
                <>
                  {t('SettingsManageAccess.didntGet')}
                  {!isDesktopOrTablet ? <br /> : ' '}
                  {t('SettingsManageAccess.checkSpam')}{' '}
                  {countDownValue > 0 ? (
                    <>
                      {t('SettingsManageAccess.youCanResend')}{' '}
                      <b>
                        00:{countDownValue > 0 && countDownValue < 10 && '0'}
                        <Countdown value={countDownValue} setValue={setCountDownValue} />
                      </b>{' '}
                    </>
                  ) : (
                    <TextButton
                      type="button"
                      onClick={async () => {
                        await changeInit();
                        setCountDownValue(59);
                        setFieldValue('confirm_code_1', '');
                        setFieldValue('confirm_code_2', '');
                        setFieldValue('confirm_code_3', '');
                        setFieldValue('confirm_code_4', '');
                      }}
                    >
                      {t('SettingsManageAccess.resendCode')}
                    </TextButton>
                  )}
                </>
              ) : (
                values.is_field_read_only && <>{t('SettingsManageAccess.changingEmail')}</>
              )
            ) : (
              <ManageAccessEmailTextPlaceholder />
            )}
          </div>
          {isSuccess ? (
            values.is_field_read_only || values.is_confirm_code_sent ? (
              <div className={cn(s.buttonContainer, { [s.codeSent]: values.is_confirm_code_sent })}>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  size="large"
                  fullWidth
                  variant={values.is_confirm_code_sent ? 'contained' : 'outlined'}
                  color={values.is_confirm_code_sent ? 'primary' : 'secondary'}
                >
                  {values.is_confirm_code_sent
                    ? t('PasswordRecovery.Submit')
                    : t('SettingsManageAccess.changeEmail')}
                </Button>
              </div>
            ) : (
              <div className={s.buttonsContainer}>
                <Button
                  type="button"
                  onClick={handleReset}
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
                  disabled={!isValid || !FORM_CHANGED || isSubmitting}
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {t('Settings.save')}
                </Button>
              </div>
            )
          ) : (
            <ManageAccessInputPlaceholder
              inputWidth={isDesktopOrTablet ? 190 : 214}
              sameHeight={40}
              display="flex"
              marginTop="24px"
              justifyContent={isDesktopOrTablet ? 'flex-start' : 'center'}
            />
          )}
        </div>
      </form>
    </>
  );
}

export default FormChangeEmail;
