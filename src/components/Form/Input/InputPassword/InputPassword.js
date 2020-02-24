import React, { useState } from 'react';
import Input from '../Input';
import Icon from '../../../Icons/Icon';

const InputPassword = ({ ...props }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  function handleEye() {
    setIsPasswordShow(!isPasswordShow);
  }
  return (
    <Input
      {...props}
      type={isPasswordShow ? 'text' : 'password'}
      onIconClick={handleEye}
      iconRight={<Icon name="eye" />}
    />
  );
};

export default InputPassword;
