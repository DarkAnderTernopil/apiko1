import React from 'react';
import s from './Message.module.scss';
import moment from "moment";

const Message = ({ message, isViewer, time }) => {
  return (
    <div
      className={`${s.message} ${isViewer ? s.messageViewer : ''}`}
    >
      <div className={s.container}>
        <span className={s.text}>{message}</span>
        <div className={s.triangle} />
      </div>
      <div className={s.time}>{moment(time).calendar()}</div>
    </div>
  );
};

export default Message;
