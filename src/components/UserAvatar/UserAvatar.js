import React from 'react';
import s from './UserAvatar.module.scss';
import UserLogo from '../Header/UserLogo/UserLogo';

const UserAvatar = ({
  avatar,
  initials,
  className,
  style,
  ...props
}) => {
  return (
    <>
      {avatar ? (
        <img
          className={`${s.avatar} ${className}`}
          style={style}
          src={avatar}
          alt=""
          {...props}
        />
      ) : (
        <UserLogo
          style={style}
          className={` ${className}`}
          text={initials}
          {...props}
        />
      )}
    </>
  );
};

export default UserAvatar;
