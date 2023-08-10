import React, { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import {
  addJournalId,
  removeJournal,
  setJournalComplete,
} from '../../store/journal/journalSlice';
import JournalCard from '../Journal/JournalCard';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../router/structure';
import {
  Div,
  SplitCol,
  SplitLayout,
  Text,
  Button,
  Alert,
} from '@vkontakte/vkui';
import BackendService from '../../service/BackendService';
import { Diary } from '../../interfaces/types';

interface JournalsListProps {
  onLinkClick: () => void;
  diaryList: Diary[];
  isComplete?: boolean;
  onListUpdate: (list: Diary[]) => void;
}
export default function JournalsList({
  onLinkClick,
  diaryList,
  isComplete = false,
  onListUpdate,
}: JournalsListProps) {
  const dispatch = useAppDispatch();
  const { toPanel } = useRouterActions();
  const isMedic = BackendService.getRole();
  const onJournalClick = (id: number) => {
    dispatch(addJournalId(id));
    toPanel(PanelTypes.JOURNAL_SINGLE);
  };
  const [popout, setPopout] = useState(null);
  const onDeleteClick = async (id: number) => {
    await BackendService.deleteDiary(id);
    const list = await BackendService.getAllDiary();
    onListUpdate(list.diarylist);
    dispatch(removeJournal(id));
  };
  const onCompleteClick = async (id: number) => {
    await BackendService.completeDiary(id);
    dispatch(setJournalComplete(false));
    const list = await BackendService.getAllDiary();
    onListUpdate(list.diarylist);
  };

  const openConfirmBox = (isDeleteJournal = false, journalId: number) => {
    setPopout(
      (
        <Alert
          actions={[
            {
              title: 'Отмена',
              autoClose: true,
              mode: 'cancel',
            },
            {
              title: isDeleteJournal ? 'Удалить' : 'Завершить',
              autoClose: true,
              mode: 'destructive',
              action: isDeleteJournal
                ? () => onDeleteClick(journalId)
                : () => onCompleteClick(journalId),
            },
          ]}
          actionsLayout="horizontal"
          onClose={() => setPopout(null)}
          header={`${isDeleteJournal ? 'Удаление' : 'Завершение'} дневника`}
          text={`Вы уверены, что хотите ${
            isDeleteJournal ? 'удалить' : 'завершить'
          } дневник?`}
        />
      ) as any
    );
  };
  return (
    <SplitLayout popout={popout}>
      <SplitCol width={'100%'}>
        <Div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {diaryList.length !== 0 ? (
            diaryList.map((journal) => {
              return (
                <JournalCard
                  onListUpdate={onListUpdate} 
                  isComplete={isComplete} 
                  onLinkClick={onLinkClick} 
                  key={journal.id} {...journal}
                  name={isMedic ? journal.patientname : journal.medicname} creatingDate={journal.creatingdate}
                  onJournalClick={onJournalClick} confirmBoxCallback={openConfirmBox}
                ></JournalCard>
              );
            })
          ) : (
            <Div
              style={{display: isComplete && diaryList.length === 0 
              ? 'none' 
              : 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',}}>
              <Text style={{ textAlign: 'center' }}>
                {isComplete ? 'Завершенных дневников не найдено' : 'Активных дневников пока что нет'}
              </Text>
              {isMedic && !isComplete && (
                <Button
                  style={{ marginTop: '5px' }} onClick={() => toPanel(PanelTypes.JOURNAL_CREATE)} mode="secondary" appearance="accent"
                >
                  Создать дневник
                </Button>
              )}
            </Div>
          )}
        </Div>
      </SplitCol>
    </SplitLayout>
  );
}
