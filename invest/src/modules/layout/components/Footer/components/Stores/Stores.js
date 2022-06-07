import React from 'react';

import dynamic from 'next/dynamic';

import s from './Stores.module.scss';

const AppleIcon = dynamic(
  () => import(/* webpackPreload: true */ 'public/svg/layout/footer/apple-store/icon.svg'),
  {
    ssr: false,
  },
);

const AppleTitleIcon = dynamic(
  () => import(/* webpackPreload: true */ 'public/svg/layout/footer/apple-store/title.svg'),
  {
    ssr: false,
  },
);

const AppleUpperTextIcon = dynamic(
  () => import(/* webpackPreload: true */ 'public/svg/layout/footer/apple-store/upper-text.svg'),
  {
    ssr: false,
  },
);

const GoogleIcon = dynamic(
  () => import(/* webpackPreload: true */ 'public/svg/layout/footer/google-play/icon.svg'),
  {
    ssr: false,
  },
);

const GoogleTitleIcon = dynamic(
  () => import(/* webpackPreload: true */ 'public/svg/layout/footer/google-play/title.svg'),
  {
    ssr: false,
  },
);

const GoogleUpperTextIcon = dynamic(
  () => import(/* webpackPreload: true */ 'public/svg/layout/footer/google-play/upper-text.svg'),
  {
    ssr: false,
  },
);
function Stores({ inView }) {
  return (
    <>
      <a className={s.appleLogo} href="#" target="_blank">
        {inView && <AppleIcon className={s.appleSvg} />}
        <div className={s.appleTextContainer}>
          {inView && <AppleUpperTextIcon className={s.appleUpperSvg} />}
          {inView && <AppleTitleIcon className={s.appleTextIcon} />}
        </div>
      </a>
      <a className={s.googlePlayLogo} href="#" target="_blank">
        {inView && <GoogleIcon className={s.googleSvg} />}
        <div className={s.googleTextContainer}>
          {inView && <GoogleUpperTextIcon className={s.googleUpperSvg} />}
          {inView && <GoogleTitleIcon className={s.googleTextIcon} />}
        </div>
      </a>
    </>
  );
}

export default Stores;
