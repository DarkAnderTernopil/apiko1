import React from 'react';
import s from './Cart.module.scss';

const Cart = ({ children, title, ...props }) => {
  return (
    <div className={s.container} {...props}>
      {title && <div className={s.title}> {title} </div>}
      {children}
    </div>
  );
};

export default Cart;
