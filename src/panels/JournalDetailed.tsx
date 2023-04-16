import React from 'react';
import JournalDetailedLayout from '../components/JournalDetailedLayout/JournalDetailedLayout';
import { useAppSelector } from '../store/store';

const JournalDetailed = () => {
  const journal = useAppSelector((state) => state.journal.journal);

  return <JournalDetailedLayout journalData={journal}></JournalDetailedLayout>;
};

export default JournalDetailed;
