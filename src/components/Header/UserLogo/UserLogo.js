import React from 'react';
import s from './UserLogo.module.scss';

const UserLogo = ({ text, className, ...props }) => {
  return (
    <div className={`${s.circle} ${className} `} {...props}>
      {text}
    </div>
  );
};

export default UserLogo;
