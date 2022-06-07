import React from 'react';

import { AccountTypePlaceholder } from 'src/modules/Profile/pages/Placeholders/Placeholders';

import EditIcon from 'public/svg/profile/edit.svg';

import s from './AccountType.module.scss';

function AccountType({ text, title, onClick, isSuccess }) {
  return (
    <div className={s.container}>
      <div className={s.left}>{text}</div>
      <div className={s.right}>
        {isSuccess ? (
          <>
            {title}
            <button onClick={onClick} type="button" className={s.btn}>
              <EditIcon />
            </button>
          </>
        ) : (
          <AccountTypePlaceholder />
        )}
      </div>
    </div>
  );
}

export default AccountType;
