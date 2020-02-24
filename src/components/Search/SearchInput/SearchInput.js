import React, { useState } from 'react';
import s from './SearchInput.module.scss';
import Icon from '../../Icons/Icon';
import SearchPopup from '../SearchPopup/SearchPopup';

const SearchInput = ({ containerStyle }) => {
  const [isPopup] = useState(false);
  return (
    <div className={s.container} style={containerStyle}>
      <label>
        <Icon name="searchSolid" className={s.icon} />
        <input
          className={s.input}
          placeholder="Search products by name"
        />
      </label>
      {isPopup && <SearchPopup />}
    </div>
  );
};

export default SearchInput;
