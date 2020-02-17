import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import s from './Home.module.scss';

import { useStore } from '../../stores/createStore';
import { generatePath, Link } from 'react-router-dom';
import { routes } from '../routes';

const Home = () => {
  const store = useStore();

  useEffect(() => {
    store.latestProducts.fetchLatest.run();
    // eslint-disable-next-line
  }, []);
  if ((store.latestProducts.items.length < 1) && store.latestProducts.fetchLatest.isLoading) {
    return <div>Loading...</div>;
  }
  console.log(store.latestProducts.items);
  return (
    <div className={s.container}>
      <ul>
        {store.latestProducts.items.map((elem) => (
          <li key={elem.id}>
            <Link
              to={generatePath(routes.product, {
                productId: elem.id,
              })}
            >
              {elem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default observer(Home);
