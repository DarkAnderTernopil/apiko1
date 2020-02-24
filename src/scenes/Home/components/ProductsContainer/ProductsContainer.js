import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../../stores/createStore';
import ProductsRow from '../../../../components/Product/components/ProductsRow/ProductsRow';
import Loading from '../../../../components/Loading/Loading';

const ProductsContainer = () => {
  const store = useStore();

  useEffect(() => {
    if (store.latestProducts.items.length < 1) {
      store.latestProducts.fetchLatest.run();
    }

    // eslint-disable-next-line
  }, []);
  if (
    store.latestProducts.items.length < 1 &&
    store.latestProducts.fetchLatest.isLoading
  ) {
    return <Loading />;
  }
  console.log(store.latestProducts.items);
  // async function addToFavorite(evt, id, save) {
  //   evt.preventDefault();
  //   store.entities.products.saveProduct.run(id, save);
  // }
  return <ProductsRow products={store.latestProducts.items} />;
};
export default observer(ProductsContainer);
