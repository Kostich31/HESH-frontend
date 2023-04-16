import { Icon16Done, Icon28AddCircleOutline } from '@vkontakte/icons';
import { IconButton, Spinner, Avatar, Snackbar, Search } from '@vkontakte/vkui';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import JournalsList from '../components/JournalsList/JournalsList';
import { DiariesResponse } from '../interfaces/types';
import { PanelTypes } from '../router/structure';
import BackendService from '../service/BackendService';
import { addJournals } from '../store/journal/journalSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function Journals() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [snackbar, setSnackbar] = React.useState<ReactNode>(null);
  const openLinkSnackBar = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClick={() => setSnackbar(null)}
        onClose={() => setSnackbar(null)}
        before={
          <Avatar
            size={24}
            style={{ background: 'var(--vkui--color_background_accent)' }}
          >
            <Icon16Done fill="#fff" width={14} height={14} />
          </Avatar>
        }
      >
        Ссылка скопирована
      </Snackbar>
    );
  };
  const dispatch = useAppDispatch();
  const { toPanel } = useRouterActions();
  console.log(useAppSelector((state) => state.user.role));
  const isMedic = BackendService.getRole();

  useEffect(() => {
    const fetchData = async () => {
      const data: DiariesResponse = await BackendService.getAllDiary();
      dispatch(addJournals(data.diarylist));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Spinner size="large" />}
      <Search disabled></Search>
      <JournalsList onLinkClick={openLinkSnackBar}></JournalsList>
      {isMedic && (
        <IconButton
          onClick={() => toPanel(PanelTypes.JOURNAL_CREATE)}
          style={{
            position: 'sticky',
            display: 'flex',
            bottom: '60px',
            marginTop: '610px',
            marginRight: '10px',
            justifyContent: 'end',
          }}
        >
          <Icon28AddCircleOutline fill="#2688EB" width={48} height={48} />
        </IconButton>
      )}
      {snackbar}
    </>
  );
}
