import React from 'react';

import Link from 'src/components/Links/Link';

import s from './PrimaryLink.module.scss';

function PrimaryLink({ path, name }) {
  return <Link s={s} path={path} name={name} />;
}

export default PrimaryLink;
