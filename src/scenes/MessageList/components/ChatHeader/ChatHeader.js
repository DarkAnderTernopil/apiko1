import React from 'react';
import s from './ChatHeader.module.scss';
import UserAvatar from '../../../../components/UserAvatar/UserAvatar';
import Icon from '../../../../components/Icons/Icon';
import { generatePath, useHistory } from 'react-router';
import { routes } from '../../../routes';
import { Link } from 'react-router-dom';

const ChatHeader = ({ chat }) => {
  const history = useHistory();
  function navigateToProduct() {
    history.push(
      generatePath(routes.product, { productId: chat.product.id }),
    );
  }
  return (
    <div className={s.header}>
      {/* <div className={s.headerRight}> */}
      <Link to={routes.inbox} className={s.back}>
        <Icon name="left" />
      </Link>

      <UserAvatar
        avatar={chat.user.avatar}
        initials={chat.user.initials}
        style={{ width: 45, height: 45, marginRight: 16 }}
      />
      <div className={s.name}>{chat.user.fullName}</div>
      <div className={s.product}>
        {chat.product.photos && chat.product.photos.length > 0 && (
          <img
            className={s.productImage}
            src={chat.product.photos[0]}
            alt=""
          />
        )}

        <div className={s.productData}>
          <div className={s.productTitle}>{chat.product.title}</div>
          <div className={s.productPrice}>{chat.product.price}</div>
        </div>
        <div className={s.productLink}>
          <Icon name="link" onClick={navigateToProduct} />
        </div>
      </div>

      {/* </div> */}
      <div className={s.points}>
        <Icon name="points" style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default ChatHeader;
