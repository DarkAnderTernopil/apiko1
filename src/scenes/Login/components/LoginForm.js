import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../../components/Form/Input/Input';
import Submit from '../../../components/Form/Submit/Submit';
import { routes } from '../../routes';
import s from './LoginForm.module.scss';
import InputPassword from '../../../components/Form/Input/InputPassword/InputPassword';

const LoginForm = ({ onSubmit }) => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });
  const formikProps = {
    initialValues: {
      email: 'testuser1@example.com',
      password: '12345678',
    },
    validationSchema: SignupSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <form>
        <Input
          name="email"
          placeholder="Example@gmail.com"
          label="Email"
          style={{ marginBottom: 15 }}
        />
        <InputPassword
          name="password"
          label="Password"
          style={{ marginBottom: 5 }}
        />
        <div className={s.restorePassword}>
          <Link to={routes.restorePassword}>
            Don’t remember password?
          </Link>
        </div>
        <Submit text="Continue" />
      </form>
    </Formik>
  );
};

export default LoginForm;
