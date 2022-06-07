import { useState } from 'react';

import LoginComponent from 'src/modules/Auth/components/Login/LoginComponent/LoginComponent';
import s from 'src/modules/Auth/pages/Login/LoginPage.module.scss';

import Preloader from 'src/components/Preloader/Preloader';

import { useCheckIfLogged } from 'src/hooks/useCheckIfLogged';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const NotAvailable = dynamic(
  () =>
    import(
      /* webpackPreload: true */ 'src/modules/Auth/components/Login/NotAvailable/NotAvailable'
    ),
  {
    ssr: false,
  },
);

function LoginPage({ blockedAccount }) {
  const t = useTranslations();
  const arraySocialErrors = useSelector(({ user }) => user.arraySocialErrors);
  const [notAvailableAccount, setNotAvailableAccount] = useState(blockedAccount || null);
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
                  width={227}
                  height={338}
                  alt={t('Layout.Login')}
                  src="/images/auth/login/graph.svg"
                  loading="lazy"
                />
              </div>
            </div>
            <div className={s.rightCol}>
              {notAvailableAccount && !arraySocialErrors.includes(notAvailableAccount) ? (
                <NotAvailable notAvailableAccount={notAvailableAccount} />
              ) : (
                <LoginComponent
                  nameNotReturnedEmail={notAvailableAccount}
                  setNotAvailableAccount={setNotAvailableAccount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
