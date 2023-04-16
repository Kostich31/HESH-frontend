import React from 'react';
import NoteCardDetailed from '../components/Note/NoteCardDetailed';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Text, Div, Image, CardGrid } from '@vkontakte/vkui';
import BackendService from '../service/BackendService';
import { addNote } from '../store/note/noteSlice';
import { PanelTypes } from '../router/structure';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { removeNote } from '../store/journal/journalSlice';
import { DropdownNote } from '../components/Dropdown/DropdownNote';

export default function NoteSingle() {
  const isMedic = BackendService.getRole();
  const note = useAppSelector((state) => state.note.note);
  const isMedicRecord = note.basicinfo.complaints !== undefined ? false : true;
  const dispatch = useAppDispatch();
  const { toPanel, toBack } = useRouterActions();
  const onEditClick = async () => {
    const response = await BackendService.getNote(
      note.id,
      isMedicRecord ? 'medic' : 'patient'
    );
    dispatch(addNote(response));
    toPanel(PanelTypes.NOTE_EDIT);
  };
  const onDeleteClick = async () => {
    await BackendService.deleteNote(note.id, isMedic ? 'medic' : 'patient');
    dispatch(removeNote(note.id));
    toBack();
  };
  const onAudioClick = () => {
    toPanel(PanelTypes.NOTE_AUDIO_TEXT);
  };
  return (
    <>
      <DropdownNote
        isMedic={isMedic}
        isOwner={(isMedic && isMedicRecord) || (!isMedic && !isMedicRecord)}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onProtocolClick={onAudioClick}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onMemoClick={() => {}}
      ></DropdownNote>
      <NoteCardDetailed></NoteCardDetailed>
      <Text
        weight="1"
        style={{
          marginBottom: '5px',
          marginTop: '10px',
          fontSize: '18px',
          textAlign: 'center',
        }}
      >
        Прикрепленные фотографии
      </Text>
      {note.imagelist.length !== 0 ? (
        <CardGrid
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}
          size="l"
        >
          {note.imagelist.map((image, index) => {
            return (
              <Image
                size={128}
                key={index}
                src={`images/${image.imagename}`}
              ></Image>
            );
          })}
        </CardGrid>
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
            Прикрепленных фотографий нет
          </Text>
        </Div>
      )}
    </>
  );
}
