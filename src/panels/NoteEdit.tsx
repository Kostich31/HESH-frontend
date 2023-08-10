import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import NoteEditLayoutPatient from '../components/Note/NoteEdit/NoteEditLayout/NoteEditLayoutPatient';
import NoteEditLayout from '../components/Note/NoteEdit/NoteEditLayout/NoteEditLayout';
import { NoteMedicBasicInfo, NotePatientBasicInfo } from '../interfaces/types';
import BackendService from '../service/BackendService';
import { addNote } from '../store/note/noteSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const NoteEdit = () => {
  const note = useAppSelector((state) => state.note.note);
  const dispatch = useAppDispatch();
  const { toBack } = useRouterActions();
  const isMedic = BackendService.getRole();
  async function onConfirmClick(id: number, createState: NoteMedicBasicInfo) {
    await BackendService.editNote(id, createState, 'medic');
    const response = await BackendService.getNote(id, 'medic');
    dispatch(addNote(response));
    toBack();
  }
  async function onConfirmClickPatient(id: number, createState: any) {
    await BackendService.editNote(
      id,
      createState,
      isMedic ? 'medic' : 'patient'
    );
    const response = await BackendService.getNote(
      id,
      isMedic ? 'medic' : 'patient'
    );
    dispatch(addNote(response));
    toBack();
  }

  const onCancelClick = () => {
    toBack();
  };
  if (isMedic) {
    return (
      <NoteEditLayout
        onCancelChange={onCancelClick}
        onConfirmChange={onConfirmClick}
        noteData={note}
      ></NoteEditLayout>
    );
  }

  return (
    <NoteEditLayoutPatient
      onCancelChange={onCancelClick}
      onConfirmChange={onConfirmClickPatient}
      noteData={note}
    ></NoteEditLayoutPatient>
  );
};

export default NoteEdit;
