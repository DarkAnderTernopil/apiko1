import React from 'react';
import { observer } from 'mobx-react';
import { generatePath, useHistory } from 'react-router';
import AddProductForm from './components/AddProductForm/AddProductForm';
import s from './AddProduct.module.scss';
import { useStore } from '../../stores/createStore';
import Loading from '../../components/Loading/Loading';
import { routes } from '../routes';

const AddProduct = () => {
  const history = useHistory();
  const user = useStore((store) => store.viewer.user);
  if (!user || user.ownProducts.add.isLoading) {
    return <Loading />;
  }
  if (user.ownProducts.add.isError) {
    return <div>Error</div>;
  }

  async function onSubmit(values) {
    await user.ownProducts.add.run(values);
    history.push(
      generatePath(routes.product, {
        productId: user.ownProducts.lastItem.id,
      }),
    );
  }
  return (
    <div className={s.container}>
      <div className={s.title}>Add product</div>
      <AddProductForm onSubmit={onSubmit} />
    </div>
  );
};

export default observer(AddProduct);
