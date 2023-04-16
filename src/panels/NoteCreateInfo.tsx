import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import NoteCreateLayout from '../components/Note/NoteCreate/NoteCreateLayout/NoteCreateLayout';
import { PanelTypes } from '../router/structure';

export default function NoteCreateInfo() {
  const { toPanel } = useRouterActions();

  const onContinueClick = () => {
    toPanel(PanelTypes.NOTE_CREATE_AUDIO);
  };

  return (
    <>
      <NoteCreateLayout onContinueClick={onContinueClick}></NoteCreateLayout>
    </>
  );
}
