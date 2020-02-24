import React, { useState } from 'react';
import s from './RestorePassword.module.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cart from '../../components/Cart/Cart';
import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit';

const RestorePassword = () => {
  const [isShowMessage, setShowMessage] = useState(false);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });
  const formikProps = {
    initialValues: {
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      setShowMessage(true);
      console.log('test');
    },
  };
  return (
    <div className={s.container}>
      {isShowMessage && (
        <Cart title="A message with instructions has been sent to your email!" />
      )}
      <Cart title="Restore Password">
        <Formik {...formikProps}>
          <form>
            <Input
              name="email"
              placeholder="Example@gmail.com"
              label="Email"
              style={{ marginBottom: 15 }}
            />
            <Submit text="Continue" />
          </form>
        </Formik>
      </Cart>
    </div>
  );
};

export default RestorePassword;
