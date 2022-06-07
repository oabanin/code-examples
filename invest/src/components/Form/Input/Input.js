import React, { memo } from 'react';

import HelperText from 'src/components/Form/HelperText/HelperText';
import CustomOutlinedInput from 'src/components/Form/Input/CustomOutlinedInput';
import s from 'src/components/Form/Input/Input.module.scss';
import LabelText from 'src/components/Form/LabelText/LabelText';

import FormControl from '@mui/material/FormControl';
import { StyledEngineProvider } from '@mui/material/styles';
import deepEqual from 'deep-equal';

const InputComponent = React.forwardRef(
  (
    {
      className,
      readOnly,
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
      shrinkLabel,
      hideHelperText,
      ...rest
    },
    ref,
  ) => (
    <StyledEngineProvider injectFirst>
      <FormControl
        style={{ width: '100%' }}
        variant="outlined"
        error={Boolean(error)}
        disabled={disabled}
      >
        <LabelText
          shrink={shrinkLabel}
          withStartAdornment={Boolean(startAdornment)}
          label={label}
        />
        <CustomOutlinedInput
          ref={ref}
          type={type}
          placeholder={placeholder}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          inputMode={inputMode}
          maxLength={maxLength}
          handleChange={handleChange}
          value={value}
          label={label}
          className={className}
          readOnly={readOnly}
          {...rest}
        />
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
  ),
);

// const FowardRefComponent = React.forwardRef(InputComponent, {});
//
// const FancyButton = React.forwardRef((props, ref) => (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// ));

const Input = memo(InputComponent, (prevProps, nextProps) =>
  deepEqual(
    {
      ...prevProps,
      onBlur: null,
      // onChange: null,
      // onFocus: null,
    },
    {
      ...nextProps,
      onBlur: null,
      // onChange: null,
      // onFocus: null,
    },
  ),
);

export default Input;
