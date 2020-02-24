import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import LoginForm from './components/LoginForm';
import { useStore } from '../../stores/createStore';
import Cart from '../../components/Cart/Cart';
import s from './Login.module.scss';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  console.log({ location });
  const store = useStore();
  async function onSubmit({ email, password }) {
    await store.auth.login.run({ email, password });
    if (!store.auth.login.isError) {
      const { from } = location.state || { from: routes.home };
      history.push(from);
    }
  }

  return (
    <main>
      {store.auth.login.isError && <Cart>Error</Cart>}
      <Cart title="Login" style={{ marginTop: 59, width: 425 }}>
        {store.auth.login.isLoading ? (
          <div>loading...</div>
        ) : (
          <LoginForm onSubmit={onSubmit} />
        )}
      </Cart>
      <Cart style={{ marginTop: 21, width: 425 }}>
        <div className={s.haveAccount}>
          I have no account,
          <Link to={routes.register}>Register now</Link>
        </div>
      </Cart>
    </main>
  );
};

export default observer(Login);
