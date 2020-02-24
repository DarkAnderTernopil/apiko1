import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import { useHistory, useLocation } from 'react-router';
import { generatePath, Link } from 'react-router-dom';
import { useUsersCollection } from '../../../../stores/Users/UsersCollection';
import { routes } from '../../../routes';
import s from './UserInfo.module.scss';
import Button from '../../../../components/Button/Button';
import Icon from '../../../../components/Icons/Icon';
import UserAvatar from '../../../../components/UserAvatar/UserAvatar';
import UserChatModal from '../UserChatModal/UserChatModal';
import { useStore } from '../../../../stores/createStore';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '17px 48px',
    width: '60%',
    maxWidth: 820,
    transform: 'translate(-50%, -50%)',
    background: '#FFFFFF',
    boxShadow: '0px 2px 42px rgba(0, 0, 0, 0.111233)',
    borderRadius: 7,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.37)',
  },
};

const UserInfo = ({ product }) => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const [isVisible, setIsVisible] = useState(false);
  const [messageText, setMessageText] = useState('');
  const auth = useStore((store) => store.auth);
  const collection = useUsersCollection();
  useEffect(() => {
    if (!product.owner) {
      product.fetchOwner();
    }
  }, [product, collection.getUser.isLoading]);
  if (collection.getUser.isLoading) {
    return <div>Loading...</div>;
  } else if (!product.owner) {
    return <div>Not found</div>;
  }
  function handleChatWithSeller() {
    if (auth.isLoggedIn) {
      setIsVisible(true);
    } else {
      location.state = { from: location.pathname };
      history.push(routes.login, { from: location.pathname });
    }
  }
  function handleClose() {
    setIsVisible(false);
  }
  async function handleCreateChat() {
    try {
      const chatId = await product.createChat.run(messageText);
      setIsVisible(false);
      history.push(generatePath(routes.chat, { chatId }));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <aside className={s.container}>
      <div className={s.userInfo}>
        <div className={s.line} />
        <div className={s.dataContainer}>
          <UserAvatar
            avatar={product.owner.avatar}
            initials={product.owner.initials}
            style={{ width: 72, height: 72, marginBottom: 9 }}
          />

          <Link
            className={s.name}
            to={generatePath(routes.user, {
              userId: product.owner.id,
            })}
          >
            {product.owner.fullName}
          </Link>

          <div className={s.location}>{product.owner.location}</div>
        </div>
      </div>

      <Button
        style={{ width: '100%', height: 47, marginBottom: 11 }}
        onClick={handleChatWithSeller}
      >
        Chat with seller
      </Button>
      <Button
        style={{ width: '100%', height: 47 }}
        onClick={handleChatWithSeller}
        theme="light"
      >
        <Icon
          width={17}
          style={{ marginRight: 14 }}
          height={15}
          fill="#535353"
          name="like"
        />
        Add to favorite
      </Button>
      <Modal
        isOpen={isVisible}
        onRequestClose={handleClose}
        style={customStyles}
      >
        <UserChatModal
          product={product}
          onClose={handleClose}
          changeText={(evt) => setMessageText(evt.target.value)}
          messageText={messageText}
          handleCreateChat={handleCreateChat}
        />
      </Modal>
    </aside>
  );
};

export default observer(UserInfo);
