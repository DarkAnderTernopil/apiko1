import React from 'react';
import s from './SearchLocationInput.module.scss';
import Icon from '../../Icons/Icon';

const SearchLocationInput = ({ containerStyle }) => {
  return (
    <>
      <label className={s.container} style={containerStyle}>
        <Icon name="location" className={s.icon} />
        <input className={s.input} placeholder="Location" />
      </label>
    </>
  );
};

export default SearchLocationInput;
