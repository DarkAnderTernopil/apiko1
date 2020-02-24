import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Link,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { generatePath, Route } from 'react-router';
import { useStore } from '../../stores/createStore';
import { routes } from '../routes';
import MessageList from '../MessageList/MessageList';
import ChatOne from './components/ChatOne/ChatOne';
import s from './Inpox.module.scss';

const InboxView = () => {
  const location = useLocation();

  const history = useHistory();
  const match = useRouteMatch(routes.chat);
  console.log({ location, history });
  const chats = useStore((store) => store.chats);
  useEffect(() => {
    if (chats.items.length < 1) {
      chats.fetch.run();
    }

    // eslint-disable-next-line
  }, [chats]);
  return (
    <div className={s.container}>
      <aside
        className={`${s.chats} ${match && s.containerMobileNone}`}
      >
        {chats.items.map((item) => (
          <Link
            key={item.id}
            style={{ textDecoration: 'none' }}
            to={generatePath(routes.chat, { chatId: item.id })}
          >
            <ChatOne chat={item} />
          </Link>
        ))}
      </aside>
      <main className={s.messageList}>
        <Route path={routes.chat} component={MessageList} />
      </main>
    </div>
  );
};

export default observer(InboxView);
