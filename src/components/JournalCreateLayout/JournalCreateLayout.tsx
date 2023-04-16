import React, { useState } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  FormItem,
  Textarea,
  Div,
} from '@vkontakte/vkui';

import styles from './JournalCreateLayout.module.css';
import { DiaryBasicInfo } from '../../interfaces/types';

interface JournalCreateLayoutProps {
  onCreateClick: (state: DiaryBasicInfo) => void;
}

const JournalCreateLayout = ({ onCreateClick }: JournalCreateLayoutProps) => {
  const [createJournalState, setCreateJournalState] = useState<DiaryBasicInfo>({
    title: '',
    diagnosis: '',
    objectively: '',
    complaints: '',
    anamnesis: '',
  });

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormItem width="100%" top="Название дневника">
          <Input
            value={createJournalState.title}
            onChange={(event) =>
              setCreateJournalState({
                ...createJournalState,
                title: event.target.value,
              })
            }
          />
        </FormItem>
        <FormItem width="100%" top="Жалобы">
          <Textarea
            onChange={(event) =>
              setCreateJournalState({
                ...createJournalState,
                complaints: event.target.value,
              })
            }
            value={createJournalState.complaints}
          />
        </FormItem>
        <FormItem width="100%" top="Анамнез">
          <Textarea
            onChange={(event) =>
              setCreateJournalState({
                ...createJournalState,
                anamnesis: event.target.value,
              })
            }
            value={createJournalState.anamnesis}
          />
        </FormItem>
        <FormItem width="100%" top="Объективно">
          <Textarea
            onChange={(event) =>
              setCreateJournalState({
                ...createJournalState,
                objectively: event.target.value,
              })
            }
            value={createJournalState.objectively}
          />
        </FormItem>
        <FormItem width="100%" top="Диагноз">
          <Textarea
            onChange={(event) =>
              setCreateJournalState({
                ...createJournalState,
                diagnosis: event.target.value,
              })
            }
            value={createJournalState.diagnosis}
          />
        </FormItem>
        <Div>
          <Button
            size="l"
            stretched
            onClick={() => onCreateClick(createJournalState)}
          >
            Создать
          </Button>
        </Div>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalCreateLayout;
