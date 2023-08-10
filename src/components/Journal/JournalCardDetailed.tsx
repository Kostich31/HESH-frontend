import React from 'react';
import { SimpleCell, Group, Header, InfoRow, Title, usePlatform, Platform } from '@vkontakte/vkui';
import { useAppSelector } from '../../store/store';
import BackendService from '../../service/BackendService';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';

const formatter = new Intl.NumberFormat('ru', {
  style: 'unit',
  unit: 'day',
  unitDisplay: 'long',
});

const JournalCardDetailed = ({ DropdownJournal }) => {
  const journal = useAppSelector((state) => state.journal.journal);
  const creatingDate = useAppSelector((state) => state.journal.creatingdate);
  const name = useAppSelector((state) => state.journal.name);
  const isMedic = BackendService.getRole();
  const platform = usePlatform();

  return (
    <>
      <Group>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: platform === Platform.VKCOM ? '12px' : '16px',
          }}
        >
          <Title level="3">Информация о дневнике</Title>
          {DropdownJournal}
        </div>
        <SimpleCell multiline>
          <InfoRow header="Название">
            {decodeHTMLEntities(journal.title)}
          </InfoRow>
        </SimpleCell>
        {isMedic && (
          <SimpleCell multiline>
            <InfoRow header="Объективно">
              {journal.objectively
                ? decodeHTMLEntities(journal.objectively)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
        )}
        <SimpleCell>
          <InfoRow header="Дата создания">
            {new Date(creatingDate).toLocaleDateString()}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Напоминания о создании записей">
            {journal.reminder.frequency === 0
              ? 'Напоминания не настроены'
              : journal.reminder.variant === true
              ? `1 раз в ${formatter.format(
                  Number(journal.reminder.frequency)
                )}`
              : `${journal.reminder.frequency} раз(а) в день`}
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
