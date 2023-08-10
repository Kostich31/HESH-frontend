import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import NoteCreateLayout from '../components/Note/NoteCreate/NoteCreateLayout/NoteCreateLayout';
import { PanelTypes } from '../router/structure';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addTemporaryNoteInfo } from '../store/note/noteSlice';

export default function NoteCreateInfo() {
  const { toPanel, toBack } = useRouterActions();
  const initialState = useAppSelector((state) => state.note.temporaryNoteInfo);
  const dispatch = useAppDispatch();
  const onContinueClick = () => {
    toPanel(PanelTypes.NOTE_CREATE_PHOTO);
  };
  const onBack = () => {
    dispatch(
      addTemporaryNoteInfo({
        title: '',
        treatment: '',
        details: '',
        recommendations: '',
        complaints: '',
        feelings: -1,
      })
    );
    toBack();
  };
  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={onBack}></PanelHeaderBack>}
      >
        Создание записи
      </PanelHeader>
      <NoteCreateLayout
        initialState={initialState}
        onContinueClick={onContinueClick}
      ></NoteCreateLayout>
    </>
  );
}
