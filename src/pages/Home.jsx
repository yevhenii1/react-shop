import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Sort from '../components/Sort';
import Categories from '../components/Categiries';
import Search from '../components/Search';
import '../styles/home.scss';

const Home = ({ onClickGetIdProduct }) => {
  const products = useSelector((state) => state.products.products);
  const serchValue = useSelector((state) => state.filter.serchValue);

  return (
    <div className="home">
      <div className="home__container">
        {/* <div className="banner">
          <img src="https://klike.net/uploads/posts/2020-11/1605348286_15.jpeg" alt="" />
        </div> */}
        <div className="home__wrapper">
          <Categories />
          <Sort />
        </div>

        <Search />

        <div className="products">
          {products
            .filter((obj) => {
              if (obj.title.toLowerCase().includes(serchValue.toLowerCase())) {
                return true;
              }
              return false;
            })
            .map((obj) => (
              <Link
                to="/product"
                className="products__product"
                key={obj.id}
                onClick={() => onClickGetIdProduct(obj.id)}>
                <div className="products__thumbnail">
                  <img src={obj.thumbnail} alt="img" />
                </div>
                <div className="products__title">{obj.title}</div>
                <div className="products__brand">{obj.brand}</div>
                <div className="products__price">{obj.price} $</div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
