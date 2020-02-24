import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { routes } from '../../scenes/routes';
import s from './MobileMenu.module.scss';
import { useStore } from '../../stores/createStore';

const MobileMenu = () => {
  const user = useStore((store) => store.viewer.user);

  return (
    <div className={s.container}>
      <Link to={routes.home}>Home</Link>
      {!user && (
        <>
          <Link to={routes.login}>Login</Link>
          <Link to={routes.register}>Registration</Link>
        </>
      )}
      {user && (
        <>
          <Link to={generatePath(routes.user, { userId: user.id })}>
            Profile
          </Link>
          <Link to={routes.userFavorite}>Saved products</Link>
          <Link to={routes.productNew}>Add product</Link>
          <Link to={routes.userEdit}> Edit user </Link>
          <Link to={routes.inbox}> Chats </Link>
        </>
      )}
    </div>
  );
};

export default observer(MobileMenu);
