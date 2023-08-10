import React from 'react';
import styles from './Message.module.css';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';
import { Text, Card } from '@vkontakte/vkui';

interface IMessage {
  text: string;
  createDate?: string;
}

const Message = ({ text, createDate = '' }: IMessage) => {
  return (
    <Card
      className={styles.message}
      mode="outline"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Text className={styles.text}>{decodeHTMLEntities(text)}</Text>
      {createDate !== '' && (
        <Text
          className={styles.time}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {createDate}
        </Text>
      )}
    </Card>
  );
};

export default Message;
