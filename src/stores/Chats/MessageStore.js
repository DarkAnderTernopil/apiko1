import { getParent, getRoot, types as t } from 'mobx-state-tree';
import { MessageModel } from './MessageModel';
import { MessageCollectionSchema, MessageSchema } from '../schemas';
import { asyncModel } from '../utils';
import * as Api from '../../api/Api';

export const MessageStore = t
  .model('MessageStore', {
    items: t.array(t.reference(MessageModel)),
    fetch: asyncModel(fetchMessages),
  })
  .views((store) => ({
    get asList() {
      return store.items.slice().reverse();
    },
    get chatId() {
      return getParent(store).id;
    },
  }))
  .actions((store) => ({
    addMessage(message) {
      const result = getRoot(store).entities.normalize(
        message,
        MessageSchema,
      );
      store.items.unshift(result);
    },
    addMessageId(id) {
      store.items.unshift(id);
    },
    setItems(items) {
      store.items = items;
    },
  }));
function fetchMessages() {
  return async function fetchMessagesFlow(flow, store) {
    const res = await Api.Chats.getChatMessages(store.chatId);
    const result = flow.merge(res.data, MessageCollectionSchema);
    store.setItems(result);
  };
}
