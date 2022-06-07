import Link from 'src/components/Links/Link';

import PropTypes from 'prop-types';

import s from './FooterLink.module.scss';

function FooterLink({ name, path, prefix }) {
  return <Link s={s} name={name} path={path} prefix={prefix} />;
}

export default FooterLink;

FooterLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  prefix: PropTypes.string,
};
