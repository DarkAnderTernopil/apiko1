import React from 'react';
import { observer } from 'mobx-react';
import s from './Home.module.scss';

import ProductsContainer from './components/ProductsContainer/ProductsContainer';
import Filters from './components/Filters/Filters';

const Home = () => {

  return (
    <div className={s.container}>
      <Filters />
      <ProductsContainer />
    </div>
  );
};
export default observer(Home);
