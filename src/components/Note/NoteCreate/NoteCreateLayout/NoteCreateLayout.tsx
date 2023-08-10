import React, { useCallback, useState } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  Textarea,
  FormItem,
  Div,
  FormLayout,
  Slider,
  Text,
} from '@vkontakte/vkui';

import { useAppDispatch } from '../../../../store/store';
import {
  addTemporaryNoteInfo,
  TemporaryNoteInfo,
} from '../../../../store/note/noteSlice';

import BackendService from '../../../../service/BackendService';
import { decodeHTMLEntities } from '../../../../helpers/decodeHTMLEntities';

interface NoteCreateLayoutProps {
  onContinueClick: () => void;
  initialState: TemporaryNoteInfo;
}
const NoteCreateLayout = ({
  onContinueClick,
  initialState,
}: NoteCreateLayoutProps) => {
  const [noteState, setNoteState] = useState<TemporaryNoteInfo>(initialState);

  const isMedic = BackendService.getRole();

  const dispatch = useAppDispatch();

  const [isValid, setIsValid] = useState<boolean>(true);

  const handleContinueClick = () => {
    if (noteState.title.trim() === '') {
      setIsValid(false);
    } else {
      dispatch(addTemporaryNoteInfo(noteState));
      onContinueClick();
    }
  };

  const onChangeHandler = useCallback(() => {
    if (noteState.title.trim() !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [noteState]);

  return (
    <SplitLayout>
      <SplitCol width="100%">
        <FormLayout>
          <FormItem
            status={noteState.title || isValid ? 'default' : 'error'}
            bottom={
              noteState.title || isValid
                ? ''
                : 'Пожалуйста, введите название записи'
            }
            width="100%"
            top="Название записи"
            onChange={onChangeHandler}
          >
            <Input
              maxLength={50}
              value={decodeHTMLEntities(noteState.title)}
              onChange={(event) =>
                setNoteState({ ...noteState, title: event.target.value })
              }
            />
          </FormItem>
          <FormItem width="100%" top="Лечение">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setNoteState({ ...noteState, treatment: event.target.value })
              }
              value={decodeHTMLEntities(noteState.treatment)}
            />
          </FormItem>
          {isMedic ? (
            <FormItem width="100%" top={'Рекомендации'}>
              <Textarea
                maxLength={1000}
                onChange={(event) =>
                  setNoteState({
                    ...noteState,
                    recommendations: event.target.value,
                  })
                }
                value={decodeHTMLEntities(noteState.recommendations)}
              />
            </FormItem>
          ) : (
            <FormItem width="100%" top={'Жалобы'}>
              <Textarea
                maxLength={1000}
                onChange={(event) =>
                  setNoteState({ ...noteState, complaints: event.target.value })
                }
                value={decodeHTMLEntities(noteState.complaints)}
              />
            </FormItem>
          )}
          <FormItem width="100%" top="Подробнее">
            <Textarea
              maxLength={3000}
              onChange={(event) =>
                setNoteState({ ...noteState, details: event.target.value })
              }
              value={decodeHTMLEntities(noteState.details)}
            />
          </FormItem>
          {!isMedic && (
            <FormItem
              top={
                <>
                  Самочувствие. От 1 до 10
                  <Text style={{ marginTop: '5px' }} weight="1">
                    {noteState.feelings}
                  </Text>
                </>
              }
            >
              <Slider
                min={1}
                max={10}
                step={1}
                value={noteState.feelings}
                onChange={(value) => {
                  setNoteState({ ...noteState, feelings: value });
                }}
              />
            </FormItem>
          )}
          <Div>
            <Button size="l" onClick={handleContinueClick} stretched>
              Далее
            </Button>
          </Div>
        </FormLayout>
      </SplitCol>
    </SplitLayout>
  );
};

export default NoteCreateLayout;
