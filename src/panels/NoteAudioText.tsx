import { Group, SimpleCell, SplitCol, SplitLayout } from '@vkontakte/vkui';
import React from 'react';
import { useAppSelector } from '../store/store';

export const NoteAudioText = () => {
  const text = useAppSelector((state) => state.note.note.diarisation);
  const formattedText = text.replace(
    new RegExp('SPEAKER', 'g'),
    '\n' + 'SPEAKER'
  );
  function newlineText(formattedText: string) {
    const text = formattedText;
    const newText = text
      .split('\n')
      .map((str, index) => <p key={index}>{str}</p>);

    return newText;
  }

  return (
    <SplitLayout>
      <SplitCol width="100%">
        <Group>
          <SimpleCell multiline>{newlineText(formattedText)}</SimpleCell>
        </Group>
      </SplitCol>
    </SplitLayout>
  );
};
