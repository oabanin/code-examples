import React from 'react';

import s from './AccountMobileImageButton.module.scss';

function AccountMobileImageButton({ handleClick, image, text }) {
  return (
    <button onClick={handleClick} className={s.button}>
      <img
        className={s.img}
        alt={text}
        src={image || '/svg/profile/profile-placeholder.svg'}
        width={32}
        height={32}
      />
      <div className={s.right}>{text}</div>
    </button>
  );
}

export default AccountMobileImageButton;
