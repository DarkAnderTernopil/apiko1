import React from 'react';
import { Formik } from 'formik';
import Input from '../../../components/Form/Input/Input';
import Submit from '../../../components/Form/Submit/Submit';

const LoginForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      email: 'testuser1@example.com',
      password: '12345678',
    },
    onSubmit,
  };
  return (
    <div>
      <Formik {...formikProps}>
        <form>
          <Input name="email" label="Email" />
          <Input name="password" label="Password" />
          <Submit text="Continue" />
        </form>
      </Formik>
    </div>
  );
};

export default LoginForm;
