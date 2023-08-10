import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import NoteEditPhotoLayout from '../components/Note/NoteEdit/NoteEditLayout/NoteEditPhotoLayout';
import { NoteMedicBasicInfo } from '../interfaces/types';
import BackendService from '../service/BackendService';
import { addNote } from '../store/note/noteSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

const NoteEditPhoto = () => {
  const note = useAppSelector((state) => state.note.note);
  const dispatch = useAppDispatch();
  const { toBack } = useRouterActions();

  async function onConfirmClick(id: number, createState: NoteMedicBasicInfo) {
    await BackendService.editNote(id, createState, 'medic');
    const response = await BackendService.getNote(id, 'medic');
    dispatch(addNote(response));
    toBack();
  }

  const onCancelClick = () => {
    toBack();
  };
  const urlToObject = () => {
    const imagePath = note.imagelist;
    const files: File[] = [];
    imagePath.forEach(async (image) => {
      const response = await fetch(
        `https://park-hesh.ru/images/${image.imagename}`,
        { headers: { 'Content-Type': 'image/png' } }
      );
      const blob = await response.blob();
      const file = new File([blob], `${image.imagename}`, {
        type: 'image/png',
      });
      files.push(file);
    });
    return files as unknown as File[];
  };
  const imagesList = urlToObject();
  return (
    <NoteEditPhotoLayout
      onCancelChange={onCancelClick}
      onConfirmChange={onConfirmClick}
      imagesData={imagesList}
    ></NoteEditPhotoLayout>
  );
};

export default NoteEditPhoto;
