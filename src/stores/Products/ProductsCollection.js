import { ProductModel } from './ProductModel';
import { asyncModel, createCollection } from '../utils';
import * as Api from '../../api/Api';
import { useStore } from '../createStore';
import { Product } from '../schemas';
// import { values } from 'mobx';

export const ProductsCollection = createCollection(ProductModel, {
  getProduct: asyncModel(getProduct),

  // productById: suspenseModel(productById),
});
function getProduct(id) {
  return async function getProductFlow(flow) {
    const res = await Api.Products.getById(id);
    flow.merge(res.data, Product);
  };
}

// function productById(id) {
//   return (flow, store) => {
//     if (store.get(id)) {
//       return store.get(id);
//     }
//     return async () => {
//       const res = await Api.Products.getById(id);
//       store.add(res.data.id, res.data);
//     };
//   };
// }
export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}
