import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategories } from '../redux/slices/filterSlice';

const Categiries = () => {
  const dispatch = useDispatch();

  const { categoriesAll, categorie } = useSelector((state) => state.filter);

  const onClickCategory = (item) => {
    dispatch(setCategories(item));
  };

  return (
    <div className="categories">
      <div className="categories__items">
        {categoriesAll.map((item) => (
          <div
            key={item}
            onClick={() => onClickCategory(item)}
            className={`categories__item ${item === categorie ? 'active' : ''}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categiries;
