import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import cn from 'classnames';

import s from './LabelText.module.scss';

function LabelText({ label, withStartAdornment, shrink }) {
  return (
    <InputLabel
      shrink={shrink}
      classes={{
        root: cn(s.root, { 
          [s.startAdornment]: withStartAdornment,
        }),
        error: s.error,
      }}
    >
      {label}
    </InputLabel>
  );
}

export default LabelText;
