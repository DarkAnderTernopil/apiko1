import {
  applySnapshot,
  getIdentifier,
  getParent,
  getRoot,
  isStateTreeNode,
  onSnapshot,
  resolveIdentifier,
  types as t,
} from 'mobx-state-tree';

export function asyncModel(thunk, auto = true) {
  const model = t
    .model('AsyncModel', {
      isError: false,
      isLoading: false,
    })
    .actions((store) => ({
      run(...args) {
        const promise = thunk(...args)(
          store,
          getParent(store),
          getRoot(store),
        );
        if (auto) {
          return store._auto(promise);
        }
        return promise;
      },
      async _auto(promise) {
        try {
          store.start();
          await promise;
          store.success();
        } catch (e) {
          store.error(e);
        }
      },
      start() {
        store.isLoading = true;
        store.isError = false;
      },
      success() {
        store.isLoading = false;
      },
      error(err) {
        console.log(err);
        store.isLoading = false;
        store.isError = true;
      },
    }));
  // return model.create({});
  return t.optional(model, {});
}

export function createPersist(store) {
  onSnapshot(store, (snapshot) => {
    console.log('snapshot', snapshot);
    window.localStorage.setItem(
      '___persist',
      JSON.stringify({
        auth: {
          isLoggedIn: snapshot.auth.isLoggedIn, // snapshot.auth.isLoggedIn,
        },
        viewer: {
          user: snapshot.viewer.user,
        },
      }),
    );
  });
  function rehydrate() {
    const snapshot = window.localStorage.getItem('___persist');
    if (snapshot) {
      applySnapshot(store, JSON.parse(snapshot));
    }
  }
  return {
    rehydrate,
  };
}
export function createCollection(ofModel, asyncModels = {}) {
  const collection = t
    .model('CollectionModel', {
      collection: t.map(ofModel),
      ...asyncModels,
    })
    .views((store) => ({
      get(key) {
        return store.collection.get(String(key));
      },
    }))
    .actions((store) => ({
      add(key, value) {
        store.collection.set(String(key), value);
      },
    }));
  return t.optional(collection, {});
}

export function safeReference(T) {
  return t.reference(T, {
    get(identifier, parent) {
      if (isStateTreeNode(identifier)) {
        identifier = getIdentifier(identifier);
      }
      return resolveIdentifier(T, parent, identifier);
    },
    set(value) {
      return value;
    },
  });
}
