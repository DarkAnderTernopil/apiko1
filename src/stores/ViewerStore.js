import { types as t } from 'mobx-state-tree';
import { UserModel } from './UserModel';
import { safeReference } from './utils';
// import { safeReference } from './utils';

// const ViewerModel = UserModel.named('ViewerModel');

export const ViewerStore = t
  .model('ViewerStore', {
    user: t.maybe(safeReference(UserModel)),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
    deleteViewer() {
      store.user = undefined;
    },
  }));
