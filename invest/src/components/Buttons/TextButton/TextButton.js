import React from 'react';

import s from './TextButton.module.scss';

function TextButton({ onClick, children, ...rest }) {
  return (
    <button onClick={onClick} className={s.button} {...rest}>
      {children}
    </button>
  );
}

export default TextButton;
