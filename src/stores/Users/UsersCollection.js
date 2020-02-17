// import { ProductModel } from './ProductModel';
import { createCollection } from '../utils';
// import * as Api from '../../api/Api';
import { useStore } from '../createStore';
import { UserModel } from '../UserModel';

export const UsersCollection = createCollection(UserModel, {
  // getProduct: asyncModel(getProduct),
  // productById: suspenseModel(productById),
});

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}
