import { createCollection } from '../utils';
import { useStore } from '../createStore';
import { MessageModel } from './MessageModel';

export const MessagesCollection = createCollection(MessageModel);

export function useMessagesCollection() {
  const store = useStore();
  return store.entities.messages;
}
