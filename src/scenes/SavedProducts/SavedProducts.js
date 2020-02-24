import React, { useEffect } from 'react';
import s from './SavedProducts.module.scss';
import { observer } from 'mobx-react';
import ProductsRow from '../../components/Product/components/ProductsRow/ProductsRow';
import { useStore } from '../../stores/createStore';
import Loading from '../../components/Loading/Loading';

const SavedProducts = () => {
  const user = useStore((store) => store.viewer.user);
  console.log({ user });
  useEffect(() => {
    if (user) {
      user.savedProducts.fetch.run();
    }
  }, [user]);
  if (!user || user.savedProducts.fetch.isLoading) {
    return <Loading />;
  }
  return (
    <div className={s.container}>
      <div className={s.title}>
        Saved items
        <span className={s.count}>
          ({user.savedProducts.items.length})
        </span>
      </div>
      <ProductsRow products={user.savedProducts.items} />
    </div>
  );
};

export default observer(SavedProducts);
