import { types as t } from 'mobx-state-tree';
import { UserModel } from './UserModel';
// import { safeReference } from './utils';

const ViewerModel = UserModel.named('ViewerModel');

export const ViewerStore = t
  .model('ViewerStore', {
    user: t.maybe(ViewerModel),
    userModel: t.maybe(UserModel),
  })
  .actions((store) => ({
    setViewer(user) {
      store.userModel = user;
      store.user = user.id;
    },
    deleteViewer() {
      store.user = undefined;
    },
  }));
