import { types as t } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductsCollection';
import { UsersCollection } from './Users/UsersCollection';
import { ChatsCollection } from './Chats/ChatsCollection';
import { MessagesCollection } from './Chats/MessagesCollection';
import { normalize } from 'normalizr';

export const EntitiesStore = t
  .model('EntitiesStore', {
    products: ProductsCollection,
    users: UsersCollection,
    chats: ChatsCollection,
    messages: MessagesCollection,
  })
  .actions((store) => ({
    merge(entities) {
      Object.keys(entities).forEach((collectionName) => {
        const collectionEntities = entities[collectionName];
        Object.keys(collectionEntities).forEach((id) => {
          const collection = store[collectionName];
          const value = collectionEntities[id];
          if (collection.has(id)) {
            collection.update(id, value);
          } else {
            collection.add(id, value);
          }
        });
      });
    },
    normalize(items, schema) {
      const { result, entities } = normalize(items, schema);
      store.merge(entities);
      return result;
    },
  }));
