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
  NoteMedicBasicInfo,
  RecordMedicResponse,
} from '../../../../interfaces/types';

interface NoteEditLayoutProps {
  onConfirmChange: (id: number, state: NoteMedicBasicInfo) => void;
  onCancelChange: () => void;
  noteData: RecordMedicResponse;
}

const NoteEditLayout = ({
  onConfirmChange,
  onCancelChange,
  noteData,
}: NoteEditLayoutProps) => {
  const [changeNoteState, setChangeNoteState] = useState<NoteMedicBasicInfo>(
    noteData.basicinfo
  );

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
          <FormItem width="100%" top="Рекомендации">
            <Textarea
              onChange={(event) =>
                setChangeNoteState({
                  ...changeNoteState,
                  recommendations: event.target.value,
                })
              }
              value={changeNoteState.recommendations}
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

export default NoteEditLayout;
