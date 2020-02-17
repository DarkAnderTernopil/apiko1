import { getRoot, types as t } from 'mobx-state-tree';
import * as Api from '../../api/Api';
import { asyncModel } from '../utils';

export const AuthStore = t
  .model('AuthStore', {
    login: asyncModel(login),
    isLoggedIn: false,
  })
  .actions((store) => ({
    logout() {
      getRoot(store).viewer.deleteViewer();
      Api.Auth.clearToken();
      store.setIsLoggedIn(false);
    },
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },
  }));

function login({ password, email }) {
  return async (flow) => {
    const res = await Api.Auth.login({ password, email });
    Api.Auth.setToken(res.data.token);
    getRoot(flow).viewer.setViewer(res.data.user);
  };
}
