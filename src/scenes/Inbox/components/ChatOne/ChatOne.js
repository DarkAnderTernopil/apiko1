import React from 'react';
import s from './ChatOne.module.scss';
import Icon from '../../../../components/Icons/Icon';
import moment from 'moment';
import { useParams } from 'react-router';

const ChatOne = ({ chat }) => {
  const { chatId } = useParams();

  console.log(chat);
  return (
    <div
      className={`${s.container} ${
        +chatId === +chat.id ? s.containerActive : ''
      }`}
    >
      <div className={s.firsBlock}>
        <div className={s.userName}>{chat.user.fullName}</div>
        <div className={s.lastMessage}>
          <Icon name="message" /> {chat.message.text}
        </div>
      </div>

      <div className={s.productInfo}>
        <div className={s.line} />
        {chat.product.photos && chat.product.photos.length > 0 && (
          <img
            className={s.img}
            src={chat.product.photos[0]}
            alt=""
          />
        )}
        <div>
          <div className={s.productName}>{chat.product.title}</div>
          <div className={s.productPrice}>${chat.product.price}</div>
        </div>
      </div>
      <div className={s.last}>
        <div className={s.line} />
        <div className={s.time}>
          {moment(chat.message.createdAt).format('HH:mm DD-MM-YYYY')}
        </div>
      </div>
    </div>
  );
};

export default ChatOne;
