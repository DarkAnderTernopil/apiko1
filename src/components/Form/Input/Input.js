import React from 'react';
import s from './Input.module.scss';
import { useField } from 'formik';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={s.container}>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default Input;
