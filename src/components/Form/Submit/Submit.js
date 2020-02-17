import React from 'react';
import { useFormikContext } from 'formik';
import s from './Submit.module.scss';

const Submit = ({ text }) => {
  const form = useFormikContext();
  return (
    <button type="submit" onClick={form.handleSubmit} className={s.submit}>
      {text}
    </button>
  );
};

export default Submit;
