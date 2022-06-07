import React from 'react';

import HelperText from 'src/components/Form/HelperText/HelperText';
import Input from 'src/components/Form/Input/Input';
import LabelText from 'src/components/Form/LabelText/LabelText';
import s from 'src/components/Form/SelectSync/SelectSync.module.scss';

import { MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { StyledEngineProvider } from '@mui/material/styles';
import cn from 'classnames';

function SelectSync({
  placeholder,
  value,
  label,
  handleChange,
  handleBlur,
  counter,
  maxLength,
  error,
  disabled,
  helper,
  type,
  inputMode,
  startAdornment,
  endAdornmentHandleClick,
  endAdornment,
  hideHelperText,
  ...rest
}) {
  return (
    <StyledEngineProvider injectFirst>
      <FormControl
        style={{ width: '100%', textAlign: 'left' }}
        variant="outlined"
        error={Boolean(error)}
        disabled={disabled}
      >
        <LabelText withStartAdornment={Boolean(startAdornment)} label={label} />
        <Select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          input={<Input hideHelperText />}
        >
          <MenuItem value={0}>1 user</MenuItem>
          <MenuItem value={1}>2 users</MenuItem>
          <MenuItem value={2}>3 users</MenuItem>
          <MenuItem value={3}>4 users</MenuItem>
          <MenuItem value={4}>5 users</MenuItem>
        </Select>
        {startAdornment && <div className={s.startAdornment}>{startAdornment}</div>}
        {endAdornment && (
          <div onClick={() => endAdornmentHandleClick()} className={s.endAdornment}>
            {endAdornment}
          </div>
        )}
        {!hideHelperText ? (
          error || helper || counter ? (
            <HelperText
              error={error}
              helper={helper}
              maxLength={maxLength}
              value={value}
              counter={counter}
            />
          ) : (
            <div className={s.helperPlaceholder} />
          )
        ) : (
          <div />
        )}
      </FormControl>
    </StyledEngineProvider>
  );
}

export default SelectSync;
