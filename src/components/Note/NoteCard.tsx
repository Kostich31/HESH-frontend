import { Title, Text, Card, Alert } from '@vkontakte/vkui';
import styles from './NoteCard.module.css';
import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../router/structure';
import { useAppDispatch } from '../../store/store';
import BackendService from '../../service/BackendService';
import { addNote, setDiarisationsList } from '../../store/note/noteSlice';
import { removeNote } from '../../store/journal/journalSlice';
import { DropdownNote } from '../Dropdown/DropdownNote';
import {
  setActiveNoteId,
  setIsMedicRecord,
  setNoteList,
} from '../../store/noteChat/noteChatSlice';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';

interface NoteCardProps {
  id: number;
  title: string;
  details: string;
  creatingDate: string;
  isMedicRecord?: boolean;
  isCompletedJournal: boolean;
  onNoteClick: (id: number, type: string) => void;
  confirmBoxCallback: (
    isDeleteJournal: boolean,
    isNotePopout: boolean,
    callback: any
  ) => void;
}
const NoteCard = ({
  id,
  title,
  details,
  creatingDate,
  isMedicRecord = false,
  isCompletedJournal,
  onNoteClick,
  confirmBoxCallback,
}: NoteCardProps) => {
  const { toPanel } = useRouterActions();
  const isMedic = BackendService.getRole();
  const dispatch = useAppDispatch();

  const onAudioClick = async () => {
    const diarisationList = await BackendService.getAudioText(
      id,
      isMedic ? 'medic' : 'patient'
    );
    dispatch(setDiarisationsList(diarisationList));
    dispatch(setActiveNoteId({ id }));
    dispatch(setIsMedicRecord(isMedicRecord));
    toPanel(PanelTypes.NOTE_AUDIO_TEXT);
  };

  const onEditClick = async () => {
    const response = await BackendService.getNote(
      id,
      isMedicRecord ? 'medic' : 'patient'
    );
    dispatch(addNote(response));
    toPanel(PanelTypes.NOTE_EDIT);
  };

  const onDeleteClick = async () => {
    await BackendService.deleteNote(id, isMedicRecord ? 'medic' : 'patient');
    dispatch(removeNote({ id, type: isMedicRecord ? 'medic' : 'patient' }));
  };

  const onDoctorNoteClick = async () => {
    dispatch(setActiveNoteId({ id }));
    dispatch(setIsMedicRecord(isMedicRecord));
    const data = await BackendService.getDoctorsNote(id, isMedicRecord);
    dispatch(setNoteList(data ? data : []));
    toPanel(PanelTypes.DOCTOR_NOTE_CHAT);
  };


  return (
    <Card
      className={styles.card}
      mode="outline"
      onClick={() => onNoteClick(id, isMedicRecord ? 'medic' : 'patient')}
    >
      <div className={styles.firstRowContainer}>
        <div style={{ overflow: 'hidden', height: '24px' }}>
          <Title className={styles.title} level="2">
            {decodeHTMLEntities(title)}
          </Title>
        </div>
        <div className={styles.rightBlockContainer}>
          <Text weight="3" size={16} className={styles.date}>
            {new Date(creatingDate).toLocaleDateString()}
          </Text>
          <DropdownNote
            isJournalComplete={isCompletedJournal}
            isMedic={isMedic}
            isOwner={(isMedic && isMedicRecord) || (!isMedic && !isMedicRecord)}
            onEditClick={onEditClick}
            onDeleteClick={() => confirmBoxCallback(false, true, onDeleteClick)}
            onProtocolClick={onAudioClick}
            onDoctorNoteClick={onDoctorNoteClick}
          ></DropdownNote>
        </div>
      </div>
      <div
        style={{ display: !details ? '' : 'flex' }}
        className={styles.secondRowContainer}
      >
        {details && (
          <Text weight="2" className={styles.description}>
            Подробнее: {decodeHTMLEntities(details)}
          </Text>
        )}
      </div>
    </Card>
  );
};

export default NoteCard;
