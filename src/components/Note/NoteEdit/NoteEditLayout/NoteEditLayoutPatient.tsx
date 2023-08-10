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
  Slider,
  Text,
} from '@vkontakte/vkui';

import styles from './NoteEditLayout.module.css';
import {
  NoteMedicBasicInfo,
  NotePatientBasicInfo,
  RecordMedicResponse,
  RecordPatientResponse,
} from '../../../../interfaces/types';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../../../router/structure';
import BackendService from '../../../../service/BackendService';
import { decodeHTMLEntities } from '../../../../helpers/decodeHTMLEntities';

interface NoteEditLayoutProps {
  onConfirmChange: (id: number, state: NotePatientBasicInfo) => void;
  onCancelChange: () => void;
  noteData: RecordPatientResponse & RecordMedicResponse;
}

const NoteEditLayoutPatient = ({
  onConfirmChange,
  onCancelChange,
  noteData,
}: NoteEditLayoutProps) => {
  const [changeNoteState, setChangeNoteState] = useState<
    NotePatientBasicInfo & NoteMedicBasicInfo
  >(noteData.basicinfo);
  const [isValid, setIsValid] = useState<boolean>(true);
  const isMedic = BackendService.getRole();

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
              onChange={onChangeHandler}
              width="100%"
              top="Название"
            >
              <Input
                maxLength={50}
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
                maxLength={1000}
                onChange={(event) =>
                  setChangeNoteState({
                    ...changeNoteState,
                    treatment: event.target.value,
                  })
                }
                value={changeNoteState.treatment}
              />
            </FormItem>

            {isMedic ? (
              <FormItem width="100%" top={'Рекомендации'}>
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
            ) : (
              <FormItem width="100%" top={'Жалобы'}>
                <Textarea
                  maxLength={1000}
                  onChange={(event) =>
                    setChangeNoteState({
                      ...changeNoteState,
                      complaints: event.target.value,
                    })
                  }
                  value={decodeHTMLEntities(changeNoteState.complaints)}
                />
              </FormItem>
            )}
            <FormItem width="100%" top="Подробнее">
              <Textarea
                maxLength={3000}
                onChange={(event) =>
                  setChangeNoteState({
                    ...changeNoteState,
                    details: event.target.value,
                  })
                }
                value={changeNoteState.details}
              />
            </FormItem>
            {!isMedic && (
              <FormItem
                top={
                  <>
                    Самочувствие. От 1 до 10
                    <Text style={{ marginTop: '5px' }} weight="1">
                      {changeNoteState.feelings}
                    </Text>
                  </>
                }
              >
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={changeNoteState.feelings}
                  onChange={(value) => {
                    setChangeNoteState({ ...changeNoteState, feelings: value });
                  }}
                />
              </FormItem>
            )}
            <ButtonGroup
              style={{
                justifyContent: 'center',
                position: 'sticky',
                height: '60px',
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

export default NoteEditLayoutPatient;
