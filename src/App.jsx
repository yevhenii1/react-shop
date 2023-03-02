import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Header from './components/Header';
import Auth from './components/Auth';

import { setProducts } from './redux/slices/productsSlices';

const App = () => {
  const dispatch = useDispatch();

  const sort = useSelector((state) => state.filter.sort);

  console.log('sort---', sort.sortProperty);

  React.useEffect(() => {
    axios
      .get(
        `https://63becc79e348cb076218d6c6.mockapi.io/items?sortBy=${sort.sortProperty}&order=desc`,
      )
      // .get(`https://dummyjson.com/products?select=${sort.sortProperty}`)
      // .then((res) => res.json())
      .then((arr) => {
        dispatch(setProducts(arr.data));
        // dispatch(setProducts(res.data.products));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sort.sortProperty]);

  return (
    <div className="App">
      <Header />
      <Auth />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
