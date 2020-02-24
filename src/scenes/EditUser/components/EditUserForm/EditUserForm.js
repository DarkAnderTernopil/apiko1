import React from 'react';
import { Formik } from 'formik';
import Input from '../../../../components/Form/Input/Input';
import Submit from '../../../../components/Form/Submit/Submit';

const EditUserForm = ({ onSubmit }) => {
  const formikProps = {
    initialValues: {
      fullName: '',
      phone: '',
    },
    onSubmit,
  };
  return (
    <Formik {...formikProps}>
      <form>
        <Input
          name="fullName"
          label="Full name"
          style={{ marginBottom: 15 }}
        />
        <Input
          name="phone"
          label="Phone number"
          style={{ marginBottom: 15 }}
        />
        <Submit text="Save" />
      </form>
    </Formik>
  );
};

export default EditUserForm;
