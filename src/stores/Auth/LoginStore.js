import { flow, types as t } from 'mobx-state-tree';
import * as Api from '../../api/Api';

export const LoginStore = t
  .model('LoginStore', {
    loginFlow: asyncModel(loginFlow),
  })
  .actions((store) => ({
    run: flow(function* run({ password, email }) {
      try {
        store.isLoading = true;
        store.isError = false;
        const res = yield Api.Auth.login({ password, email });
        console.log(res.data);
        store.isLoading = false;
      } catch (e) {
        store.isError = true;
      }
    }),
  }));
