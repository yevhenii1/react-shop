import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import './App.scss';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Header from './components/Header';
import Auth from './components/Auth';

import { setProducts } from './redux/slices/productsSlice';
import { setFilters, getIdProduct } from './redux/slices/filterSlice';
import { lists } from './components/Sort';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getId = useSelector((state) => state.filter.idProduct);
  const sort = useSelector((state) => state.filter.sort);
  const categorie = useSelector((state) => state.filter.categorie);
  const serchValue = useSelector((state) => state.filter.serchValue);

  const onClickGetIdProduct = (id) => {
    dispatch(getIdProduct(id));
  };

  const fetchProduct = () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const categorieBy = categorie !== 'all' ? `category=${categorie}` : '';
    const search = serchValue ? `&search=${serchValue}` : '';

    axios
      .get(
        `https://63becc79e348cb076218d6c6.mockapi.io/items?${categorieBy}&id=${getId}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((arr) => {
        dispatch(setProducts(arr.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = lists.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchProduct();
    }

    isSearch.current = false;
  }, [sort.sortProperty, getId, categorie, serchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const quereString = qs.stringify({
        sortProperty: sort.sortProperty,
        categorie,
      });
      navigate(`?${quereString}`);
    }
    isMounted.current = true;
  }, [sort.sortProperty, categorie]);

  return (
    <div className="App">
      <Header />
      <Auth />
      <Routes>
        <Route path="/" element={<Home onClickGetIdProduct={onClickGetIdProduct} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
};

export default App;
