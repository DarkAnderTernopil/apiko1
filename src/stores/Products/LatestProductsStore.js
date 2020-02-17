import { types as t } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import * as Api from '../../api/Api';
import { normalize } from 'normalizr';

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
  return async function fetchLatestFlow(flow, store, Root) {
    const res = await Api.Products.fetchLatest();
    const { result, entities } = normalize();
    const ids = res.data.map((item) => {
      Root.entities.products.add(item.id, item);
      return item.id;
    });
    store.setItems(ids);
  };
}
