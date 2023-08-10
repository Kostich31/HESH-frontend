import React from 'react';
import {
  Group,
  InfoRow,
  SimpleCell,
  Header,
  Title,
  usePlatform,
  Platform,
} from '@vkontakte/vkui';
import { useAppSelector } from '../../store/store';
import BackendService from '../../service/BackendService';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';

const NoteCardDetailed = ({ Dropdown }) => {
  const note = useAppSelector((state) => state.note.note);
  const isMedicRecord = note.basicinfo.complaints !== undefined ? false : true;
  
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
          <Title level="3">Информация о записи</Title>
          {Dropdown}
        </div>
        <SimpleCell multiline>
          <InfoRow header="Название">
            {decodeHTMLEntities(note.basicinfo.title)}
          </InfoRow>
        </SimpleCell>
        <SimpleCell multiline>
          <InfoRow header="Лечение">
            {note.basicinfo.treatment
              ? decodeHTMLEntities(note.basicinfo.treatment)
              : 'Не заполнено'}
          </InfoRow>
        </SimpleCell>
        {!isMedicRecord ? (
          <SimpleCell multiline>
            <InfoRow header="Жалобы">
              {note.basicinfo.complaints
                ? decodeHTMLEntities(note.basicinfo.complaints)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
        ) : (
          <SimpleCell multiline>
            <InfoRow header="Рекомендации">
              {note.basicinfo.recommendations
                ? decodeHTMLEntities(note.basicinfo.recommendations)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
        )}
        <SimpleCell multiline>
          <InfoRow header="Детали">
            {note.basicinfo.details
              ? decodeHTMLEntities(note.basicinfo.details)
              : 'Не заполнено'}
          </InfoRow>
        </SimpleCell>
        {note.basicinfo.feelings && (
          <SimpleCell>
            <InfoRow header="Самочувствие">{note.basicinfo.feelings}</InfoRow>
          </SimpleCell>
        )}
      </Group>
    </>
  );
};

export default NoteCardDetailed;
