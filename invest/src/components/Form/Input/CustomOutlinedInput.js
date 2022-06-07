import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import cn from 'classnames';

import s from './Input.module.scss';

const CustomOutlinedInput = React.forwardRef(
  (
    {
      readOnly,
      type,
      placeholder,
      startAdornment,
      endAdornment,
      inputMode,
      maxLength,
      handleChange,
      className,
      value,
      label,
      name,
      ...rest
    },
    ref,
  ) => (
    <OutlinedInput
      readOnly={readOnly}
      ref={ref}
      placeholder={placeholder}
      classes={{
        root: cn(
          s.root,
          {
            [s.withStartAdornment]: Boolean(startAdornment),
            [s.withEndAdornment]: Boolean(endAdornment),
            [s.readOnly]: readOnly,
          },
          className,
        ),
        error: s.error,
        notchedOutline: s.notchedOutline,
        disabled: s.disabled,
      }}
      inputProps={{
        inputMode: inputMode && inputMode,
        type: type && type,
        maxLength: maxLength && maxLength,
      }}
      fullWidth
      value={value}
      onChange={handleChange}
      label={label}
      name={name}
      {...rest}
    />
  ),
);

export default CustomOutlinedInput;
