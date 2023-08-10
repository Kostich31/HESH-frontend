import { useEffect, useState } from 'react';
import { DiariesResponse, Diary } from '../../../interfaces/types';
import { useAppDispatch } from '../../../store/store';
import { addJournals } from '../../../store/journal/journalSlice';
import BackendService from '../../../service/BackendService';

interface IUseJournalListState {
  list: Diary[];
}
const filterOnCompleteList = (list: Diary[], isCompleted = false) => {
  if (!list) {
    return [];
  }
  return list.filter((list) => list.iscomplete === isCompleted);
};
export const useJournalListState = (): {
  notCompletedList: Diary[];
  completedList: Diary[];
  onSearchChange: (query: string) => void;
  setList: (list:Diary[]) => void;
  isLoading: boolean;
  searchValue: string;
} => {
  const [journalsList, setJournalsList] = useState<Diary[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      (async () => {
        const data: DiariesResponse = await BackendService.getAllDiary();
        dispatch(addJournals(data.diarylist));
        setJournalsList(data.diarylist);
      })();
    } else {
      (async () => {
        const data: DiariesResponse = await BackendService.searchDiary(query);
        dispatch(addJournals(data.diarylist));
        setJournalsList(data.diarylist);
      })();
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      const data: DiariesResponse = await BackendService.getAllDiary();
      dispatch(addJournals(data.diarylist));
      setJournalsList(data.diarylist);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return {
    notCompletedList: filterOnCompleteList(journalsList),
    completedList: filterOnCompleteList(journalsList, true),
    onSearchChange: setSearchValue,
    isLoading,
    searchValue,
    setList: setJournalsList,
  };
};
