import React, { Fragment, useState } from 'react';
import NoteCardDetailed from '../components/Note/NoteCardDetailed';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  Text,
  Div,
  Image,
  CardGrid,
  SplitLayout,
  SplitCol,
  Alert,
  Button,
} from '@vkontakte/vkui';
import BackendService from '../service/BackendService';
import { addNote, setDiarisationsList } from '../store/note/noteSlice';
import { PanelTypes } from '../router/structure';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { removeNote } from '../store/journal/journalSlice';
import { DropdownNote } from '../components/Dropdown/DropdownNote';
import {
  setActiveNoteId,
  setIsMedicRecord,
  setNoteList,
} from '../store/noteChat/noteChatSlice';
import bridge from '@vkontakte/vk-bridge';

export default function NoteSingle() {
  const isMedic = BackendService.getRole();
  const note = useAppSelector((state) => state.note.note);
  const isCompletedJournal = useAppSelector(
    (state) => state.journal.activeJournalComplete
  );
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
    dispatch(removeNote({ id: note.id, type: isMedic ? 'medic' : 'patient' }));
    toBack();
  };

  const onAudioClick = async () => {
    const list = await BackendService.getAudioText(
      note.id,
      isMedic ? 'medic' : 'patient'
    );
    dispatch(setDiarisationsList(list));
    dispatch(setActiveNoteId({ id: note.id }));
    dispatch(setIsMedicRecord(isMedicRecord));
    toPanel(PanelTypes.NOTE_AUDIO_TEXT);
  };
  const onDoctorNoteClick = async () => {
    dispatch(setActiveNoteId({ id: note.id }));
    dispatch(setIsMedicRecord(isMedicRecord));
    const data = await BackendService.getDoctorsNote(note.id, isMedicRecord);
    dispatch(setNoteList(data ? data : []));
    toPanel(PanelTypes.DOCTOR_NOTE_CHAT);
  };
  const [popout, setPopout] = useState(null);
  const [imageFullScreen, setImageFullScreen] = useState(null);
  const openConfirmBox = () => {
    setPopout(
      (
        <Alert
          actions={[
            {title: 'Отмена',autoClose: true,mode: 'cancel',
            },
            {title: 'Удалить',autoClose: true,mode: 'destructive',action: onDeleteClick,
            },
          ]}actionsLayout="horizontal"onClose={() => setPopout(null)}header="Удаление"
          text="Вы уверены, что хотите
               удалить запись?"
        />
      ) as any
    );
  };
  return (
    <SplitLayout popout={popout}>
      <SplitCol width="100%">
        <NoteCardDetailed
          Dropdown={
            <DropdownNote
              isJournalComplete={isCompletedJournal}
              isMedic={isMedic}
              isOwner={
                (isMedic && isMedicRecord) || (!isMedic && !isMedicRecord)
              }
              onEditClick={onEditClick}
              onDeleteClick={openConfirmBox}
              onProtocolClick={onAudioClick}
              onDoctorNoteClick={onDoctorNoteClick}
            ></DropdownNote>
          }
        ></NoteCardDetailed>
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
              marginBottom: '30px',
            }}
            size="l"
          >
            {note.imagelist.map((image, index) => {
              return (
                <Image
                  onClick={() =>
                    bridge
                      .send('VKWebAppShowImages', {
                        images: [
                          `https://park-hesh.ru/images/${image.imagename}`,
                        ],
                      })
                      .then((data) => {
                        if (data.result) {
                        }
                      })
                  }
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
            <Text weight="3" style={{ textAlign: 'center' }}>
              Прикрепленных фотографий нет
            </Text>
          </Div>
        )}
        {imageFullScreen && (
          <div>
            <Image src={`images/${imageFullScreen}`}></Image>
            <Button onClick={() => setImageFullScreen(null)}>X</Button>
          </div>
        )}
      </SplitCol>
    </SplitLayout>
  );
}
