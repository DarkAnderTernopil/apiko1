import { types as t } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductsCollection';
import { UsersCollection } from './Users/UsersCollection';

export const EntitiesStore = t
  .model('EntitiesStore', {
    products: ProductsCollection,
    users: UsersCollection,
  })
  .actions((store) => ({}));
