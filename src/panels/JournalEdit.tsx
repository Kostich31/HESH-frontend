import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import JournalEditLayout from '../components/JournalEditLayout/JournalEditLayout';
import { DiaryBasicInfo, DiaryUpdateResponse } from '../interfaces/types';
import BackendService from '../service/BackendService';
import { addJournalInfo } from '../store/journal/journalSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const JournalEdit = () => {
  const journal = useAppSelector((state) => state.journal.journal);
  const id = useAppSelector((state) => state.journal.id);
  const dispatch = useAppDispatch();
  const { toBack } = useRouterActions();

  async function onConfirmClick(createState: DiaryBasicInfo) {
    const updatedJournal: DiaryUpdateResponse = await BackendService.editDiary(
      id as number,
      createState
    );
    dispatch(addJournalInfo(updatedJournal.diarybasicinfo));
    toBack();
  }

  const onCancelClick = () => {
    toBack();
  };

  return (
    <JournalEditLayout
      onCancelChange={onCancelClick}
      onConfirmChange={onConfirmClick}
      journalData={journal}
    ></JournalEditLayout>
  );
};

export default JournalEdit;
