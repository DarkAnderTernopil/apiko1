import React from 'react';
import s from './SmallInput.module.scss';

const SmallInput = (props) => {
  return <input className={s.input} {...props} type="text" />;
};

export default SmallInput;
