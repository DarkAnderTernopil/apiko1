import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useUsersCollection } from '../../stores/Users/UsersCollection';
import { observer } from 'mobx-react';
import Cart from '../../components/Cart/Cart';
import s from './UserView.module.scss';
import Tab from './components/Tab/Tab';
import ProductsRow from '../../components/Product/components/ProductsRow/ProductsRow';
import Loading from '../../components/Loading/Loading';

const UserView = () => {
  const { userId } = useParams();
  const collection = useUsersCollection();
  const user = collection.get(userId);
  const [activeTab, setActive] = useState(1);
  useEffect(() => {
    if (user) {
      user.ownProducts.fetch.run();
    }
  }, [user]);
  if (collection.getUser.isLoading) {
    return <div>Loading</div>;
  } else if (!user) {
    return <div>NOt found</div>;
  }
  console.log({ user });
  return (
    <Cart>
      <div className={s.container}>
        <div className={s.topContainer}>
          {user.avatar && (
            <img className={s.avatar} src={user.avatar} alt="" />
          )}

          <div className={s.fullName}>{user.fullName}</div>
          <div className={s.location}>{user.location}</div>
        </div>

        <div className={s.tabs}>
          <Tab
            text="Positive feedback"
            number="88%"
            isActive={activeTab === 0}
            onClick={() => setActive(0)}
          />
          <Tab
            styleNumber={{ color: '#349A89' }}
            text="Sales"
            number={user.ownProducts.items.length}
            isActive={activeTab === 1}
            onClick={() => setActive(1)}
          />
          <Tab
            text="Active listings"
            number="12"
            isActive={activeTab === 2}
            onClick={() => setActive(2)}
          />
        </div>
        {user.ownProducts &&
          (user.ownProducts.fetch.isLoading ? (
            <Loading />
          ) : (
            <ProductsRow products={user.ownProducts.items} />
          ))}
      </div>
    </Cart>
  );
};

export default observer(UserView);
