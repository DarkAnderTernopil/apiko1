import React, { useState } from 'react';
import { Link, Switch, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Route, useLocation } from 'react-router';
import s from './HeaderUser.module.scss';
import { useStore } from '../../../stores/createStore';
import { routes } from '../../../scenes/routes';
import Icon from '../../Icons/Icon';
import Button from '../../Button/Button';
import UserPopup from '../UserPopup/UserPopup';
import UserAvatar from '../../UserAvatar/UserAvatar';

const HeaderUser = () => {
  const history = useHistory();
  const location = useLocation();
  const [isUserPopupShow, setUserPopupShow] = useState(false);

  const store = useStore();
  function navigateToLogin() {
    history.push(routes.login);
  }
  function navigateToFavorite() {
    history.push(routes.userFavorite);
  }
  function navigateToInbox() {
    history.push(routes.inbox);
  }
  function openModal() {
    setUserPopupShow(true);
  }
  function closeModal() {
    setUserPopupShow(false);
  }

  console.log(store.viewer.user);
  return (
    <div id="header-user" className={s.container}>
      {store.viewer.user && (
        <Icon
          name="chat"
          onClick={navigateToInbox}
          style={{ marginRight: 18, cursor: 'pointer' }}
        />
      )}
      <Link
        to={{
          pathname: routes.productNew,
          state: { background: location },
        }}
      >
        <Button title="Sell" style={{ marginRight: 38 }} />
      </Link>

      {store.viewer.user ? (
        <>
          <UserAvatar
            style={{ cursor: 'pointer' }}
            text={store.viewer.user.initials}
            onClick={openModal}
          />

          {isUserPopupShow && (
            <UserPopup
              onClickOutSide={closeModal}
              user={store.viewer.user}
              textLogo={store.viewer.user.initials}
              email={store.viewer.user.email}
              usernName={store.viewer.user.fullName}
            />
          )}
        </>
      ) : (
        <button
          className={s.transparentButton}
          type="button"
          onClick={navigateToLogin}
        >
          Login
        </button>
      )}
      <Switch>
        <Route path={routes.userFavorite}>
          <Icon
            onClick={navigateToFavorite}
            name="likeSolid"
            fill="#FFF"
            style={{ marginLeft: 38 }}
          />
        </Route>
        <Icon
          onClick={navigateToFavorite}
          name="like"
          style={{ marginLeft: 38 }}
        />
      </Switch>
    </div>
  );
};

export default observer(HeaderUser);
