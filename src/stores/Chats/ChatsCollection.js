import { createCollection } from '../utils';
import { useStore } from '../createStore';
import { ChatModel } from './ChatModel';

export const ChatsCollection = createCollection(ChatModel);

export function useChatsCollection() {
  const store = useStore();
  return store.entities.chats;
}
