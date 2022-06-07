import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import s from 'src/components/Form/AutocompleteSync/AutocompleteSync.module.scss';
import HelperText from 'src/components/Form/HelperText/HelperText';
import CustomOutlinedInput from 'src/components/Form/Input/CustomOutlinedInput';
import LabelText from 'src/components/Form/LabelText/LabelText';
import StyledPopper from 'src/components/Form/PopperStyled/Popper';

import { useAutocomplete } from '@mui/lab';
import { FormControl, Paper } from '@mui/material';
import { StyledEngineProvider, styled } from '@mui/material/styles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import cn from 'classnames';
import deepEqual from 'deep-equal';
import { InView } from 'react-intersection-observer';

import AppAutocompleteLoadingText from './AppAutocompleteLoadingText';

const AppAsyncAutocomplete = memo(
  ({
    onSelect,
    onBlur,
    endAdornment,
    label,
    error,
    helper,
    disabled,
    fetch,
    optionsFilter = () => true,
    width,
    textRender = (option) => option.label,
    getOptionLabel = (option) => option.label,
    wrapperStyles,
    freeSolo,
    autocompleteValue,
    setAutocompleteValue,
    autocompleteInputValue,
    setAutocompleteInputValue,
    autocompleteOptions,
    setAutocompleteOptions,
    optional,
    required,
    apiParams,
    ...rest
  }) => {
    const ref = useRef();
    const [_value, _setValue] = useState(null);

    const [_inputValue, _setInputValue] = useState('');

    const [_options, _setOptions] = useState([]);

    const value = autocompleteValue ?? _value;
    const setValue = setAutocompleteValue || _setValue;

    const inputValue = autocompleteInputValue ?? _inputValue;
    const setInputValue = setAutocompleteInputValue || _setInputValue;

    const options = autocompleteOptions ?? _options;
    const setOptions = setAutocompleteOptions || _setOptions;

    const [loading, setLoading] = useState(false);

    const [isMore, setIsMore] = useState(true);

    const [page, setPage] = useState(0);

    const [pageSize] = useState(20);

    const [nextPageLoading, setNextPageLoading] = useState(false);

    const debounced = useCallback(
      async (inputValue, newPage, more) => {
        setNextPageLoading(true);

        await fetch(inputValue, {
          setOptions,
          setIsMore,
          page: newPage ?? page,
          setPage,
          pageSize,
          isMore: more || isMore,
          setLoading,
          apiParams,
        });

        setNextPageLoading(false);
        setPage((page) => page + 1);
      },
      [page, value, isMore, apiParams],
    );

    useEffect(() => {
      if (inputValue === '' || !inputValue || inputValue?.length < 1) {
        setOptions([]);
      } else {
        setLoading(true);
        setOptions([]);
        setPage(0);
        setIsMore(true);
      }

      debounced(inputValue, 0, true);
    }, [inputValue, fetch, value]);
    const [open, setOpen] = React.useState(false);
    const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
    } = useAutocomplete({
      options: options.filter(optionsFilter),
      onOpen: (e) => {
        setOpen(true);
      },
      onClose: () => {
        setOpen(false);
      },
      getOptionLabel,
      onChange: (event, newValue) => {
        if (event.code === 'Enter' && loading) {
          return;
        }

        setValue(newValue);
        if (onSelect) {
          onSelect(newValue, setValue, setInputValue);
        }
      },
      value,
      inputValue,
      onInputChange: (event, newInputValue) => {
        if (newInputValue === 'undefined') {
          setInputValue(inputValue);
        } else {
          setInputValue(newInputValue || '');
        }
      },
      freeSolo,
      filterOptions: (x) => x,
    });
    return (
      <>
        <StyledEngineProvider injectFirst>
          <div {...getRootProps()} style={wrapperStyles}>
            <FormControl style={{ width: '100%' }} error={error} disabled={disabled}>
              {label && <LabelText {...getInputLabelProps()} label={label} />}
              <CustomOutlinedInput
                inputProps={{
                  ...getInputProps(),
                  name: rest.name,
                  maxLength: rest.maxLength,
                  autoComplete: 'off',
                  disabled,
                }}
                label={label}
                disabled={disabled}
                endAdornment={endAdornment}
                onBlur={onBlur}
                ref={ref}
                {...rest}
              />
              {endAdornment && (
                <div
                  onClick={() => {
                    setOpen((state) => !state);
                    getInputProps().onMouseDown();
                  }}
                  className={cn(s.endAdornment, { [s.disabled]: disabled, [s.open]: open })}
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
          </div>
          <StyledPopper
            open={open}
            placement="bottom-start"
            anchorEl={ref.current}
            disablePortal
            ref={getListboxProps().ref}
            onMouseDown={getListboxProps().onMouseDown}
            style={{ zIndex: 1300, width: width || ref.current?.offsetWidth }}
          >
            <Paper elevation={3}>
              {loading && <AppAutocompleteLoadingText />}
              {!loading && groupedOptions?.length > 0 && (
                <Ul>
                  {groupedOptions.map((option, index) => {
                    if (option.type === 'LOADING') {
                      return (
                        <InView
                          as="div"
                          onChange={(inView) => {
                            if (nextPageLoading || loading) return;
                            if (inView) {
                              debounced(inputValue);
                            }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          Loading
                        </InView>
                      );
                    }

                    // const matches = match(textRender(option), inputValue, { insideWords: true });
                    // const parts = parse(textRender(option), matches);

                    return (
                      <Li {...getOptionProps({ option, index })}>
                        {textRender(option)}
                        {/*{parts.map((part, index) => (*/}
                        {/*  <span*/}
                        {/*    key={index}*/}
                        {/*    style={{*/}
                        {/*      fontWeight: part.highlight ? 700 : 400,*/}
                        {/*    }}*/}
                        {/*    dangerouslySetInnerHTML={{ __html: part.text }}*/}
                        {/*  />*/}
                        {/*))}*/}
                      </Li>
                    );
                  })}
                </Ul>
              )}
            </Paper>
          </StyledPopper>
        </StyledEngineProvider>
      </>
    );
  },
  (prevProps, nextProps) =>
    deepEqual(
      {
        ...prevProps,
        setAutocompleteInputValue: null,
        getOptionLabel: null,
        onBlur: null,
        textRender: null,
      },
      {
        ...nextProps,
        setAutocompleteInputValue: null,
        getOptionLabel: null,
        onBlur: null,
        textRender: null,
      },
    ),
);

const Li = styled('li')`
  min-height: 40px;
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  box-sizing: border-box;
  outline: 0;
  -webkit-tap-highlight-color: transparent;

  padding-left: 16px;
  padding-right: 16px;
  &:hover {
    background: var(--color-secondary-opacity-10) !important;
  }
`;

const Ul = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 8px 0;
  max-height: 40vh;
  overflow: auto;
`;

export default AppAsyncAutocomplete;
