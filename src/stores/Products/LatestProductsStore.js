import { types as t } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import * as Api from '../../api/Api';
import { LatestProductCollection } from '../schemas';

export const LatestProductsStore = t
  .model('LatestProductsStore', {
    items: t.array(t.reference(ProductModel)),
    fetchLatest: asyncModel(fetchLatest),
  })
  .actions((store) => ({
    setItems(items) {
      console.log('setItems', items);
      store.items = items;
    },
  }));
function fetchLatest() {
  return async function fetchLatestFlow(flow, store) {
    const res = await Api.Products.fetchLatest();
    const result = flow.merge(res.data, LatestProductCollection);

    store.setItems(result);
  };
}
