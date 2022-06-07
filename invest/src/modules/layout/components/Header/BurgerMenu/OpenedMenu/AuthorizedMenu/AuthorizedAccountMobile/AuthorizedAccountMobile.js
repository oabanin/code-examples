import React from 'react';

import s from 'src/modules/layout/components/Header/BurgerMenu/OpenedMenu/AuthorizedMenu/AuthorizedAccountMobile/AuthorizedAccountMobile.module.scss';

import OverflowTooltip from 'src/components/Tooltips/OverflowToolTip/OverflowTooltip';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function AuthorizedAccountMobile() {
  const userData = useSelector((state) => state.user.user);
  const router = useRouter();

  const getUserName = () => {
    if (!userData?.first_name && !userData?.last_name) return userData?.email;
    let name;
    if (userData?.first_name) name = userData.first_name;
    if (userData?.last_name) name = `${name} ${userData.last_name}`;
    return name;
  };
  return (
    <div onClick={() => router.push('/settings')} className={s.container}>
      <img
        width={48}
        height={48}
        className={s.img}
        src={userData?.profile_image?.conversions?.small || '/svg/profile/profile-placeholder.svg'}
        alt={getUserName()}
      />
      <OverflowTooltip className={s.username}>{getUserName()}</OverflowTooltip>
    </div>
  );
}

export default AuthorizedAccountMobile;
