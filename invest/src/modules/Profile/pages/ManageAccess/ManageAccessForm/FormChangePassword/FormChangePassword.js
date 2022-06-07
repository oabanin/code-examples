import React, { useState } from 'react';

import ProfileTitle from 'src/modules/Profile/components/ProfileTitle/ProfileTitle';
import { ManageAccessInputPlaceholder } from 'src/modules/Profile/pages/Placeholders/Placeholders';

import Button from 'src/components/Buttons/MuiButton/Button';
import Input from 'src/components/Form/Input/Input';

import { useLogout } from 'src/hooks/useLogout';
import { useSnackBar } from 'src/hooks/useSnackBar';

import { updatePassword } from 'src/api/users';

import { getErrors } from 'src/utils/form/getErrors';
import { initYupMethods } from 'src/utils/yup-custom-methods/init';

import { useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import HiddenIcon from 'public/svg/auth/icons/hidden.svg';
import VisibleIcon from 'public/svg/auth/icons/visible.svg';
import * as Yup from 'yup';

import s from './FormChangePassword.module.scss';

initYupMethods();

function FormChangePassword({ isSuccess }) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackBar();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const { handleLogout } = useLogout();

  const [initialValues, setInitialValues] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const validationSchema = {
    old_password: Yup.string()
      .min(8, t('Auth.min8'))
      .oneDigit(t('Auth.oneDigit'))
      .oneUppercase(t('Auth.oneUppercase'))
      .oneLowercase(t('Auth.oneLowercase'))
      .required(t('SettingsManageAccess.currentPasswordRequired'))
      .when('password_confirmation', {
        is: (password_confirmation) => password_confirmation !== '',
        then: Yup.string().test({
          name: 'Not same',
          exclusive: false,
          params: {},
          message: ' ',
          test: function (value) {
            // eslint-disable-next-line react/no-this-in-sfc
            if (value === this.parent.password_confirmation && value === this.parent.password)
              return false;
            return true;
          },
        }),
      }),
    password: Yup.string()
      .min(8, t('Auth.min8'))
      .oneDigit(t('Auth.oneDigit'))
      .oneUppercase(t('Auth.oneUppercase'))
      .oneLowercase(t('Auth.oneLowercase'))
      .required(t('SettingsManageAccess.newPasswordRequired'))
      .when('password_confirmation', {
        is: (password_confirmation) => password_confirmation !== '',
        then: Yup.string().test({
          name: 'Passwords must match',
          exclusive: false,
          params: {},
          message: ' ',
          test: function (value) {
            // eslint-disable-next-line react/no-this-in-sfc
            if (value !== this.parent.password_confirmation) return false;
            return true;
          },
        }),
      })
      .when('password_confirmation', {
        is: (password_confirmation) => password_confirmation !== '',
        then: Yup.string().test({
          name: 'Not same',
          exclusive: false,
          params: {},
          message: ' ',
          test: function (value) {
            // eslint-disable-next-line react/no-this-in-sfc
            if (value === this.parent.password_confirmation && value === this.parent.old_password)
              return false;
            return true;
          },
        }),
      }),
    password_confirmation: Yup.string()
      .min(8, t('Auth.min8'))
      .oneDigit(t('Auth.oneDigit'))
      .oneUppercase(t('Auth.oneUppercase'))
      .oneLowercase(t('Auth.oneLowercase'))
      .required(t('SettingsManageAccess.confirmRequired'))
      .when('password', {
        is: (password) => password !== '',
        then: Yup.string().test({
          name: 'Passwords must match',
          exclusive: false,
          params: {},
          message: t('CreatePassword.Passwords must match'),
          test: function (value) {
            // eslint-disable-next-line react/no-this-in-sfc
            if (value === this.parent.password) return true;
            return false;
          },
        }),
      })
      .when('old_password', {
        is: (old_password) => old_password !== '',
        then: Yup.string().test({
          name: 'Not same',
          exclusive: false,
          params: {},
          message: t('SettingsManageAccess.notSame'),
          test: function (value) {
            // eslint-disable-next-line react/no-this-in-sfc
            if (value === this.parent.old_password && value === this.parent.password) return false;
            return true;
          },
        }),
      }),
  };
  const {
    values,
    handleChange,
    setErrors,
    handleBlur,
    touched,
    errors,
    isValid,
    handleSubmit,
    setTouched,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(validationSchema, [
      ['old_password', 'password_confirmation'],
      ['password', 'password_confirmation'],
    ]),
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async () => {
      onSubmit();
    },
  });

  const handleCurrentPassword = () => {
    setShowCurrentPassword((state) => !state);
  };

  const handlePassword = () => {
    setShowPassword((state) => !state);
  };

  const handlePasswordConfirm = () => {
    setShowPasswordConfirm((state) => !state);
  };
  const handPasswordChange = (e) => {
    e.target.value = e.target.value.replace(/\s/g, '');
    handleChange(e);
  };

  const onSubmit = async (e) => {
    const body = {
      old_password: values.old_password,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    try {
      const response = await updatePassword(body);
      if (response.status === 204) {
        await setValues(initialValues);
        await setTouched({
          old_password: false,
          password: false,
          password_confirmation: false,
        });

        enqueueSnackbar(t('SettingsManageAccess.changed'));
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(t('Layout.sessionTokenExpired'));
        return;
      }

      if (error.response?.status === 419) {
        enqueueSnackbar(t('Auth.tooMany'));
        return;
      }

      if (error.response.status === 422) {
        const newErrors = getErrors(error.response.data.errors);
        setErrors(newErrors);
        return;
      }

      enqueueSnackbar(t('Layout.server_unexpectedError'));
    }
  };
  return (
    <>
      <div>
        <div className={s.titleContainer}>
          <ProfileTitle>{t('SettingsManageAccess.password')}</ProfileTitle>
        </div>
        <form className={s.formContainer} onSubmit={handleSubmit}>
          {isSuccess ? (
            <Input
              maxLength={64}
              onBlur={handleBlur}
              onChange={handPasswordChange}
              placeholder={t('SettingsManageAccess.currentPassword')}
              label={t('SettingsManageAccess.currentPassword')}
              endAdornmentHandleClick={handleCurrentPassword}
              name="old_password"
              type={showCurrentPassword ? 'text' : 'password'}
              endAdornment={showCurrentPassword ? <VisibleIcon /> : <HiddenIcon />}
              value={values.old_password}
              error={touched.old_password && errors.old_password}
            />
          ) : (
            <ManageAccessInputPlaceholder boxHeight={71} inputHeight={48} />
          )}
          <div className={s.inputContainer}>
            {isSuccess ? (
              <Input
                maxLength={64}
                onBlur={handleBlur}
                onChange={handPasswordChange}
                placeholder={t('SettingsManageAccess.newPassword')}
                label={t('SettingsManageAccess.newPassword')}
                name="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={showPassword ? <VisibleIcon /> : <HiddenIcon />}
                endAdornmentHandleClick={handlePassword}
                value={values.password}
                error={touched.password && errors.password}
              />
            ) : (
              <ManageAccessInputPlaceholder boxHeight={71} inputHeight={48} />
            )}
          </div>
          <div className={s.inputContainer}>
            {isSuccess ? (
              <Input
                maxLength={64}
                onBlur={handleBlur}
                onChange={handPasswordChange}
                name="password_confirmation"
                placeholder={t('SettingsManageAccess.confirmPassword')}
                label={t('SettingsManageAccess.confirmPassword')}
                type={showPasswordConfirm ? 'text' : 'password'}
                endAdornment={showPasswordConfirm ? <VisibleIcon /> : <HiddenIcon />}
                endAdornmentHandleClick={handlePasswordConfirm}
                value={values.password_confirmation}
                error={touched.password_confirmation && errors.password_confirmation}
              />
            ) : (
              <ManageAccessInputPlaceholder boxHeight={71} inputHeight={48} />
            )}
          </div>
          <div className={s.buttonContainer}>
            {isSuccess ? (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
                size="large"
                fullWidth
                variant="contained"
                color="primary"
              >
                {t('CreatePassword.Change password')}
              </Button>
            ) : (
              <ManageAccessInputPlaceholder
                inputWidth={isDesktopOrTablet ? 190 : 214}
                sameHeight={40}
                marginTop="20px"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default FormChangePassword;
