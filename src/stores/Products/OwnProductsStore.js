import { getParent, types as t } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import * as Api from '../../api/Api';
import { OwnProduct, OwnProductSchema } from '../schemas';

export const OwnProducts = t
  .model('OwnProducts', {
    items: t.array(t.reference(t.late(() => ProductModel))),
    fetch: asyncModel(fetchOwnProducts),
    add: asyncModel(addOwnProducts),
  })
  .views((store) => ({
    get lastItem() {
      return store.items[store.items.length - 1];
    },
  }))
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    addItem(item) {
      store.items.push(item);
    },
  }));
function fetchOwnProducts() {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.byUserId(getParent(store).id);
    const result = flow.merge(res.data.list, OwnProductSchema);
    store.setItems(result);
    console.log(res);
  };
}
function addOwnProducts({
  title,
  description,
  photos,
  location,
  price,
}) {
  return async (flow, store) => {
    const res = await Api.Products.createNewProduct({
      title,
      description,
      photos,
      location,
      price,
    });
    const result = flow.merge(res.data, OwnProduct);
    store.addItem(result);
  };
}
