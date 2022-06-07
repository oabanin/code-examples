import cn from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import s from './BurgerMenuLink.module.scss';

function BurgerMenuLink({ handlerCloseMobileMenu, name, path, icon }) {
  const router = useRouter();
  const active = router.pathname === path;
  return (
    <a
      href={path}
      onClick={(e) => {
        e.preventDefault();
        router.push(path);
        handlerCloseMobileMenu();
      }}
      className={s.link}
    >
      <div className={cn(s.innerContainer, { [s.selected]: active })}>
        <div className={s.icon}>{icon}</div>
        <div className={s.name}>{name}</div>
      </div>
    </a>
  );
}

export default BurgerMenuLink;

BurgerMenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
