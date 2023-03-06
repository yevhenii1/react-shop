import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/product.scss';
import { setShowPopUp } from '../redux/slices/authSlices';
import { addItem } from '../redux/slices/cartSlice';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const getId = useSelector((state) => state.filter.idProduct);
  const loaded = useSelector((state) => state.auth.loaded);

  const onClickAdd = (id, title, price, thumbnail) => {
    const item = {
      id,
      title,
      price,
      thumbnail,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="product">
      {products
        .filter((obj) => {
          return obj.id === getId;
        })
        .map((obj) => (
          <div className="product__container">
            <div className="product__thumbnail">
              <img src={obj.thumbnail} alt="img" />
            </div>
            <div className="product__wrapper">
              <div className="product__title">{obj.title}</div>
              <div className="product__brand">brand - {obj.brand}</div>
              <div className="product__price">price - {obj.price} $ </div>
              <div className="product__price">description - {obj.description}</div>
              <button
                className="product__add-cart"
                onClick={() =>
                  loaded
                    ? onClickAdd(obj.id, obj.title, obj.price, obj.thumbnail)
                    : dispatch(setShowPopUp(true))
                }>
                Add cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Product;
