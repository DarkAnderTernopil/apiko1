import { getRoot, types as t } from 'mobx-state-tree';
import * as Api from '../../api/Api';
import { asyncModel } from '../utils';
import { User } from '../schemas';

export const AuthStore = t
  .model('AuthStore', {
    login: asyncModel(login),
    register: asyncModel(register),
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
  return async (flow, store) => {
    const res = await Api.Auth.login({ password, email });
    Api.Auth.setToken(res.data.token);
    const result = flow.merge(res.data.user, User);
    getRoot(flow).viewer.setViewer(result);
    store.setIsLoggedIn(true);
  };
}
function register({ password, email, fullName }) {
  return async (flow, store) => {
    const res = await Api.Auth.register({
      password,
      email,
      fullName,
    });
    Api.Auth.setToken(res.data.token);
    const result = flow.merge(res.data.user, User);
    getRoot(flow).viewer.setViewer(result);
    store.setIsLoggedIn(true);
  };
}
