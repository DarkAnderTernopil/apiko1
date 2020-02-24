import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../../components/Form/Input/Input';
import Submit from '../../../../components/Form/Submit/Submit';
import InputPassword from '../../../../components/Form/Input/InputPassword/InputPassword';

const RegisterForm = ({ onSubmit }) => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    fullName: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  const formikProps = {
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit,
  };
  return (
    <div>
      <Formik {...formikProps}>
        <form>
          <Input
            name="email"
            label="Email"
            placeholder="Example@gmail.com"
            style={{ marginBottom: 14 }}
          />
          <Input
            name="fullName"
            label="Full name"
            placeholder="Tony Stark"
            style={{ marginBottom: 14 }}
          />
          <InputPassword
            name="password"
            label="Password"
            style={{ marginBottom: 14 }}
          />
          <InputPassword
            style={{ marginBottom: 14 }}
            name="confirmPassword"
            label="Password again"
          />
          <Submit text="Register" />
        </form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
