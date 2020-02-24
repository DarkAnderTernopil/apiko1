import React from 'react';
import icons from './iconsConfig';

const Icon = ({ name, ...props }) => {
  const IconCom = icons[name];
  return <IconCom {...props} />;
};

export default Icon;
