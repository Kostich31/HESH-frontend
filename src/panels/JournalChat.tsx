import React from 'react';
import Chat from '../components/Chat/Chat';
import { useAppDispatch, useAppSelector } from '../store/store';
import BackendService from '../service/BackendService';
import { updateCommentsList } from '../store/chat/chatSlice';
export const JournalChat = () => {
  const activeDiaryId = useAppSelector((store) => store.chat.activeDiaryId);
  const dispatch = useAppDispatch();
  const sendNoteHandler = async (messageText: string) => {
    const newMessage = await BackendService.createComment(
      { text: messageText },
      activeDiaryId
    );

    dispatch(updateCommentsList(newMessage.commentinlistinfo));
  };
  return (
    <Chat
      activeId={activeDiaryId}
      chatFor="patientChatWithDoctor"
      sendMessageHandler={sendNoteHandler}
    />
  );
};
