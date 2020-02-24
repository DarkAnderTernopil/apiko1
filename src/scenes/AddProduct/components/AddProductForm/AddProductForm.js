import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../../components/Form/Input/Input';
import Submit from '../../../../components/Form/Submit/Submit';
import Photos from '../../../../components/Form/Photos/Photos';

const AddProductForm = ({ onSubmit }) => {
  const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    location: Yup.string()
      .trim()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    description: Yup.string().trim(),
    price: Yup.number('Must be a number').min(0, 'Too Short!'),
    photos: Yup.array(Yup.string().url()),
  });
  const formikProps = {
    initialValues: {
      title: '',
      location: '',
      description: '',
      photos: [],
      price: '',
    },
    validationSchema: SignupSchema,
    onSubmit,
  };
  return (
    <Formik {...formikProps}>
      {({ values, errors }) => {
        const isButtonDisabled =
          !values.title ||
          !values.location ||
          errors.title ||
          errors.location;
        // console.log({ values });
        return (
          <form>
            <Input
              name="title"
              placeholder="For example: Iron man suit"
              label="Title"
              style={{ marginBottom: 24 }}
            />
            <Input
              name="location"
              placeholder="For example: Los Angeles, CA"
              label="Location"
              style={{ marginBottom: 24 }}
            />
            <Input
              typeInput="textarea"
              name="description"
              placeholder="For example: Iron man suit"
              label="Description"
              style={{ marginBottom: 24 }}
            />
            <Photos />
            <Input
              name="price"
              placeholder="For example: Los Angeles, CA"
              label="Price"
              style={{ marginBottom: 24 }}
            />

            <Submit
              text="Submit"
              disabled={isButtonDisabled}
              style={{ width: 377, margin: 'auto' }}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default AddProductForm;
