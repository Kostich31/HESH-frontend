import { Icon28ListAddOutline } from '@vkontakte/icons';
import {
  FixedLayout,
  IconButton,
  Search,
  Spinner,
  Text,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import JournalCardDetailed from '../components/Journal/JournalCardDetailed';
import NoteCard from '../components/Note/NoteCard';
import { DiaryResponse } from '../interfaces/types';
import { PanelTypes } from '../router/structure';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  addCreatingDate,
  addJournalId,
  addJournalInfo,
  addName,
  addNotesList,
  removeJournal,
} from '../store/journal/journalSlice';
import { addNote } from '../store/note/noteSlice';
import BackendService from '../service/BackendService';
import { DropdownJournal } from '../components/Dropdown/DropdownJournal';

export default function JournalSingle() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const journalId = useAppSelector((state) => state.journal.id) as number;
  const isMedic = BackendService.getRole();
  const records = useAppSelector((state) => state.journal.recordsList);
  const recordsMedicState = records.medicrecordlist;
  const recordsPatientState = records.patientrecordlist;

  const dispatch = useAppDispatch();

  const { toPanel } = useRouterActions();

  useEffect(() => {
    const fetchData = async () => {
      const journal: DiaryResponse = await BackendService.getDiary(
        journalId as number
      );

      dispatch(addJournalInfo(journal.diary.diarybasicinfo));
      dispatch(
        addName(isMedic ? journal.patientname : journal.diary.medicname)
      );
      dispatch(addCreatingDate(journal.diary.creatingdate));
      dispatch(addNotesList(journal.records));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onEditClick = async () => {
    const diary: DiaryResponse = await BackendService.getDiary(journalId);
    dispatch(addJournalInfo(diary.diary.diarybasicinfo));
    dispatch(addJournalId(journalId));
    toPanel(PanelTypes.JOURNAL_EDIT);
  };

  const onDeleteClick = async () => {
    await BackendService.deleteDiary(journalId);
    dispatch(removeJournal(journalId));
    toPanel(PanelTypes.JOURNALS);
  };

  const onDetailedClick = () => {
    toPanel(PanelTypes.JOURNAL_SINGLE_DETAILED);
  };

  const createNoteHandler = () => {
    toPanel(PanelTypes.NOTE_CREATE_INFO);
  };

  const noteClickHandler = async (id: number) => {
    let response;
    if (recordsMedicState.find((record) => record.id === id)) {
      response = await BackendService.getNote(id, 'medic');
    } else {
      response = await BackendService.getNote(id, 'patient');
    }
    dispatch(addNote(response));
    toPanel(PanelTypes.NOTE_SINGLE);
  };

  return (
    <>
      {isLoading && <Spinner size="large" />}
      {!isLoading && (
        <>
          <div style={{ display: 'flex' }}>
            <Search style={{ background: 'transparent' }} disabled></Search>
            <DropdownJournal
              isMedic={isMedic}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onMoreClick={onDetailedClick}
              onChatClick={() => {}}
              onCompleteClick={() => {}}
            ></DropdownJournal>
          </div>
          <JournalCardDetailed></JournalCardDetailed>
          <Text
            weight="1"
            style={{
              marginBottom: '5px',
              marginTop: '10px',
              fontSize: '18px',
              textAlign: 'center',
            }}
          >
            Записи
          </Text>
          {recordsMedicState.length !== 0 ||
          recordsPatientState.length !== 0 ? (
            <>
              {recordsMedicState.map((note, index) => {
                return (
                  <NoteCard
                    isMedicRecord
                    onNoteClick={noteClickHandler}
                    key={index}
                    {...note}
                    creatingDate={note.creatingdate}
                  ></NoteCard>
                );
              })}
              {recordsPatientState.map((note, index) => {
                return (
                  <NoteCard
                    onNoteClick={noteClickHandler}
                    key={index}
                    {...note}
                    creatingDate={note.creatingdate}
                  ></NoteCard>
                );
              })}
            </>
          ) : (
            <Text style={{ textAlign: 'center' }}>Записей пока что нет</Text>
          )}
        </>
      )}
      <FixedLayout
        vertical="bottom"
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <IconButton onClick={createNoteHandler}>
          <Icon28ListAddOutline fill="#2688EB" width={48} height={48} />
        </IconButton>
      </FixedLayout>
    </>
  );
}
