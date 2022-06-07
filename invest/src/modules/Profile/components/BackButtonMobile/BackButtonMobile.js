import React from 'react';

import ArrowBackIcon from 'public/svg/profile/arrow-back.svg';

import s from './BackButtonMobile.module.scss';

function BackButtonMobile({ handleClick, text }) {
  return (
    <div className={s.container}>
      <button onClick={handleClick} className={s.button}>
        <ArrowBackIcon />
        <div className={s.text}>{text}</div>
      </button>
    </div>
  );
}

export default BackButtonMobile;
