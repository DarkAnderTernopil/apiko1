import React from 'react';
import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import { Route, Switch } from 'react-router';
import { routes } from '../routes';
import ProductView from "../ProductView/ProductView";

const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.product} component={ProductView} />
      </Switch>
    </>
  );
};

export default Main;
