import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';
import LoginForm from './components/LoginForm';
import { useStore } from '../../stores/createStore';

const Login = () => {
  const history = useHistory();
  const store = useStore();
  async function onSubmit({ email, password }) {
    await store.auth.login.run({ email, password });
    history.push(routes.home);
  }
  return (
    <main>
      <div>
        {store.auth.login.isLoading ? (
          <div>loading...</div>
        ) : (
          <LoginForm onSubmit={onSubmit} />
        )}
      </div>
    </main>
  );
};

export default observer(Login);
