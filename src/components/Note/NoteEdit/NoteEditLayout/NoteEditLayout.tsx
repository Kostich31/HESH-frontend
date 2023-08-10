import React, { useCallback, useState } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  FormItem,
  Textarea,
  ButtonGroup,
  FormLayout,
} from '@vkontakte/vkui';

import styles from './NoteEditLayout.module.css';
import {
  NoteMedicBasicInfo,
  RecordMedicResponse,
} from '../../../../interfaces/types';
import { decodeHTMLEntities } from '../../../../helpers/decodeHTMLEntities';

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
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleConfirm = () => {
    if (changeNoteState.title.trim() === '') {
      setIsValid(false);
    } else {
      onConfirmChange(noteData.id, changeNoteState);
    }
  };

  const onChangeHandler = useCallback(() => {
    if (changeNoteState.title.trim() !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [changeNoteState]);
  return (
    <>
      <SplitLayout className={styles.container}>
        <SplitCol width="100%">
          <FormLayout>
            <FormItem
              status={changeNoteState.title || isValid ? 'default' : 'error'}
              bottom={
                changeNoteState.title || isValid
                  ? ''
                  : 'Пожалуйста, введите название записи'
              }
              width="100%"
              top="Название"
              onChange={onChangeHandler}
            >
              <Input
                maxLength={50}
                value={decodeHTMLEntities(changeNoteState.title)}
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
                maxLength={1000}
                onChange={(event) =>
                  setChangeNoteState({
                    ...changeNoteState,
                    treatment: event.target.value,
                  })
                }
                value={decodeHTMLEntities(changeNoteState.treatment)}
              />
            </FormItem>
            {}
            <FormItem width="100%" top="Рекомендации">
              <Textarea
                maxLength={1000}
                onChange={(event) =>
                  setChangeNoteState({
                    ...changeNoteState,
                    recommendations: event.target.value,
                  })
                }
                value={decodeHTMLEntities(changeNoteState.recommendations)}
              />
            </FormItem>
            <FormItem width="100%" top="Подробнее">
              <Textarea
                maxLength={3000}
                onChange={(event) =>
                  setChangeNoteState({
                    ...changeNoteState,
                    details: event.target.value,
                  })
                }
                value={decodeHTMLEntities(changeNoteState.details)}
              />
            </FormItem>
            <ButtonGroup
              style={{
                justifyContent: 'center',
                position: 'sticky',
                height: '60px',
                bottom: '45px',
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
              <Button mode="tertiary" onClick={handleConfirm}>
                Сохранить
              </Button>
            </ButtonGroup>
          </FormLayout>
        </SplitCol>
      </SplitLayout>
    </>
  );
};

export default NoteEditLayout;
