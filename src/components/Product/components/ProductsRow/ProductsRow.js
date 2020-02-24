import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { routes } from '../../../../scenes/routes';
import Product from '../../Product';
import s from './ProductsRow.module.scss';

const ProductsRow = ({ products }) => {
  return (
    <div className={s.container}>
      {products.map((elem) => (
        <Link
          key={elem.id}
          to={generatePath(routes.product, {
            productId: elem.id,
          })}
        >
          <Product
            {...elem}
            addToFavorite={(evt) => {
              evt.preventDefault();
              elem.saveProduct.run();
            }}
          />
        </Link>
      ))}
    </div>
  );
};
export default observer(ProductsRow);
