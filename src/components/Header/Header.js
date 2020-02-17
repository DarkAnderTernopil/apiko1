import React from 'react';

import s from './Header.module.scss';
import HeaderUser from '../HeaderUser/HeaderUser';
import { Link } from 'react-router-dom';
import {routes} from "../../scenes/routes";

const Header = () => {
  return (
    <header className={s.container}>
      <div>
        <Link to={routes.home}>Marketplace</Link>
      </div>
      <div>
        <HeaderUser />
      </div>
    </header>
  );
};

export default Header;
