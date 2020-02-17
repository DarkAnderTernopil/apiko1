import React from 'react';
import { Formik } from 'formik';
import Input from '../../../../components/Form/Input/Input';
import Submit from '../../../../components/Form/Submit/Submit';

const RegisterForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordAgain: '',
    },
    onSubmit,
  };
  return (
    <div>
      <Formik {...formikProps}>
        <form>
          <Input name="email" label="Email" />
          <Input name="fullName" label="Full name" />
          <Input name="password" label="Password" />
          <Input name="passwordAgain" label="Password again" />
          <Submit text="Register" />
        </form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
