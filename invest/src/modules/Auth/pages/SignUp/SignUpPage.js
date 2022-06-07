import { useState } from 'react';

import SignUpComponent from 'src/modules/Auth/components/SignUp/SignUpComponent';

import Preloader from 'src/components/Preloader/Preloader';

import { useCheckIfLogged } from 'src/hooks/useCheckIfLogged';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import s from './SignUpPage.module.scss';

const Success = dynamic(
  () =>
    import(
      /* webpackPreload: true */ 'src/modules/Auth/components/PasswordRecovery/Success/Success'
    ),
  {
    ssr: false,
  },
);

const NotAvailable = dynamic(
  () =>
    import(
      /* webpackPreload: true */ 'src/modules/Auth/components/Login/NotAvailable/NotAvailable'
    ),
  {
    ssr: false,
  },
);

function SignUpPage() {
  const t = useTranslations();
  const arraySocialErrors = useSelector(({ user }) => user.arraySocialErrors);
  const [successEmail, setSuccessEmail] = useState(null);
  const [notAvailableAccount, setNotAvailableAccount] = useState(null);
  const { isLogged } = useCheckIfLogged();
  if (!isLogged) return <Preloader />;

  return (
    <div className={s.bgContainer}>
      <div className="container">
        <div className={s.outerContainer}>
          <div className={s.container}>
            <div className={s.leftCol}>
              <div className={s.gradientContainer}>
                <img
                  alt={t('SignUp.Sign up')}
                  src="/images/auth/sign-up/graph.svg"
                  loading="lazy"
                />
              </div>
            </div>
            <div
              className={cn(s.rightCol, {
                [s.success]: Boolean(successEmail),
              })}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {notAvailableAccount && !arraySocialErrors.includes(notAvailableAccount) ? (
                <NotAvailable notAvailableAccount={notAvailableAccount} />
              ) : successEmail ? (
                <Success email={successEmail} />
              ) : (
                <SignUpComponent
                  nameNotReturnedEmail={notAvailableAccount}
                  setNotAvailableAccount={setNotAvailableAccount}
                  setSuccessEmail={setSuccessEmail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
