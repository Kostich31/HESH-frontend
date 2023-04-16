import React, { useState } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  FormItem,
  Textarea,
  ButtonGroup,
} from '@vkontakte/vkui';

import styles from './NoteEditLayout.module.css';
import {
  NotePatientBasicInfo,
  RecordPatientResponse,
} from '../../../../interfaces/types';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../../../router/structure';

interface NoteEditLayoutProps {
  onConfirmChange: (id: number, state: NotePatientBasicInfo) => void;
  onCancelChange: () => void;
  noteData: RecordPatientResponse;
}

const NoteEditLayoutPatient = ({
  onConfirmChange,
  onCancelChange,
  noteData,
}: NoteEditLayoutProps) => {
  const [changeNoteState, setChangeNoteState] = useState<NotePatientBasicInfo>(
    noteData.basicinfo
  );

  const { toPanel } = useRouterActions();

  return (
    <>
      <SplitLayout className={styles.container}>
        <SplitCol width="100%">
          <FormItem width="100%" top="Название">
            <Input
              value={changeNoteState.title}
              onChange={(event) =>
                setChangeNoteState({
                  ...changeNoteState,
                  title: event.target.value,
                })
              }
            />
          </FormItem>
          <FormItem width="100%" top="Лечение">
            <Textarea
              onChange={(event) =>
                setChangeNoteState({
                  ...changeNoteState,
                  treatment: event.target.value,
                })
              }
              value={changeNoteState.treatment}
            />
          </FormItem>
          {}
          <FormItem width="100%" top="Жалобы">
            <Textarea
              onChange={(event) =>
                setChangeNoteState({
                  ...changeNoteState,
                  complaints: event.target.value,
                })
              }
              value={changeNoteState.complaints}
            />
          </FormItem>
          <FormItem width="100%" top="Подробнее">
            <Textarea
              onChange={(event) =>
                setChangeNoteState({
                  ...changeNoteState,
                  details: event.target.value,
                })
              }
              value={changeNoteState.details}
            />
          </FormItem>
          <ButtonGroup
            style={{
              justifyContent: 'center',
              position: 'sticky',
              height: '60px',
              bottom: '45px',
              background: 'white',
              gap: '50px',
            }}
            align="center"
            mode="horizontal"
            gap="m"
            stretched
          >
            <Button
              mode="secondary"
              onClick={() => toPanel(PanelTypes.NOTE_EDIT_PHOTO)}
            >
              Редактировать фотографии
            </Button>
          </ButtonGroup>
          <ButtonGroup
            style={{
              justifyContent: 'center',
              position: 'sticky',
              height: '60px',
              bottom: '45px',
              background: 'white',
              gap: '50px',
            }}
            align="center"
            mode="horizontal"
            gap="m"
            stretched
          >
            <Button
              mode="tertiary"
              appearance="negative"
              onClick={onCancelChange}
            >
              Отмена
            </Button>
            <Button
              mode="tertiary"
              onClick={() => onConfirmChange(noteData.id, changeNoteState)}
            >
              Сохранить
            </Button>
          </ButtonGroup>
        </SplitCol>
      </SplitLayout>
    </>
  );
};

export default NoteEditLayoutPatient;
