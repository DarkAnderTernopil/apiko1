import React from 'react';
import Cart from '../../components/Cart/Cart';
import EditUserForm from './components/EditUserForm/EditUserForm';
import UserImage from './components/UserImage/UserImage';
import { useStore } from '../../stores/createStore';
import { observer } from 'mobx-react';

const EditUser = () => {
  const user = useStore((store) => store.viewer.user);
  function onSubmit(evt) {
    console.log(evt);
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ paddingTop: 34 }}>
      <Cart
        title="Edit profile"
        style={{ width: 498, padding: '36px 58px 30px 63px' }}
      >
        <UserImage initial={user.initials} userImage={user.avatar} />
        <EditUserForm onSubmit={onSubmit} />
      </Cart>
    </div>
  );
};

export default observer(EditUser);
