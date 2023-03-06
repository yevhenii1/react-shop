import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../styles/cart.scss';
import { setShowPopUp } from '../redux/slices/authSlices';
import { addItem, minusItem, removeItems, clearItems } from '../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const loaded = useSelector((state) => state.auth.loaded);

  const onCluckClear = () => {
    if (window.confirm('Oчистити кошик?')) {
      dispatch(clearItems());
    }
  };

  const onCluckPlus = (id) => {
    dispatch(addItem({ id }));
  };

  const onCluckMinus = (id) => {
    dispatch(minusItem(id));
  };

  const onCluckRemove = (id) => {
    if (window.confirm('Ви хочете удалить товар?')) {
      dispatch(removeItems(id));
    }
  };

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__header">
          <button onClick={onCluckClear}>Oчистити кошик</button>
        </div>
        {loaded ? (
          <div className="cart__items">
            {items.length === 0 ? (
              <div>Кошик пустий</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="cart__item">
                  <div className="cart__img">
                    <img src={item.thumbnail} alt="img" />
                  </div>
                  <div className="cart__count">
                    <button onClick={() => onCluckMinus(item.id)}>-</button>
                    <div>{item.count}</div>
                    <button onClick={() => onCluckPlus(item.id)}>+</button>
                  </div>
                  <div className="cart__wrapper">
                    <div className="thumbnail__title">{item.title}</div>
                    <div className="thumbnail__price">{item.price * item.count} $</div>
                  </div>
                  <button onClick={() => onCluckRemove(item.id)}>X</button>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            <div className="cart__account">Будь ласка, зайдіть в обліковий запис</div>
            <div className="sign-in" onClick={() => dispatch(setShowPopUp(true))}>
              Sign in
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
