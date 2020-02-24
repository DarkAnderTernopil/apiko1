import { getRoot, getSnapshot, types as t } from 'mobx-state-tree';
import { UserModel } from '../UserModel';
import { asyncModel, safeReference } from '../utils';
import * as Api from '../../api/Api';
import { ChatSchema } from '../schemas';
import moment from 'moment';

// import { User } from '../schemas';

export const ProductModel = t
  .model('ProductModel', {
    id: t.identifierNumber,
    ownerId: t.number,
    title: t.string,
    description: t.maybeNull(t.string),
    photos: t.maybeNull(t.array(t.string)),
    location: t.string,
    price: t.number,
    saved: false,
    createdAt: t.string,
    updatedAt: t.string,
    owner: t.maybe(safeReference(t.late(() => UserModel))),
    createChat: asyncModel(createChat, false),
    saveProduct: asyncModel(saveProduct),
    // fetchOwner: asyncModel(fetchOwner),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    owner: snapshot.ownerId,
  }))
  .views((store) => ({
    get date() {
      // const dales = new Date(store.createdAt);
      // console.log({ dales });
      return moment(store.createdAt).calendar();
    },
  }))
  .actions((store) => ({
    fetchOwner() {
      const usersCollection = getRoot(store).entities.users;
      const user = usersCollection.get(store.ownerId);
      if (!user) {
        usersCollection.getUser.run(store.ownerId);
      }
      store.owner = store.ownerId;
    },
    changeSaved(save) {
      store.saved = save;
    },
  }));
function createChat(message) {
  return async function createChatFlow(flow, store) {
    let chatId;
    try {
      flow.start();
      const res = await Api.Chats.createChat(store.id, message);
      chatId = res.data.id;
      res.data.participants = [getSnapshot(store.owner)];
      flow.merge(res.data, ChatSchema);
      flow.success();
    } catch (e) {
      console.error(e);
      flow.error(e);
      throw e;
    }
    return chatId;
  };
}
function saveProduct() {
  return async function savedProductFlow(flow, store) {
    let res;
    if (!store.saved) {
      res = await Api.Products.addProductToSaved(store.id);
    } else {
      res = await Api.Products.removeProductFromSaved(store.id);
    }
    if (res.data.success) {
      store.changeSaved(!store.saved);
    }
  };
}
