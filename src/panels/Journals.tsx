import { Icon16Done, Icon28AddCircleOutline } from '@vkontakte/icons';
import {
  IconButton,
  Spinner,
  Avatar,
  Snackbar,
  Search,
  FixedLayout,
  SplitLayout,
  SplitCol,
} from '@vkontakte/vkui';
import React, { ReactNode } from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import JournalsList from '../components/JournalsList/JournalsList';
import { PanelTypes } from '../router/structure';
import BackendService from '../service/BackendService';
import VkService from '../service/VkService';
import { Delimiter } from '../components/Delimiter/Delimiter';
import { useJournalListState } from '../components/JournalsList/hooks/useJournalListState';

export default function Journals() {
  const [snackbar, setSnackbar] = React.useState<ReactNode>(null);
  const openLinkSnackBar = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClick={() => setSnackbar(null)}
        onClose={() => setSnackbar(null)}
        onActionClick={() => {
          VkService.chareLink(BackendService.getInviteLink());
        }}
        action="Поделиться"
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
  const { toPanel } = useRouterActions();
  const isMedic = BackendService.getRole();

  const {notCompletedList,completedList,onSearchChange,isLoading,searchValue,setList,
  } = useJournalListState();

  return (
    <SplitLayout>
      <SplitCol width="100%">
        {isLoading && <Spinner size="large" />}
        <Search
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchValue}
        ></Search>
        <JournalsList
          onListUpdate={setList}
          diaryList={notCompletedList}
          onLinkClick={openLinkSnackBar}
        ></JournalsList>
        {(notCompletedList.length !== 0 || completedList.length !== 0) && (
          <Delimiter text="Завершенные дневники" />
        )}
        <JournalsList
          onListUpdate={setList}
          diaryList={completedList}
          onLinkClick={openLinkSnackBar}
          isComplete
        ></JournalsList>
        {isMedic && notCompletedList.length !== 0 && (
          <FixedLayout
            vertical="bottom"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              style={{ marginBottom: '10px', marginRight: '10px' }}
              onClick={() => toPanel(PanelTypes.JOURNAL_CREATE)}
            >
              <Icon28AddCircleOutline fill={'#2688EB'} width={48} height={48} />
            </IconButton>
          </FixedLayout>
        )}
        {snackbar}
      </SplitCol>
    </SplitLayout>
  );
}
