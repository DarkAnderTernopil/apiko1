// import { ProductModel } from './ProductModel';
import { asyncModel, createCollection } from '../utils';
// import * as Api from '../../api/Api';
import { useStore } from '../createStore';
import { UserModel } from '../UserModel';
import * as Api from '../../api/Api';
import { User } from '../schemas';

export const UsersCollection = createCollection(UserModel, {
  getUser: asyncModel(getUser),
  // productById: suspenseModel(productById),
});

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}
function getUser(id) {
  return async function getUserFlow(flow) {
    const res = await Api.Users.getUserById(id);
    flow.merge(res.data, User);
  };
}
