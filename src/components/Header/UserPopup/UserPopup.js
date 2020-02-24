import React, { useEffect, useRef } from 'react';
import UserLogo from '../UserLogo/UserLogo';
import { generatePath, Link } from 'react-router-dom';
import { routes } from '../../../scenes/routes';
import s from './UserPopup.module.scss';
import { useStore } from '../../../stores/createStore';

const UserPopup = ({ user = {}, onClickOutSide = () => {} }) => {
  const { initials, fullName, email, id } = user;
  const auth = useStore((store) => store.auth);
  const container = useRef(null);
  useEffect(() => {
    const clickOutside = ({ target }) => {
      console.log({ container });
      if (
        !(
          target === container.current ||
          container.current.contains(target)
        )
      ) {
        onClickOutSide();
      }
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={s.container} ref={container}>
      <div className={s.top}>
        <UserLogo text={initials} style={{ marginRight: 13 }} />
        <div>
          <div className={s.name}>{fullName}</div>
          <div className={s.email}>{email}</div>
          <div className={s.profile}>
            <Link to={generatePath(routes.user, { userId: id })}>
              Profile
            </Link>
          </div>
        </div>
      </div>
      <div className={s.link}>
        <Link to={routes.userEdit}>Edit profile</Link>
      </div>
      <div className={s.link2} onClick={auth.logout}>
        Logout
      </div>
    </div>
  );
};

export default UserPopup;
