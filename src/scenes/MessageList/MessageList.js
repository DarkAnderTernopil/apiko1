import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router';
import { useStore } from '../../stores/createStore';
import s from './MessageList.module.scss';
import Message from './components/Message/Message';
import ChatHeader from './components/ChatHeader/ChatHeader';
import Loading from '../../components/Loading/Loading';
import MessageForm from './components/MessageForm/MessageForm';

const MessageList = () => {
  const { chatId } = useParams();
  const endList = useRef(null);
  const { chat, viewer } = useStore((store) => ({
    chat: store.chats.getById(+chatId),
    viewer: store.viewer.user,
  }));
  useEffect(() => {
    if (chat) {
      chat.messages.fetch.run();
    }
    // eslint-disable-next-line
  }, [chat]);
  useEffect(() => {
    if (chat && chat.messages.asList.length > 0) {
      if (endList.current) {
        endList.current.scrollIntoView();
      }
    }
  });
  function handleSend(message) {
    chat.sendMessage.run(message);
  }
  if (!chat || chat.messages.fetch.isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <ChatHeader chat={chat} />

      <div className={s.list}>
        {chat.messages.asList.map((item) => (
          <Message
            message={item.text}
            key={item.id}
            time={item.updatedAt}
            isViewer={item.ownerId === viewer.id}
          />
        ))}
        <div ref={endList} />
      </div>
      <MessageForm handleSend={handleSend} />
    </div>
  );
};

export default observer(MessageList);
