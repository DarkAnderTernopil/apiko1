import { types as t } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import Api, { SocketApi } from '../api';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { EntitiesStore } from './EntitiesStore';
import { User } from './schemas';
import { ChatStore } from './Chats/ChatStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    latestProducts: t.optional(LatestProductsStore, {}),
    chats: t.optional(ChatStore, {}),
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
        SocketApi.init(token);
        const res = await Api.Account.getUser();
        const result = store.entities.normalize(res.data, User);
        store.viewer.setViewer(result);
        store.auth.setIsLoggedIn(true);
        store.subscribeToEvents();
      } catch (err) {
        console.log(err);
      }
    },
    subscribeToEvents() {
      SocketApi.handleMessages((message) => {
        store.chats.handleMessage(message);
      });
    },
  }));
