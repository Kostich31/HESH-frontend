import { Card, Title, Text, Link, classNames } from '@vkontakte/vkui';
import { Icon24ChainOutline } from '@vkontakte/icons';
import styles from './JournalCard.module.css';
import React from 'react';
import { useAppDispatch } from '../../store/store';
import { Diary, DiaryResponse } from '../../interfaces/types';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import {
  addJournalId,
  addJournalInfo,
  setJournalComplete,
} from '../../store/journal/journalSlice';
import { PanelTypes } from '../../router/structure';
import BackendService from '../../service/BackendService';
import { DropdownJournal } from '../Dropdown/DropdownJournal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setActiveDiaryId, setMessagesList } from '../../store/chat/chatSlice';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';
interface JournalCardsProps {
  id: number;
  linktoken: string;
  title: string;
  objectively: string;
  creatingDate: string;
  name: string;
  isComplete: boolean;
  onJournalClick: (id: number) => void;
  onLinkClick: () => void;
  onListUpdate: (list: Diary[]) => void;
  confirmBoxCallback: (isDelete: boolean, journalId) => void;
}

const JournalCard = ({
  id,
  linktoken,
  title,
  objectively,
  name,
  creatingDate,
  isComplete,
  onJournalClick,
  onLinkClick,
  onListUpdate,
  confirmBoxCallback,
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
    confirmBoxCallback(true, id);
  };

  const onChatClick = async () => {
    dispatch(setActiveDiaryId({ id }));
    const data = await BackendService.getComment(id);
    dispatch(setMessagesList(data.CommentList ? data.CommentList : []));
    toPanel(PanelTypes.DOCTOR_WITH_PATIENT_CHAT);
  };

  const onMoreClick = () => {
    toPanel(PanelTypes.JOURNAL_SINGLE_DETAILED);
  };

  const onCompleteClick = async () => {
    confirmBoxCallback(false, id);
  };

  const journalCardClickHandler = () => {
    dispatch(setJournalComplete(isComplete));
    onJournalClick(id);
  };
  return (
    <Card
      className={styles.card}
      mode="outline"
      onClick={journalCardClickHandler}
    >
      <div
        className={classNames(styles.firstRowContainer, {
          [styles.completed]: isComplete,
        })}
      >
        <div id="journalCard" style={{ overflow: 'hidden', height: '24px' }}>
          <Title className={styles.title} level="2">
            {decodeHTMLEntities(title)}
          </Title>
        </div>
        <div className={styles.rightBlockContainer}>
          <Text weight="3" size={16} className={styles.date}>
            {new Date(creatingDate).toLocaleDateString()}
          </Text>
          {!isComplete && isMedic && (
            <DropdownJournal
              isMedic={isMedic}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onChatClick={onChatClick}
              onMoreClick={onMoreClick}
              onCompleteClick={onCompleteClick}
            ></DropdownJournal>
          )}
        </div>
      </div>
      <div className={styles.member}>
        {name ? (
          <Text weight="3" style={{ fontSize: '20px' }}>
            {decodeHTMLEntities(name)}
          </Text>
        ) : (
          <CopyToClipboard
            text={`https://vk.com/app51587334#link?diaryid=${id}&token=${linktoken}`}
            onCopy={() =>
              BackendService.setInviteLink(
                `https://vk.com/app51587334#link?diaryid=${id}&token=${linktoken}`
              )
            }
          >
            <Link
              onClick={(e) => {
                e.stopPropagation();
                onLinkClick();
              }}
              style={{ fontSize: '20px' }}
              target="_blank"
            >
              Приглашение для пациента{' '}
              <Icon24ChainOutline width={20} height={20} />
            </Link>
          </CopyToClipboard>
        )}
      </div>
      {objectively && (
        <Text weight="2" className={styles.description}>
          Объективно: {decodeHTMLEntities(objectively)}
        </Text>
      )}
    </Card>
  );
};

export default JournalCard;
