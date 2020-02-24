import React, { useState } from 'react';
import s from './MessageForm.module.scss';

const MessageForm = ({ handleSend }) => {
  const [message, setMessage] = useState('');
  function handleChange(evt) {
    setMessage(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSend(message);
  }
  return (
    <form className={s.containerMessage} onSubmit={handleSubmit}>
      <input
        className={s.textarea}
        placeholder="Type your message here.."
        onChange={handleChange}
        value={message}
      />
    </form>
  );
};

export default MessageForm;
