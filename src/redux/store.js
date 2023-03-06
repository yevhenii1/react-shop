import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlices';
import products from './slices/productsSlice';
import filter from '../redux/slices/filterSlice';
import cart from '../redux/slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth,
    products,
    filter,
    cart,
  },
});
