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
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';

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
            <InfoRow header="Название">
              {decodeHTMLEntities(changeJournalState.title)}
            </InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Жалобы">
              {changeJournalState.complaints
                ? decodeHTMLEntities(changeJournalState.complaints)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Анамнез">
              {changeJournalState.anamnesis
                ? decodeHTMLEntities(changeJournalState.anamnesis)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Объективно">
              {changeJournalState.objectively
                ? decodeHTMLEntities(changeJournalState.objectively)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
          <SimpleCell multiline>
            <InfoRow header="Диагноз">
              {changeJournalState.diagnosis
                ? decodeHTMLEntities(changeJournalState.diagnosis)
                : 'Не заполнено'}
            </InfoRow>
          </SimpleCell>
        </Group>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalDetailedLayout;
