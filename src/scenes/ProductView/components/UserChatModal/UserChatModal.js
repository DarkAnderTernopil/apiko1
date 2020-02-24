import React from 'react';
import UserAvatar from '../../../../components/UserAvatar/UserAvatar';
import s from './UserChatModal.module.scss';
import Button from '../../../../components/Button/Button';
import Icon from '../../../../components/Icons/Icon';

const UserChatModal = ({
  product,
  handleCreateChat,
  messageText,
  changeText,
  onClose,
}) => {
  return (
    <div>
      <div className={s.exit} onClick={onClose}>
        <Icon widht="24" height="24" name="exit" />
      </div>
      <div className={s.title}>Contact seller</div>
      <div className={s.product}> Subject: {product.title}</div>

      <div className={s.userBlock}>
        <UserAvatar
          avatar={product.owner.avatar}
          initials={product.owner.initials}
          style={{ marginRight: 16, width: 72, height: 72 }}
        />
        <div>
          <div className={s.userName}>{product.owner.fullName}</div>
          <div className={s.location}>{product.owner.location}</div>
        </div>
      </div>
      <div className={s.messageTitle}>Message</div>
      <textarea
        className={s.textArea}
        name="message"
        value={messageText}
        onChange={changeText}
        cols="30"
        rows="10"
      />
      <Button
        style={{
          width: 377,
          height: 58,
          margin: 'auto',
          fontSize: 16,
          letterSpacing: 0.4,
        }}
        type="button"
        onClick={handleCreateChat}
      >
        Submit
      </Button>
    </div>
  );
};

export default UserChatModal;
