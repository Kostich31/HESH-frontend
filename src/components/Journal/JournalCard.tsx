import { Card, Title, Text, Link } from '@vkontakte/vkui';
import { Icon24ChainOutline } from '@vkontakte/icons';
import styles from './JournalCard.module.css';
import React from 'react';
import { useAppDispatch } from '../../store/store';
import { DiaryResponse } from '../../interfaces/types';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import {
  addJournalId,
  addJournalInfo,
  removeJournal,
} from '../../store/journal/journalSlice';
import { PanelTypes } from '../../router/structure';
import BackendService from '../../service/BackendService';
import { DropdownJournal } from '../Dropdown/DropdownJournal';
import {setActiveDiaryId, updateCommentsList} from "../../store/chat/chatSlice";

interface JournalCardsProps {
  id: number;
  title: string;
  objectively: string;
  creatingDate: string;
  name: string;
  onJournalClick: (id: number) => void;
  onLinkClick: (id: number) => void;
}

const JournalCard = ({
  id,
  title,
  objectively,
  name,
  creatingDate,
  onJournalClick,
  onLinkClick,
}: JournalCardsProps) => {
  const { toPanel } = useRouterActions();
  const dispatch = useAppDispatch();
  const isMedic = BackendService.getRole();

  const onEditClick = async () => {
    const diary: DiaryResponse = await BackendService.getDiary(id);
    dispatch(addJournalInfo(diary.diary.diarybasicinfo));
    dispatch(addJournalId(id));
    toPanel(PanelTypes.JOURNAL_EDIT);
  };

  const onDeleteClick = async () => {
    await BackendService.deleteDiary(id);
    dispatch(removeJournal(id));
  };

  const onChatClick = () => {
    dispatch(setActiveDiaryId(id));
    toPanel(PanelTypes.DOCTOR_WITH_PATIENT_CHAT);
  };

  const onMoreClick = () => {
    toPanel(PanelTypes.JOURNAL_SINGLE_DETAILED);
  };

  const onCompleteClick = () => {};

  return (
    <Card
      className={styles.card}
      mode="outline"
      onClick={() => onJournalClick(id)}
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
          <DropdownJournal
            isMedic={isMedic}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onChatClick={onChatClick}
            onMoreClick={onMoreClick}
            onCompleteClick={onCompleteClick}
          ></DropdownJournal>
        </div>
      </div>
      <div className={styles.member}>
        {name ? (
          <Text style={{ fontSize: '20px' }}>{name}</Text>
        ) : (
          <Link
            style={{ fontSize: '20px' }}
            onClick={(e) => {
              e.stopPropagation();
              onLinkClick(id);
            }}
            target="_blank"
          >
            Приглашение для пациента{' '}
            <Icon24ChainOutline width={20} height={20} />
          </Link>
        )}
      </div>
      {objectively && (
        <Text weight="2" className={styles.description}>
          Объективно: {objectively}
        </Text>
      )}
    </Card>
  );
};

export default JournalCard;
