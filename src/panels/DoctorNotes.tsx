import React from 'react';
import Chat from '../components/Chat/Chat';
import { useAppDispatch, useAppSelector } from '../store/store';
import BackendService from '../service/BackendService';
import { updateNotesList } from '../store/noteChat/noteChatSlice';
const DoctorNotes = () => {
  const isMedicRecord = useAppSelector((store) => store.noteChat.isMedicRecord);
  const activeNoteId = useAppSelector((store) => store.noteChat.activeNoteId);
  const dispatch = useAppDispatch();
  const sendNoteHandler = async (messageText: string) => {
    const newNote = await BackendService.createDoctorNote(
      activeNoteId,
      messageText,
      isMedicRecord
    );
    dispatch(updateNotesList([newNote.noteinlistinfo]));
  };
  return (
    <Chat
      activeId={activeNoteId}
      chatFor="doctorNotes"
      sendMessageHandler={sendNoteHandler}
    />
  );
};

export default DoctorNotes;
