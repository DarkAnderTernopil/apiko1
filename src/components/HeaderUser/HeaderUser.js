import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../scenes/routes';
import { useStore } from '../../stores/createStore';
import { observer } from 'mobx-react';

const HeaderUser = () => {
  const history = useHistory();
  const store = useStore();
  function navigateToLogin() {
    history.push(routes.login);
  }
  function onLogout() {
    store.auth.logout();
  }
  return (
    <>
      {store.viewer.user ? (
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <button type="button" onClick={navigateToLogin}>
          Login
        </button>
      )}
    </>
  );
};

export default observer(HeaderUser);
