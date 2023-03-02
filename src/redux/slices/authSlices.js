import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  loaded: false,
  showPopUp: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setLoaded(state, action) {
      state.loaded = action.payload;
    },
    setShowPopUp(state, action) {
      state.showPopUp = action.payload;
    },
  },
});

export const { setName, setEmail, setPassword, setLoaded, setShowPopUp } = authSlice.actions;

export default authSlice.reducer;
