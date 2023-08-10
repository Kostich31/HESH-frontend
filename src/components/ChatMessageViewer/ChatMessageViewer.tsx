import React, { useLayoutEffect, useRef } from 'react';
import Message from '../Message/Message';
import styles from './ChatMessageViewer.module.css';
import BackendService from '../../service/BackendService';
import { Scrollbar } from 'react-scrollbars-custom';
import { classNames } from '@vkontakte/vkui';

interface IChatMessageViewer {
  messages: any[];
}

const ChatMessageViewer = ({ messages }: IChatMessageViewer) => {
  const scrollRef = useRef<Scrollbar>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const isMedic = BackendService.getRole();
  useLayoutEffect(() => {
    if (scrollRef.current) {
      anchorRef.current?.scrollIntoView();
    }
  }, [messages]);
  return (
    <div>
      <Scrollbar
        // trackYProps={{ style: { visibility: 'hidden' } }}
        className={classNames(styles.chat, styles.scrollbar)}
        ref={scrollRef as any}
      >
        {messages.length !== 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent:
                  message.authorismedic === undefined ||
                  message.authorismedic === isMedic
                    ? 'flex-end'
                    : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <Message
                // createDate={message.creatingdate?.toString()}
                text={
                  message.basicnoteinfo?.text ||
                  message.basiccommentinfo?.text ||
                  ''
                }
              ></Message>
            </div>
          ))}
        <div ref={anchorRef}></div>
      </Scrollbar>
    </div>
  );
};

export default ChatMessageViewer;
