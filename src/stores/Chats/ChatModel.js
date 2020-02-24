import { getRoot, types as t } from 'mobx-state-tree';
import { ProductModel } from '../Products/ProductModel';
import { UserModel } from '../UserModel';
import { MessageModel } from './MessageModel';
import { asyncModel } from '../utils';
import { MessageSchema } from '../schemas';
import * as Api from '../../api/Api';
import { MessageStore } from './MessageStore';

export const ChatModel = t
  .model('ChatModel', {
    id: t.identifierNumber,
    productId: t.number,
    ownerId: t.number,
    createdAt: t.string,
    updatedAt: t.string,
    message: t.reference(MessageModel),
    messages: t.optional(MessageStore, {}),
    product: t.reference(ProductModel),
    user: t.reference(UserModel),
    sendMessage: asyncModel(sendMessage),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    product: snapshot.product || snapshot.productId,
    participants: undefined,
    user: snapshot.participants
      ? snapshot.participants[0]
      : snapshot.user,
  }))
  .actions((store) => ({
    addMessage(message) {
      const result = getRoot(store).entities.normalize(
        message,
        MessageSchema,
      );
      console.log(result);
    },
  }));
function sendMessage(text) {
  return async function sendMessageFlow(flow, store) {
    const res = await Api.Chats.sendMessage(store.id, text);
    const result = flow.merge(res.data, MessageSchema);
    store.messages.addMessageId(result);
    console.log(result);
  };
}
