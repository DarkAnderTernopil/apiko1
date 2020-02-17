import { types as t } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import Api from '../api';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { EntitiesStore } from './EntitiesStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    latestProducts: t.optional(LatestProductsStore, {}),

    entities: t.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    async bootstrap() {
      try {
        const token = Api.Auth.getTokenFromStorage();
        console.log(
          'store.auth.isLoggedIn root',
          store.auth.isLoggedIn,
        );
        if (!token) {
          return;
        }
        Api.Auth.setToken(token);
        const res = await Api.Account.getUser();
        store.viewer.setViewer(res.data);
        store.auth.setIsLoggedIn(true);
      } catch (err) {
        console.log(err);
      }
    },
  }));
