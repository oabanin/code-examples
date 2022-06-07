import SuccessLoginByLink from 'src/modules/Auth/components/LoginByLink/SuccessLoginByLink/SuccessLoginByLink';

import { useTranslations } from 'next-intl';

import s from './LoginByLink.module.scss';

function LoginByLink({ successAccount }) {
  const t = useTranslations();

  return (
    <div className={s.bgContainer}>
      <div className="container">
        <div className={s.outerContainer}>
          <div className={s.container}>
            <div className={s.leftCol}>
              <div className={s.gradientContainer}>
                <img
                  alt={t('Layout.Login')}
                  src="/images/auth/login-by-link/graph.svg"
                  loading="lazy"
                />
              </div>
            </div>
            <div className={s.rightCol}>
              <SuccessLoginByLink email={successAccount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginByLink;
