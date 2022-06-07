import { useState } from 'react';

import PasswordRecoveryComponent from 'src/modules/Auth/components/PasswordRecovery/PasswordRecoveryComponent/PasswordRecoveryComponent';

import Preloader from 'src/components/Preloader/Preloader';

import { useCheckIfLogged } from 'src/hooks/useCheckIfLogged';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import s from './PasswordRecoveryPage.module.scss';

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

function PasswordRecovery() {
  const t = useTranslations();
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
                  alt={t('PasswordRecovery.Password recovery')}
                  src="/images/auth/password-recovery/graph.svg"
                  loading="lazy"
                />
              </div>
            </div>
            <div
              className={cn(s.rightCol, {
                [s.success]: Boolean(successEmail),
                [s.notAvailable]: Boolean(notAvailableAccount),
              })}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {notAvailableAccount ? (
                <NotAvailable notAvailableAccount={notAvailableAccount} />
              ) : successEmail ? (
                <Success email={successEmail} />
              ) : (
                <PasswordRecoveryComponent
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

export default PasswordRecovery;
