import React from 'react';
import s from './Button.module.scss';

const Button = ({
  title,
  style,
  type = 'button',
  children,
  theme = 'filled',
  ...props
}) => {
  return (
    <button
      className={`${s.button}  ${
        theme === 'filled' ? s.buttonFilled : s.buttonEmpty
      }`}
      type={type}
      {...props}
      style={style}
    >
      {title || children}
    </button>
  );
};

export default Button;
