import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countryCode: 'au',
  isLoaded: false,
  isUserSessionLoaded: true,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState: initialState,

  reducers: {
    setCountryCode: (state, action) => {
      if (action?.payload) state.countryCode = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    setIsUserSessionLoaded: (state, action) => {
      state.isUserSessionLoaded = action.payload;
    },
  },
});

const { setCountryCode, setIsLoaded, setIsUserSessionLoaded } = countrySlice.actions;

export { setCountryCode, setIsLoaded, setIsUserSessionLoaded };

export default countrySlice.reducer;
