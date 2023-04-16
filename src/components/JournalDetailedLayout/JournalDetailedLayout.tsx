import React, { useState } from 'react';
import {
  SplitCol,
  SplitLayout,
  Group,
  InfoRow,
  SimpleCell,
} from '@vkontakte/vkui';

import styles from './JournalDetailed.module.css';
import { DiaryBasicInfo } from '../../interfaces/types';

interface JournalDetailedLayoutProps {
  journalData: DiaryBasicInfo;
}

const JournalDetailedLayout = ({ journalData }: JournalDetailedLayoutProps) => {
  const [changeJournalState] = useState<DiaryBasicInfo>({
    ...journalData,
  });

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <Group>
          <SimpleCell multiline>
            <InfoRow header="Название">{changeJournalState.title}</InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Жалобы">{changeJournalState.complaints}</InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Анамнез">{changeJournalState.anamnesis}</InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Объективно">
              {changeJournalState.objectively}
            </InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Диагноз">{changeJournalState.diagnosis}</InfoRow>
          </SimpleCell>
        </Group>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalDetailedLayout;
