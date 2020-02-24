import React from 'react';
import s from './SearchPopup.module.scss';
import Icon from '../../Icons/Icon';

const SearchPopup = () => {
  return (
    <div className={s.container}>
      <div className={s.firstRow}>
        <span className={s.resent}>Recent searches</span>
        <span className={s.clear}>Clear All</span>
      </div>
      <div className={s.row}>
        <Icon
          name="search2"
          style={{ width: 15.55, height: 15.55, marginRight: 9.45 }}
        />
        <div className={s.searchText}>id dolor</div>
      </div>
    </div>
  );
};

export default SearchPopup;
