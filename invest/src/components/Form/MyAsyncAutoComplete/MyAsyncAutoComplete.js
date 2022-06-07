import * as React from 'react';

import { getCountriesMyAutocomplete } from 'src/api/dictionaries/geo/country-my';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

export default function MyAsyncAutoComplete() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  console.log('render', value, setValue);
  // const fetch = React.useMemo(
  //   () =>
  //     throttle((request, callback) => {
  //       autocompleteService.current.getPlacePredictions(request, callback);
  //     }, 200),
  //   [],
  // );
  const fetchResults = async (page, limit, search, region_ID) => {
    const results = await getCountriesMyAutocomplete(page, limit, search, region_ID);
    console.log(results);
  };

  React.useEffect(() => {
    let active = true;

    // if (inputValue === '') {
    //   setOptions(value ? [value] : []);
    //   return undefined;
    // }

    fetchResults(1, 20, 'A', 1).then((value) => console.log(value));
    // fetch({ input: inputValue }, (results) => {
    //   if (active) {
    //     let newOptions = [];
    //
    //     if (value) {
    //       newOptions = [value];
    //     }
    //
    //     if (results) {
    //       newOptions = [...newOptions, ...results];
    //     }
    //
    //     setOptions(newOptions);
    //   }
    // });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchResults]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box component={LocationOnIcon} sx={{ color: 'text.secondary', mr: 2 }} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
