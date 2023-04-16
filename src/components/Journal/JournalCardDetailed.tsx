import React from 'react';
import { SimpleCell, Group, Header, InfoRow } from '@vkontakte/vkui';
import { useAppSelector } from '../../store/store';
import BackendService from '../../service/BackendService';

const JournalCardDetailed = () => {
  const journal = useAppSelector((state) => state.journal.journal);
  const creatingDate = useAppSelector((state) => state.journal.creatingdate);
  const name = useAppSelector((state) => state.journal.name);
  const isMedic = BackendService.getRole();
  return (
    <>
      <Group>
        <Header
          style={{ display: 'flex', justifyContent: 'center' }}
          mode="secondary"
        >
          Информация о дневнике
        </Header>
        <SimpleCell multiline>
          <InfoRow header="Название">{journal.title}</InfoRow>
        </SimpleCell>
        {isMedic && (
          <SimpleCell multiline>
            <InfoRow header="Объективно">{journal.objectively}</InfoRow>
          </SimpleCell>
        )}
        <SimpleCell>
          <InfoRow header="Дата создания">
            {new Date(creatingDate).toLocaleDateString()}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header={isMedic ? 'Пациент' : 'Врач'}>
            {name ? name : 'Пациент еще не добавлен'}
          </InfoRow>
        </SimpleCell>
      </Group>
    </>
  );
};

export default JournalCardDetailed;
