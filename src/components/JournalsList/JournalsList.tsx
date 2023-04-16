import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addJournalId } from '../../store/journal/journalSlice';
import JournalCard from '../Journal/JournalCard';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../router/structure';
import { Div, SplitCol, SplitLayout, Text, Button } from '@vkontakte/vkui';
import BackendService from '../../service/BackendService';

interface JournalsListProps {
  onLinkClick: () => void;
}
export default function JournalsList({ onLinkClick }: JournalsListProps) {
  const dispatch = useAppDispatch();
  const { toPanel } = useRouterActions();
  const journalsList = useAppSelector((state) => state.journal.diarylist);
  const isMedic = BackendService.getRole();

  const onJournalClick = (id: number) => {
    dispatch(addJournalId(id));
    toPanel(PanelTypes.JOURNAL_SINGLE);
  };

  const handleLinkClick = async (id: number) => {
    navigator.clipboard.writeText(
      `https://vk.com/app51587334#link?diaryid=${id}`
    );
    onLinkClick();
  };

  return (
    <SplitLayout>
      <SplitCol width={'100%'}>
        <Div>
          {journalsList.length !== 0 ? (
            journalsList.map((journal) => {
              return (
                <JournalCard
                  onLinkClick={(id: number) => handleLinkClick(id)}
                  key={journal.id}
                  {...journal}
                  name={isMedic ? journal.patientname : journal.medicname}
                  creatingDate={journal.creatingdate}
                  onJournalClick={onJournalClick}
                ></JournalCard>
              );
            })
          ) : (
            <Div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Дневников пока что нет
              </Text>

              <Button
                onClick={() => toPanel(PanelTypes.JOURNAL_CREATE)}
                mode="tertiary"
              >
                Создать дневник
              </Button>
            </Div>
          )}
        </Div>
      </SplitCol>
    </SplitLayout>
  );
}
