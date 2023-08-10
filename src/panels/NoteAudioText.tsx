import {
  Group,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Div,
  Spinner,
  Text,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
import AudioPicker from '../components/Note/NoteCreate/AudioPicker/AudioPicker';
import BackendService from '../service/BackendService';
import Message from '../components/Message/Message';

const formatText = (
  textAudio: string
): { text: string; date: string; first: boolean }[] => {
  const formattedText = textAudio.replace(
    new RegExp('SPEAKER', 'g'),
    '\n' + 'Собеседник'
  );
  const text = formattedText;
  const textWithoutEmpty = text.split('\n').filter((elem) => elem !== '');
  const messageList = [];
  for (let i = 0; i < textWithoutEmpty.length; i += 2) {
    messageList.push({
      text: textWithoutEmpty[i + 1],
      date: textWithoutEmpty[i].replace(/^\D+/, '').slice(2),
      first: textWithoutEmpty[i].replace(/^\D+/, '')[0] === '1' ? true : false,
    });
  }
  return messageList;
};

export const NoteAudioText = () => {
  const audio: any = useAppSelector((state) => state.note.diarisationsList);
  const isMedic = BackendService.getRole();
  const [audioList, setAudioList] = useState(audio ?? []);
  const noteId = useAppSelector((state) => state.noteChat.activeNoteId);
  const [intervalRequest, setIntervalRequest] = useState<boolean>(
    audio.length !== 0 && (audio[0] as any).DiarisationInfo.iscomplete !== true
  );
  const isCompleteJournal = useAppSelector(
    (state) => state.journal.activeJournalComplete
  );
  useEffect(() => {
    if (intervalRequest) {
      const timer = setInterval(async () => {
        const list = await BackendService.getAudioText(
          noteId,
          isMedic ? 'medic' : 'patient'
        );
        if (list[0].DiarisationInfo.iscomplete) {
          setAudioList(list);
          setIntervalRequest(false);
        }
      }, 2000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [intervalRequest]);
  const onAdd = (list: any) => {
    setIntervalRequest(true);
    setAudioList([list]);
  };

  const content = () => {
    if (isCompleteJournal) {
      return (
        <Div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}
        >
          <Text>Дневник завершен. Нельзя добавить расшифровку аудиозаписи</Text>
        </Div>
      );
    }
    return isMedic ? (
      <Div>
        <AudioPicker onAdd={onAdd}></AudioPicker>
      </Div>
    ) : (
      <Div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50%',
        }}
      >
        <Text>Врач не отправил аудиозапись на расшифровку</Text>
      </Div>
    );
  };
  return (
    <SplitLayout>
      <SplitCol width="100%">
        <Div >
          {audioList.length !== 0
            ? audioList.map(
                (elem: any, index: React.Key | null | undefined) => {
                  if (elem.DiarisationInfo.iscomplete === false) {
                    return (
                      <Div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: '50%',
                        }}
                      >
                        <Spinner></Spinner>
                        <Text>Аудио обрабатывается</Text>
                      </Div>
                    );
                  }
                  return (
                    <>
                      {formatText(elem.DiarisationInfo.diarisation).map(
                        (message, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              justifyContent: message.first
                                ? 'flex-end'
                                : 'flex-start',
                              marginBottom: '10px',
                            }}
                          >
                            <Message
                              createDate={message.date}
                              text={message.text}
                            ></Message>
                          </div>
                        )
                      )}
                    </>
                  );
                }
              )
            : content()}
        </Div>
      </SplitCol>
    </SplitLayout>
  );
};
