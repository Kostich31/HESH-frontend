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
import BackendService from '../../../../service/BackendService';
import { useAppSelector } from '../../../../store/store';

interface AudioPickerProps {
  onAdd: (list) => void;
}

const AudioPicker = ({ onAdd }: AudioPickerProps) => {
  const [audioFile, setAudio] = useState<File>(null);
  const activeNoteId = useAppSelector((state) => state.noteChat.activeNoteId);
  const handleAudioChange = (e: ChangeEvent) => {
    const audio = e.target as HTMLInputElement;
    if (!audio) {
      return;
    }
    const files = audio.files as FileList;
    if (files.length) {
      setAudio(files[0]);
    }
  };

  const handleCreateAudio = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile as unknown as File);
    const list = await BackendService.createDiarisation(formData, activeNoteId);

    onAdd(list);
  };
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
        {audioFile?.size !== undefined && (
          <Div style={{ display: 'flex', justifyContent: 'center' }}>
            <audio controls src={URL.createObjectURL(audioFile!)}></audio>
          </Div>
        )}
        <Div>
          <Button
            size="l"
            onClick={handleCreateAudio}
            stretched
            disabled={audioFile === null}
          >
            Отправить на расшифровку
          </Button>
        </Div>
      </SplitCol>
    </SplitLayout>
  );
};

export default AudioPicker;
