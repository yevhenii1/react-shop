import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
  ],
  sort: {
    name: 'популярності',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategories, setSort } = filterSlice.actions;

export default filterSlice.reducer;
