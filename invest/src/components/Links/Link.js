import cn from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

function Link({ disabled, s, name, path, prefix, noScrollToTop, subPaths = [] }) {
  if (prefix) path = prefix + path;

  const router = useRouter();
  if (subPaths.length && prefix) {
    subPaths = subPaths.map((item) => `${path}${item}`);
  }
  const active = router.pathname === path || subPaths.includes(router.pathname);

  return (
    <span className={s.container}>
      <a
        href={path}
        onClick={(e) => {
          e.preventDefault();
          if (active) return;
          router.push(path, undefined, { scroll: !noScrollToTop });
        }}
        className={cn(s.link, { [s.active]: active, [s.disabled]: !active && disabled })}
      >
        {name}
      </a>
    </span>
  );
}

export default Link;

Link.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  s: PropTypes.object.isRequired,
};
