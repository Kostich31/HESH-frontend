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

import styles from './JournalEdit.module.css';
import { DiaryBasicInfo } from '../../interfaces/types';

interface JournalEditLayoutProps {
  onConfirmChange: (state: DiaryBasicInfo) => void;
  onCancelChange: () => void;
  journalData: DiaryBasicInfo;
}

const JournalEditLayout = ({
  onConfirmChange,
  onCancelChange,
  journalData,
}: JournalEditLayoutProps) => {
  const [changeJournalState, setChangeJournalState] = useState<DiaryBasicInfo>({
    ...journalData,
  });

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormItem width="100%" top="Название дневника">
          <Input
            value={changeJournalState.title}
            onChange={(event) =>
              setChangeJournalState({
                ...changeJournalState,
                title: event.target.value,
              })
            }
          />
        </FormItem>
        <FormItem width="100%" top="Жалобы">
          <Textarea
            onChange={(event) =>
              setChangeJournalState({
                ...changeJournalState,
                complaints: event.target.value,
              })
            }
            value={changeJournalState.complaints}
          />
        </FormItem>
        <FormItem width="100%" top="Анамнез">
          <Textarea
            onChange={(event) =>
              setChangeJournalState({
                ...changeJournalState,
                anamnesis: event.target.value,
              })
            }
            value={changeJournalState.anamnesis}
          />
        </FormItem>
        <FormItem width="100%" top="Объективно">
          <Textarea
            onChange={(event) =>
              setChangeJournalState({
                ...changeJournalState,
                objectively: event.target.value,
              })
            }
            value={changeJournalState.objectively}
          />
        </FormItem>
        <FormItem width="100%" top="Диагноз">
          <Textarea
            onChange={(event) =>
              setChangeJournalState({
                ...changeJournalState,
                diagnosis: event.target.value,
              })
            }
            value={changeJournalState.diagnosis}
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
            onClick={() => onConfirmChange(changeJournalState)}
          >
            Сохранить
          </Button>
        </ButtonGroup>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalEditLayout;
