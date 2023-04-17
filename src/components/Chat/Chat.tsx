import React, {useEffect} from 'react';
import styles from './Chat.module.css';
import ChatMessageViewer from "../ChatMessageViewer/ChatMessageViewer";
import {Input} from '@vkontakte/vkui';
import {MessageType} from "../../interfaces/types";
import { Icon28SendOutline } from '@vkontakte/icons';
import BackendService from "../../service/BackendService";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {selectActiveDiaryId, selectCommentList, updateCommentsList} from "../../store/chat/chatSlice";

interface IChatProps {
  chatFor: 'doctorNotes' | 'patientChatWithDoctor';
  sendMessageHandler: (text: string) => void;
}

// const message: MessageType = {
//   id: 0,
//   basiccommentinfotext: 'Привет! Я ваш лечащий врач, какой вам выписать рецепт?',
//   authorIsMedic: true,
//   isreaded: false,
//   creatingdate: new Date().toString(),
// };

const Chat = ({chatFor, sendMessageHandler}: IChatProps) => {
  const textInput = React.createRef();
  const activeDiaryId = useAppSelector(selectActiveDiaryId);
  const dispatch = useAppDispatch();

  const commentList = useAppSelector(selectCommentList) || [];

  useEffect(() => {
    async() => {
      dispatch(updateCommentsList(await BackendService.getComment(activeDiaryId)));
    }
  }, [activeDiaryId]);


  const sendMessageClick = async () => {
    BackendService.createComment({text: textInput.current.value}, activeDiaryId);
    dispatch(updateCommentsList(await BackendService.getComment(activeDiaryId)));
    textInput.current.value = '';
  }

  return (
    <div className={styles.chatScreen}>
      <ChatMessageViewer messages={commentList}></ChatMessageViewer>
      <div className={styles.sendMessageBlock}>
        <div className={styles.input}>
          <Input
            getRef={textInput}
            type="text"
            placeholder="Сообщение"
            height={28}
          />
        </div>
        <div className={styles.sendButton} onClick={sendMessageClick}>
          <Icon28SendOutline width={28} height={28} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
