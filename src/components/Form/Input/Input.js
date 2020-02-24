import React from 'react';
import s from './Input.module.scss';
import { useField } from 'formik';

const Input = ({
  label,
  iconRight,
  typeInput = 'input',
  onIconClick = () => {},
  style,
  ...props
}) => {
  const [field, meta] = useField(props);
  const input = {
    input: <input {...field} {...props} />,
    textarea: <textarea {...field} {...props} />,
  };

  return (
    <>
      <label className={s.container}>
        {label}
        <div style={style} className={s.inputContainer}>
          {input[typeInput]}
          <div onClick={onIconClick} className={s.iconRight}>
            {iconRight}
          </div>
          {meta.touched && meta.error && (
            <div className={s.error}>{meta.error}</div>
          )}
        </div>
      </label>
    </>
  );
};

export default Input;
