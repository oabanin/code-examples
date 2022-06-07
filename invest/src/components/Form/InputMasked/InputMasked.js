import React, { memo } from 'react';

import HelperText from 'src/components/Form/HelperText/HelperText';
import CustomOutlinedInput from 'src/components/Form/Input/CustomOutlinedInput';
import s from 'src/components/Form/Input/Input.module.scss';
import LabelText from 'src/components/Form/LabelText/LabelText';

import FormControl from '@mui/material/FormControl';
import deepEqual from 'deep-equal';
import InputMask from 'react-input-mask';

const InputMasked = memo(
  ({
    error,
    disabled,
    id,
    label,
    counter,
    helper,
    maxLength,
    mask,
    onChange,
    onBlur,
    startAdornment,
    name,
    placeholder,
    value,
    readOnly,
    fieldIcons,
  }) => (
    <FormControl
      style={{ width: '100%' }}
      variant="outlined"
      error={Boolean(error)}
      disabled={disabled}
    >
      {label && <LabelText withStartAdornment={Boolean(startAdornment)} label={label} />}
      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maskChar={null}
        disabled={disabled}
        readOnly={readOnly}
      >
        {(inputProps) => {
          inputProps.autoComplete = 'password';
          return (
            <CustomOutlinedInput
              {...inputProps}
              label={label}
              readOnly={readOnly}
              placeholder={placeholder}
              id={id}
              error={Boolean(error)}
              name={name}
            />
          );
        }}
      </InputMask>
      <div className={s.iconsWrapper}>{fieldIcons}</div>
      {error || helper || counter ? (
        <HelperText
          error={error}
          helper={helper}
          maxLength={maxLength}
          value={value}
          counter={counter}
        />
      ) : (
        <div className={s.helperPlaceholder} />
      )}
    </FormControl>
  ),
  (prevProps, nextProps) =>
    deepEqual(
      {
        ...prevProps,
      },
      {
        ...nextProps,
      },
    ),
);

export default InputMasked;
