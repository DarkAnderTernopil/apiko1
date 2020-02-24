import React from 'react';
import PropTypes from 'prop-types';

import s from './Tab.module.scss';

const Tab = ({
  number,
  text,
  isActive,
  styleContainer,
  styleNumber,
  styleText,
  onClick,
}) => {
  return (
    <div
      style={styleContainer}
      className={`${s.tab} ${isActive && s.tabActive}`}
      onClick={onClick}
    >
      <div style={styleNumber} className={s.number}>
        {number}
      </div>
      <div style={styleText} className={s.tabText}>
        {text}
      </div>
      <div className={s.triangle} />
    </div>
  );
};
Tab.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  styleContainer: PropTypes.object,
  styleNumber: PropTypes.object,
  styleText: PropTypes.object,
  onClick: PropTypes.func,
};
export default Tab;
