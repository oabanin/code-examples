import { useRouter } from 'next/router';
import ArrowRightIcon from 'public/svg/profile/arrow-right.svg';

import s from './MobileProfileTab.module.scss';

function MobileProfileTabSelector({ text, handleClick }) {
  return (
    <button onClick={handleClick} className={s.button}>
      <div className={s.text}>{text}</div>
      <ArrowRightIcon />
    </button>
  );
}

export default MobileProfileTabSelector;
