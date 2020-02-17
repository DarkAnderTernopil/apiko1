import React from 'react';
import icons from "./iconsConfig";

const Icon = ({name, ...props}) => {
  return (
    <>
      {() => icons(props)[name]}
    </>
  );
};

export default Icon;
