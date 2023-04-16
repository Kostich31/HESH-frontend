import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import JournalCreateLayout from '../components/JournalCreateLayout/JournalCreateLayout';
import { DiaryBasicInfo, DiaryCreateResponse } from '../interfaces/types';
import { PanelTypes } from '../router/structure';
import BackendService from '../service/BackendService';
import { addJournalId } from '../store/journal/journalSlice';
import { useAppDispatch } from '../store/store';

const JournalCreate = () => {
  const { toPanel } = useRouterActions();
  const dispatch = useAppDispatch();

  async function handleCreateJournal(createState: DiaryBasicInfo) {
    const journal: DiaryCreateResponse = await BackendService.createDiary(
      createState
    );
    dispatch(addJournalId(journal.id));
    toPanel(PanelTypes.JOURNAL_SINGLE);
  }

  return (
    <JournalCreateLayout
      onCreateClick={handleCreateJournal}
    ></JournalCreateLayout>
  );
};

export default JournalCreate;
