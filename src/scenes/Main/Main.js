import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import { OnlyForAuthRoute, routes } from '../routes';
import ProductView from '../ProductView/ProductView';
import UserView from '../UserView/UserView';
import InboxView from '../Inbox/InboxView';
import AddProduct from '../AddProduct/AddProduct';
import ModalAddProducts from '../AddProduct/components/ModalAddProducts/ModalAddProducts';
import EditUser from '../EditUser/EditUser';
import SavedProducts from '../SavedProducts/SavedProducts';

const Main = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Header />
      <Switch location={background || location}>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.product} component={ProductView} />
        <OnlyForAuthRoute
          path={routes.userEdit}
          component={EditUser}
        />
        <Route path={routes.userFavorite} component={SavedProducts} />
        <Route path={routes.user} component={UserView} />
        <OnlyForAuthRoute
          exact
          path={routes.inbox}
          component={InboxView}
        />
        <OnlyForAuthRoute path={routes.chat} component={InboxView} />
        <OnlyForAuthRoute
          path={routes.productNew}
          component={AddProduct}
        />
      </Switch>
      {background && (
        <Route
          path={routes.productNew}
          component={ModalAddProducts}
        />
      )}
    </>
  );
};
// {background && (
//   <Route
//     path={routes.productNew}
//     component={<ModalAddProducts />}
//   />
// )}
export default Main;
