import { types as t } from 'mobx-state-tree';
import { ChatModel } from './ChatModel';
import { asyncModel } from '../utils';
import Api from '../../api';
import { ChatCollectionSchema } from '../schemas';

export const ChatStore = t
  .model('ChatStore', {
    items: t.array(t.reference(ChatModel)),
    fetch: asyncModel(fetchChats),
  })
  .views((store) => ({
    getById(id) {
      return store.items.find((item) => id === item.id);
    },
  }))
  .actions((store) => ({
    runInAction(cb) {
      cb(store);
    },
    setItems(items) {
      store.items = items;
    },
    handleMessage(message) {
      if (message.type === 'ADD') {
        const chat = store.getById(message.message.chatId);
        if (typeof chat !== 'undefined') {
          chat.messages.addMessage(message.message);
        }
      }
    },
  }));
function fetchChats() {
  return async function fetchChatsFlow(flow, store) {
    const res = await Api.Chats.getList();
    const result = flow.merge(res.data, ChatCollectionSchema);
    store.setItems(result);
  };
}
