import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../routes';
import RegisterForm from './components/RegisterForm/RegisterForm';

const Register = () => {
  const history = useHistory();
  function onSubmit() {
    history.push(routes.home);
  }
  return (
    <main>
      <div>
        <RegisterForm onSubmit={onSubmit} />
      </div>
    </main>
  );
};

export default Register;
