import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionToken: '',
  user: {
    account_type: '',
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    profile_image: {
      small: '',
      large: '',
    },
    is_email_verified: false,
  },
  arraySocialErrors: ['google', 'facebook', 'apple', ''],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,

  reducers: {
    setUserData: (state, action) => {
      if (action?.payload?.sessionToken) state.sessionToken = action.payload.sessionToken;
      if (action?.payload?.user) state.user = action.payload.user;
    },

    setEmail: (state, action) => {
      state.user.email = action.payload.email;
    },

    setPhone: (state, action) => {
      state.user.phone = action.payload.phone;
    },

    clearUserData: () => initialState,
  },
});

const { setUserData, clearUserData } = userSlice.actions;

export { setUserData, clearUserData };

export default userSlice.reducer;
