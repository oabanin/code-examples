import s from 'src/modules/Profile/components/MobileProfileTabs/MobileProfileTab/MobileProfileTab.module.scss';

import { useRouter } from 'next/router';
import ArrowRightIcon from 'public/svg/profile/arrow-right.svg';

function MobileProfileTab({ text, handleFirstClick, index, path, prefix }) {
  if (prefix) path = prefix + path;

  const router = useRouter();
  const active = router.pathname === path;
  return (
    <button
      onClick={() => {
        if (index === 0) {
          handleFirstClick();
          return;
        }
        if (active) return;
        router.push(path, undefined, { scroll: false });
      }}
      className={s.button}
    >
      <div className={s.text}>{text}</div>
      <ArrowRightIcon />
    </button>
  );
}

export default MobileProfileTab;
