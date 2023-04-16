// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  FormItem,
  File,
  Div,
} from '@vkontakte/vkui';
import { Icon24MusicOutline } from '@vkontakte/icons';

import styles from './AudioPicker.module.css';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { addTemporaryNoteAudio } from '../../../../store/note/noteSlice';

interface AudioPickerProps {
  onContinue: () => void;
}

const AudioPicker = ({ onContinue }: AudioPickerProps) => {
  const initialState = useAppSelector((state) => state.note.temporaryNoteAudio);
  const [audioFile, setAudio] = useState<File>(initialState);

  const dispatch = useAppDispatch();

  const handleAudioChange = (e: ChangeEvent) => {
    const audio = e.target as HTMLInputElement;
    if (!audio) {
      return;
    }
    const files = audio.files as FileList;
    if (files.length) {
      setAudio(files[0]);
    }
    console.log('files', files);
  };

  const handleContinueClick = () => {
    dispatch(addTemporaryNoteAudio(audioFile));
    onContinue();
  };
  console.log('auido', audioFile.length);
  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormItem
          top="Загрузите аудио"
          className={styles.picker}
          style={{ display: 'flex' }}
        >
          <File
            before={<Icon24MusicOutline role="presentation" />}
            size="m"
            multiple
            accept="audio/mpeg"
            onChange={handleAudioChange}
          >
            Выбрать файл
          </File>
        </FormItem>
        {audioFile.size !== undefined && (
          <Div style={{ display: 'flex', justifyContent: 'center' }}>
            <audio controls src={URL.createObjectURL(audioFile)}></audio>
          </Div>
        )}
        <Div>
          <Button size="l" onClick={handleContinueClick} stretched>
            Далее
          </Button>
        </Div>
      </SplitCol>
    </SplitLayout>
  );
};

export default AudioPicker;
