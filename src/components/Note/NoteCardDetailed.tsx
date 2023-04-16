import React from 'react';
import { Group, InfoRow, SimpleCell, Header } from '@vkontakte/vkui';
import { useAppSelector } from '../../store/store';
import BackendService from '../../service/BackendService';

const NoteCardDetailed = () => {
  const note = useAppSelector((state) => state.note.note);
  const isMedic = BackendService.getRole();
  console.log('note', note);
  return (
    <>
      <Group>
        <Header
          style={{ display: 'flex', justifyContent: 'center' }}
          mode="secondary"
        >
          Информация о записи
        </Header>
        <SimpleCell multiline>
          <InfoRow header="Название">{note.basicinfo.title}</InfoRow>
        </SimpleCell>
        <SimpleCell multiline>
          <InfoRow header="Лечение">{note.basicinfo.treatment}</InfoRow>
        </SimpleCell>
        {!isMedic ? (
          <SimpleCell multiline>
            <InfoRow header="Жалобы">{note.basicinfo.complaints}</InfoRow>
          </SimpleCell>
        ) : (
          <SimpleCell multiline>
            <InfoRow header="Рекомендации">
              {note.basicinfo.recommendations}
            </InfoRow>
          </SimpleCell>
        )}
        <SimpleCell multiline>
          <InfoRow header="Детали">{note.basicinfo.details}</InfoRow>
        </SimpleCell>
      </Group>
    </>
  );
};

export default NoteCardDetailed;
