import { types as t } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import * as Api from '../../api/Api';
import { SavedProductSchema } from '../schemas';

export const SavedProductsStore = t
  .model('SavedProductsStore', {
    items: t.array(t.reference(t.late(() => ProductModel))),
    fetch: asyncModel(fetchSavedProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));
function fetchSavedProducts() {
  return async function fetchSavedProductsFlow(flow, store) {
    const res = await Api.Products.getSavedProducts();
    const result = flow.merge(res.data, SavedProductSchema);
    store.setItems(result);
  };
}
