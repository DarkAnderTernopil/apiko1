import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { useProductsCollection } from '../../stores/Products/ProductsCollection';
import UserInfo from './components/UserInfo/UserInfo';
import s from './ProductView.module.scss';
import Icon from '../../components/Icons/Icon';
// import { withSuspense } from '../../hocs/withSuspense';

const ProductView = () => {
  const { productId } = useParams();
  const collection = useProductsCollection();
  const product = collection.get(productId);
  useEffect(() => {
    if (!product) {
      collection.getProduct.run(productId);
    }
  });
  if (collection.getProduct.isLoading) {
    return <div>Loading</div>;
  } else if (!product) {
    return <div>NOt found</div>;
  }
  console.log({ product });
  return (
    <div className={s.container}>
      <div className={s.right}>
        <div className={s.imgContainer}>
          <img className={s.img} src={product.photos[0]} alt="" />
          <div className={s.price}>${product.price}</div>
        </div>
        <div>
          <span className={s.title}>{product.title}</span>{' '}
          <span className={s.date}>{product.date}</span>{' '}
        </div>
        <div className={s.location}>
          <Icon
            width={10.8}
            height={16.2}
            style={{ marginRight: 12 }}
            name="location"
          />{' '}
          {product.location}
        </div>
        <div className={s.description}>{product.description}</div>
      </div>

      <UserInfo product={product} />
    </div>
  );
};
export default observer(ProductView);
//   () => <div>Not found</div>,
//   () => <div>Loading ...</div>,
// );
// const ProductView = () => {
//   const { productId } = useParams();
//   const collection = useProductsCollection();
//   const product = collection.getProductById.read(productId);
//
//   return (
//     <>
//       <div>{product.title}</div>
//     </>
//   );
// };
//
// export default withSuspense(
//   observer(ProductView),
//   () => <div>Not found</div>,
//   () => <div>Loading ...</div>,
// );
