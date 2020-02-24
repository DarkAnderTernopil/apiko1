import { types as t } from 'mobx-state-tree';
import { OwnProducts } from './Products/OwnProductsStore';
import {SavedProductsStore} from "./Products/SavedProductsStore";

export const UserModel = t
  .model('UserModel', {
    id: t.identifierNumber,
    fullName: t.string,
    location: t.maybeNull(t.string),
    avatar: t.maybeNull(t.string),
    phone: t.maybeNull(t.string),
    createdAt: t.string,
    updatedAt: t.string,
    email: t.maybeNull(t.string),
    ownProducts: t.optional(OwnProducts, {}),
    savedProducts: t.optional(SavedProductsStore, {}),
  })
  .views((store) => ({
    get initials() {
      const words = store.fullName.split(' ');
      return words.reduce((item, elem) => {
        return item + elem[0];
      }, '');
    },
  }))
  .actions((store) => ({
    set({ fullName }) {
      store.fullName = fullName;
    },
  }));
