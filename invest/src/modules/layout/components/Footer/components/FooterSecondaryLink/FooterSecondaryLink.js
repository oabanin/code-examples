import React from 'react';

import Link from 'src/components/Links/Link';

import PropTypes from 'prop-types';

import s from './FooterSecondaryLink.module.scss';

function FooterSecondaryLink({ name, path, prefix }) {
  return <Link s={s} name={name} path={path} prefix={prefix} />;
}

export default FooterSecondaryLink;

FooterSecondaryLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  prefix: PropTypes.string,
};
