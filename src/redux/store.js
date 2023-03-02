import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlices';
import products from './slices/productsSlices';
import filter from '../redux/slices/filterSlice';

export const store = configureStore({
  reducer: {
    auth,
    products,
    filter,
  },
});
