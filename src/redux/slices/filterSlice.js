import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesAll: [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
  ],
  categorie: 'all',
  sort: {
    name: 'популярності',
    sortProperty: 'rating',
  },
  idProduct: '',
  serchValue: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categorie = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSerchValue(state, action) {
      state.serchValue = action.payload;
    },
    getIdProduct(state, action) {
      state.idProduct = action.payload;
    },
    setFilters(state, action) {
      state.categorie = action.payload.categorie;
      state.sort = action.payload.sort;
      state.idProduct = action.payload.idProduct;
    },
  },
});

export const { setCategories, setSort, setSerchValue, setFilters, getIdProduct } =
  filterSlice.actions;

export default filterSlice.reducer;
