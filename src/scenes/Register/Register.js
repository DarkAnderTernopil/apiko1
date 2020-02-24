import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '../routes';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Cart from '../../components/Cart/Cart';
import s from './Register.module.scss';
import { useStore } from '../../stores/createStore';

const Register = () => {
  const history = useHistory();
  const store = useStore();
  async function onSubmit({ email, password, fullName }) {
    await store.auth.register.run({ email, password, fullName });
    if (!store.auth.register.isError) {
      history.push(routes.home);
    }
  }
  return (
    <main>
      {store.auth.register.isError && <Cart>Error</Cart>}

      <Cart title="Register" style={{ marginTop: 59 }}>
        <RegisterForm onSubmit={onSubmit} />
      </Cart>
      <Cart style={{ marginTop: 21 }}>
        <div className={s.haveAccount}>
          I already have an account,
          <Link to={routes.login}>Log in</Link>
        </div>
      </Cart>
    </main>
  );
};

export default Register;
