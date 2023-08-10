import React, { KeyboardEventHandler, useState } from 'react';
import styles from './Chat.module.css';
import {
  Div,
  FixedLayout,
  WriteBar,
  WriteBarIcon,
  Text,
} from '@vkontakte/vkui';
import { useAppSelector } from '../../store/store';
import ChatMessageViewer from '../ChatMessageViewer/ChatMessageViewer';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';

interface IChatProps {
  chatFor: 'doctorNotes' | 'patientChatWithDoctor';
  sendMessageHandler: (text: string) => void;
  activeId: number;
}

const Chat = ({ sendMessageHandler, chatFor }: IChatProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const isCompleted = useAppSelector(
    (state) => state.journal.activeJournalComplete
  );
  const messagesList =
    useAppSelector((store) =>
      chatFor === 'doctorNotes'
        ? store.noteChat.noteList
        : store.chat.commentList
    ) || [];
  const sendMessageClick = async () => {
    if (inputValue.trim() !== '') {
      sendMessageHandler(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyUp = (event: KeyboardEventHandler<HTMLAreaElement>) => {
    if (event.key === 'Enter') {
      if (!event.ctrlKey) {
        event.preventDefault();
        sendMessageClick();
      } else {
        setInputValue((value) => (value += '\n'));
      }
    }
  };

  return (
    <>
      <div className={styles.chatScreen}>
        <ChatMessageViewer messages={messagesList}></ChatMessageViewer>
      </div>
      <div style={{ paddingTop: '10px' }}>
        {isCompleted ? (
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            Дневник завершен. Нельзя добавить новые заметки
          </Text>
        ) : (
          <FixedLayout vertical="bottom">
            <WriteBar
              style={{  borderBottomWidth: '20px',}} value={decodeHTMLEntities(inputValue)} onChange={(event) => {
                if (event.nativeEvent.data) setInputValue(event.target.value); }} maxLength={1000} onKeyUp={handleKeyUp}
              after={
                <WriteBarIcon
                  mode="send"
                  disabled={inputValue.trim() === ''}
                  onClick={sendMessageClick}
                />
              }
              placeholder={chatFor === 'doctorNotes' ? 'Памятка' : 'Сообщение'}
              shadow
            />
          </FixedLayout>
        )}
      </div>
    </>
  );
};

export default Chat;
