import React from 'react';
import styles from './Message.module.css';

interface IMessage {
  text: string;
  createDate: string;
}

const Message = ({text, createDate}: IMessage) => {
  return (
    <div className={styles.message}>
      <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div className={styles.text}>{text}</div>
        <time className={styles.time}>{createDate}</time>
      </span>
    </div>
  );
};

export default Message;
