import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { useProductsCollection } from '../../stores/Products/ProductsCollection';
// import { withSuspense } from '../../hocs/withSuspense';

const ProductView = () => {
  const { productId } = useParams();
  const collection = useProductsCollection();
  const product = collection.get(productId);
  useEffect(() => {
    if (!product || !product.owner) {
      collection.getProduct.run(productId);
    }
  });
  if (collection.getProduct.isLoading) {
    return <div>Loading</div>;
  } else if (!product) {
    return <div>NOt found</div>;
  }

  return (
    <>
      <div>{product.title}</div>
      {product.owner && <div>{product.owner.fullName}</div>}
    </>
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
