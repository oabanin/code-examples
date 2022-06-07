import * as React from 'react';

import AppAutocompleteLoadingText from 'src/components/Form/AutocompleteAsync/AppAutocompleteLoadingText';
import HelperText from 'src/components/Form/HelperText/HelperText';
import CustomOutlinedInput from 'src/components/Form/Input/CustomOutlinedInput';
import LabelText from 'src/components/Form/LabelText/LabelText';
import StyledPopper from 'src/components/Form/PopperStyled/Popper';

import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { StyledEngineProvider } from '@mui/material/styles';
import cn from 'classnames';

import s from './AutocompleteSync.module.scss';

export default function AutocompleteSync({
  options,
  onSelect,
  endAdornment,
  placeholder,
  label,
  actionRender,
  error,
  helper,
  disabled,
  loading,
  freeSolo,
  autocompleteValue,
  setAutocompleteValue,
  autocompleteInputValue,
  setAutocompleteInputValue,
  ...rest
}) {
  const [_value, _setValue] = React.useState(null);
  const [_inputValue, _setInputValue] = React.useState('');

  const value = autocompleteValue ?? _value;
  const setValue = setAutocompleteValue || _setValue;

  const inputValue = autocompleteInputValue ?? _inputValue;
  const setInputValue = setAutocompleteInputValue || _setInputValue;

  const [open, setOpen] = React.useState(false);
  return (
    <StyledEngineProvider injectFirst>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={loading}
        loadingText={<AppAutocompleteLoadingText />}
        disableClearable
        forcePopupIcon={false}
        disabled={disabled}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (onSelect) {
            onSelect(newValue, setValue, setInputValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          if (newInputValue === 'undefined') {
            setInputValue(inputValue);
          } else {
            setInputValue(newInputValue || '');
          }
        }}
        //freeSolo
        options={options || []}
        //   inputValue
        //     ? options.filter(
        //         (item) =>
        //           item.label && item.label.toLowerCase()?.indexOf(inputValue?.toLowerCase()) > -1,
        //       )
        //     : options
        // }
        renderInput={(params) => (
          <>
            <FormControl
              style={{ width: '100%' }}
              variant="outlined"
              error={Boolean(error)}
              disabled={disabled}
            >
              {label && <LabelText inputProps={params.InputLabelProps} label={label} />}
              <CustomOutlinedInput
                ref={params.InputProps.ref}
                inputProps={{ ...params.inputProps, name: rest.name, autoComplete: 'password' }}
                label={label}
                placeholder={placeholder}
                endAdornment={endAdornment}
                {...rest}
              />
              {endAdornment && (
                <div
                  onClick={() => {
                    setOpen((state) => !state);
                  }}
                  className={cn(s.endAdornment, {
                    [s.disabled]: disabled,
                    [s.open]: open,
                  })}
                >
                  {endAdornment}
                </div>
              )}
              {error || helper ? (
                <HelperText error={error} helper={helper} value={value} />
              ) : (
                <div style={{ minHeight: 23 }} />
              )}
            </FormControl>
          </>
        )}
        getOptionLabel={(option) => option.label}
        PopperComponent={StyledPopper}
        // renderOption={(props, option, { inputValue }) => {
        //   const matches = match(option.label, inputValue, { insideWords: true });
        //   const parts = parse(option.label, matches);
        //
        //   return (
        //     <li data-testid="app-autocomplete-option" {...props}>
        //       <div>
        //         {parts.map((part, index) => (
        //           <span
        //             key={index}
        //             style={{
        //               fontWeight: part.highlight ? 700 : 400,
        //             }}
        //           >
        //             {part.text}
        //           </span>
        //         ))}
        //       </div>
        //     </li>
        //   );
        // }}
      />
    </StyledEngineProvider>
  );
}
