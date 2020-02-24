import React from 'react';
import s from './Product.module.scss';
import Icon from '../Icons/Icon';

const Product = ({ title, price, photos, saved, addToFavorite }) => {
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img className={s.image} src={photos[0]} alt="" />
      </div>

      <div className={s.name}>{title}</div>
      <div className={s.price}>${price}</div>
      <div className={s.like} onClick={addToFavorite}>
        {saved ? <Icon name="likeSolid" /> : <Icon name="like" fill="#B7B7B7" />}
      </div>
    </div>
  );
};

export default Product;
