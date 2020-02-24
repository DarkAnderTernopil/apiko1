import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import s from './Header.module.scss';

import { routes } from '../../scenes/routes';
import Icon from '../Icons/Icon';
import SearchInput from '../Search/SearchInput/SearchInput';
import SearchLocationInput from '../Search/SerchLocationInput/SearchLocationInput';
import Button from '../Button/Button';
import HeaderUser from './HeaderUser/HeaderUser';
import Hamburger from './Hamburger/Hamburger';

const Header = () => {
  return (
    <header className={s.container}>
      <div className={s.row1}>
        <div>
          <Link to={routes.home}>
            <Icon name="apiko" />
          </Link>
        </div>
        <div>
          <Hamburger />
          <HeaderUser />
        </div>
      </div>
      <Switch>
        <Route
          exact
          path={[
            routes.home,
            routes.userFavorite,
            routes.product,
            routes.user,
          ]}
        >
          <div className={s.row2}>
            <SearchInput />
            <SearchLocationInput />
            <Button
              title="Search"
              style={{
                background: '#3E3961',
                width: 176,
                height: 50,
              }}
            />
          </div>
        </Route>
      </Switch>
    </header>
  );
};

export default Header;
