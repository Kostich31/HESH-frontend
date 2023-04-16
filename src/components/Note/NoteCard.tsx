import { Title, Text, Card } from '@vkontakte/vkui';
import styles from './NoteCard.module.css';
import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../router/structure';
import { useAppDispatch } from '../../store/store';
import BackendService from '../../service/BackendService';
import { addNote } from '../../store/note/noteSlice';
import { removeNote } from '../../store/journal/journalSlice';
import { DropdownNote } from '../Dropdown/DropdownNote';

interface NoteCardProps {
  id: number;
  title: string;
  details: string;
  creatingDate: string;
  isMedicRecord?: boolean;
  onNoteClick: (id: number) => void;
}
const NoteCard = ({
  id,
  title,
  details,
  creatingDate,
  isMedicRecord = false,
  onNoteClick,
}: NoteCardProps) => {
  const { toPanel } = useRouterActions();
  const isMedic = BackendService.getRole();
  const dispatch = useAppDispatch();
  const onAudioClick = () => {
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
    dispatch(removeNote(id));
  };
  return (
    <Card
      className={styles.card}
      mode="outline"
      onClick={() => onNoteClick(id)}
    >
      <div className={styles.firstRowContainer}>
        <div style={{ overflow: 'hidden', height: '24px' }}>
          <Title className={styles.title} level="2">
            {title}
          </Title>
        </div>
        <div className={styles.rightBlockContainer}>
          <Text weight="3" size={16} className={styles.date}>
            {new Date(creatingDate).toLocaleDateString()}
          </Text>
          <DropdownNote
            isMedic={isMedic}
            isOwner={(isMedic && isMedicRecord) || (!isMedic && !isMedicRecord)}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onProtocolClick={onAudioClick}
            onMemoClick={() => {}}
          ></DropdownNote>
        </div>
      </div>
      <div
        style={{ display: !details ? '' : 'flex' }}
        className={styles.secondRowContainer}
      >
        {details && (
          <Text weight="2" className={styles.description}>
            Подробнее: {details}
          </Text>
        )}
      </div>
    </Card>
  );
};

export default NoteCard;
