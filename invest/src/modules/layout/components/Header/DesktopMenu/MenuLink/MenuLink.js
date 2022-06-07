import cn from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import s from './MenuLink.module.scss';

function MenuLink({ name, path }) {
  const router = useRouter();
  const active = router.pathname === path;
  return (
    <a
      href={path}
      onClick={(e) => {
        e.preventDefault();
        router.push(path);
      }}
      className={cn(s.link, { [s.selected]: active })}
    >
      {name}
    </a>
  );
}

export default MenuLink;

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
