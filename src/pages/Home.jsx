import React from 'react';
import { useSelector } from 'react-redux';

import Sort from '../components/Sort';
import '../styles/home.scss';

const Home = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.filter.categories);

  const [categoriesSort, setCategoriesSort] = React.useState('all');

  const onClickCategory = (item) => {
    setCategoriesSort(item);
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="banner">
          <img src="https://klike.net/uploads/posts/2020-11/1605348286_15.jpeg" alt="" />
        </div>
        <div className="home__wrapper">
          <div className="categories">
            <div className="categories__items">
              {categories.map((item) => (
                <div
                  key={item}
                  onClick={() => onClickCategory(item)}
                  className={`categories__item ${item === categoriesSort ? 'active' : ''}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Sort />
        </div>

        <div className="products">
          {products
            .filter((obj) => {
              return categoriesSort === 'all' ? obj : obj.category === categoriesSort;
            })
            .map((obj) => (
              <div key={obj.id} className="product">
                <div className="thumbnail">
                  <img src={obj.thumbnail} alt="img" />
                </div>
                <div className="title">{obj.title}</div>
                <div className="brand">{obj.brand}</div>
                <div className="price">{obj.price}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
