import React from 'react';
import {MessageType} from "../../interfaces/types";
import Message from "../Message/Message";
import styles from './ChatMessageViewer.module.css';
import BackendService from "../../service/BackendService";

interface IChatMessageViewer {
  messages: MessageType[];
}

const ChatMessageViewer = ({messages}: IChatMessageViewer) => {
  const isMedic = BackendService.getRole();
  return (
    <div className={styles.chat}>
      {messages.map((message) => (
        <div style={{
          display: 'flex',
          justifyContent: message.authorIsMedic === isMedic ? 'flex-end' : 'flex-start'
        }}>
          <Message createDate={message.creatingdate?.toString()} text={message.basiccommentinfo?.text || ''}></Message>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageViewer;
