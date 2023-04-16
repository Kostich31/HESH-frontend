import React, { useState } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  Textarea,
  FormItem,
  Div,
} from '@vkontakte/vkui';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  addTemporaryNoteInfo,
  TemporaryNoteInfo,
} from '../../../../store/note/noteSlice';

import BackendService from '../../../../service/BackendService';

interface NoteCreateLayoutProps {
  onContinueClick: () => void;
}
const NoteCreateLayout = ({ onContinueClick }: NoteCreateLayoutProps) => {
  const initialState = useAppSelector((state) => state.note.temporaryNoteInfo);
  const [noteState, setNoteState] = useState<TemporaryNoteInfo>(initialState);

  const isMedic = BackendService.getRole();

  const dispatch = useAppDispatch();

  const handleContinueClick = () => {
    dispatch(addTemporaryNoteInfo(noteState));
    onContinueClick();
  };

  return (
    <SplitLayout>
      <SplitCol width="100%">
        <FormItem width="100%" top="Название">
          <Input
            value={noteState.title}
            onChange={(event) =>
              setNoteState({ ...noteState, title: event.target.value })
            }
          />
        </FormItem>
        <FormItem width="100%" top="Лечение">
          <Textarea
            onChange={(event) =>
              setNoteState({ ...noteState, treatment: event.target.value })
            }
            value={noteState.treatment}
          />
        </FormItem>
        {isMedic ? (
          <FormItem width="100%" top={'Рекомендации'}>
            <Textarea
              onChange={(event) =>
                setNoteState({
                  ...noteState,
                  recommendations: event.target.value,
                })
              }
              value={noteState.recommendations}
            />
          </FormItem>
        ) : (
          <FormItem width="100%" top={'Жалобы'}>
            <Textarea
              onChange={(event) =>
                setNoteState({ ...noteState, complaints: event.target.value })
              }
              value={noteState.complaints}
            />
          </FormItem>
        )}
        <FormItem width="100%" top="Подробнее">
          <Textarea
            onChange={(event) =>
              setNoteState({ ...noteState, details: event.target.value })
            }
            value={noteState.details}
          />
        </FormItem>
        <Div>
          <Button size="l" onClick={handleContinueClick} stretched>
            Далее
          </Button>
        </Div>
      </SplitCol>
    </SplitLayout>
  );
};

export default NoteCreateLayout;
