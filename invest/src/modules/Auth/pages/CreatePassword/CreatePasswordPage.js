import { useState } from 'react';

import CreatePasswordComponent from 'src/modules/Auth/components/CreatePassword/CreatePasswordComponent/CreatePasswordComponent';

import Preloader from 'src/components/Preloader/Preloader';

import { useCheckIfLogged } from 'src/hooks/useCheckIfLogged';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import s from './CreatePasswordPage.module.scss';

const NotAvailable = dynamic(
  () =>
    import(
      /* webpackPreload: true */ 'src/modules/Auth/components/Login/NotAvailable/NotAvailable'
    ),
  {
    ssr: false,
  },
);
function CreatePasswordPage({ actionToken }) {
  const t = useTranslations();
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
                  alt={t('CreatePassword.Create password')}
                  src="/images/auth/create-password/graph.svg"
                  loading="lazy"
                />
              </div>
            </div>
            <div
              className={cn(s.rightCol, {
                [s.notAvailable]: Boolean(notAvailableAccount),
              })}
            >
              {notAvailableAccount ? (
                <NotAvailable notAvailableAccount={notAvailableAccount} />
              ) : (
                <CreatePasswordComponent
                  actionToken={actionToken}
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

export default CreatePasswordPage;
