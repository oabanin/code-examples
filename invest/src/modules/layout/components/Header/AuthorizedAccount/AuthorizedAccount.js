import React, { useState } from 'react';

import OverflowTooltip from 'src/components/Tooltips/OverflowToolTip/OverflowTooltip';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import s from './AuthorizedAccount.module.scss';

function AuthorizedAccount() {
  const userData = useSelector((state) => state.user.user);
  const router = useRouter();
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  const getUserName = () => {
    if (!userData?.first_name && !userData?.last_name) return userData?.email;
    let name;
    if (userData?.first_name) name = userData.first_name;
    if (userData?.last_name) name = `${name} ${userData.last_name}`;
    return name;
  };

  return (
    <div onClick={() => router.push('/settings')} className={s.container}>
      <div className={s.left}>
        <img
          className={s.img}
          src={
            userData?.profile_image?.conversions?.small || '/svg/profile/profile-placeholder.svg'
          }
          alt={getUserName()}
        />
      </div>
      <div className={s.right}>
        <OverflowTooltip
          isShowTooltip={isShowTooltip}
          setIsShowTooltip={setIsShowTooltip}
          className={s.name}
        >
          {getUserName()}
        </OverflowTooltip>
        {isShowTooltip && <div className={s.gradient} />}
      </div>
    </div>
  );
}

export default AuthorizedAccount;
