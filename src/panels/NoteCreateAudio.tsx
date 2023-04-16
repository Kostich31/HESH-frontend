import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import AudioPicker from '../components/Note/NoteCreate/AudioPicker/AudioPicker';
import { PanelTypes } from '../router/structure';

export default function NoteCreateAudio() {
  const { toPanel } = useRouterActions();

  const onContinueClick = () => {
    toPanel(PanelTypes.NOTE_CREATE_PHOTO);
  };
  return <AudioPicker onContinue={onContinueClick}></AudioPicker>;
}
