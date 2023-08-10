import React, { useState } from 'react';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  View,
} from '@vkontakte/vkui';
import {
  useRouterSelector,
  useRouterActions,
} from 'react-router-vkminiapps-updated';
import { ViewTypes, PanelTypes } from './router/structure';
import Journals from './panels/Journals';
import JournalSingle from './panels/JournalSingle';
import JournalCreate from './panels/JournalCreate';
import NoteSingle from './panels/NoteSingle';
import NoteCreateInfo from './panels/NoteCreateInfo';
import NoteCreatePhoto from './panels/NoteCreatePhoto';
import JournalEdit from './panels/JournalEdit';
import NoteEdit from './panels/NoteEdit';
import Register from './panels/Register';
import JournalDetailed from './panels/JournalDetailed';
import NoteEditPhoto from './panels/NoteEditPhoto';
import NoteCreateAudio from './panels/NoteCreateAudio';
import { NoteAudioText } from './panels/NoteAudioText';
import RegisterPatient from './panels/RegisterPatient';
import { useAuth } from './service/hooks/useAuth';
import BackendService from './service/BackendService';
import DoctorNotes from './panels/DoctorNotes';
import AcceptInvitePanel from './panels/AcceptInvitePanel';
import { JournalChat } from './panels/JournalChat';
export default function App() {
  const { toView, toBack, toPanel } = useRouterActions();
  const [loading, setLoading] = useState(true);
  if (window.location.hash.includes('link')) {
    BackendService.setInviteLink(
      `https://vk.com/app51587334${window.location.hash}`
    );
  }

  useAuth({ setLoading });
  const { activePanel, activeView } = useRouterSelector();
  const go = (route: string) => {
    toView(route);
    toPanel(PanelTypes.JOURNALS);
  };
  if (loading) {
    return <></>;
  }

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <View
            id={ViewTypes.JOURNALS}
            activePanel={activePanel}
            hidden={activeView === ViewTypes.REGISTER}
          >
            <Panel id={PanelTypes.JOURNALS}>
              <PanelHeader>Дневники</PanelHeader>
              <Journals></Journals>
            </Panel>
            <Panel id={PanelTypes.JOURNAL_SINGLE}>
              <PanelHeader
                before={
                  <PanelHeaderBack
                    onClick={() => toPanel(PanelTypes.JOURNALS)}
                  ></PanelHeaderBack>
                }
              >
                Дневник
              </PanelHeader>
              <JournalSingle></JournalSingle>
            </Panel>
            <Panel id={PanelTypes.JOURNAL_CREATE}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Создание дневника
              </PanelHeader>
              <JournalCreate />
            </Panel>
            <Panel id={PanelTypes.JOURNAL_EDIT}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Редактировать
              </PanelHeader>
              <JournalEdit />
            </Panel>
            <Panel id={PanelTypes.JOURNAL_SINGLE_DETAILED}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Подробнее
              </PanelHeader>
              <JournalDetailed />
            </Panel>
            <Panel id={PanelTypes.NOTE_SINGLE}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Запись
              </PanelHeader>
              <NoteSingle />
            </Panel>
            <Panel id={PanelTypes.NOTE_EDIT}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Редактирование записи
              </PanelHeader>
              <NoteEdit />
            </Panel>
            <Panel id={PanelTypes.NOTE_CREATE_INFO}>
              <NoteCreateInfo />
            </Panel>
            <Panel id={PanelTypes.NOTE_CREATE_PHOTO}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Добавление фото
              </PanelHeader>
              <NoteCreatePhoto />
            </Panel>
            <Panel id={PanelTypes.NOTE_EDIT_PHOTO}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Редактирование фотографий
              </PanelHeader>
              <NoteEditPhoto />
            </Panel>
            <Panel id={PanelTypes.NOTE_CREATE_AUDIO}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Добавление аудио
              </PanelHeader>
              <NoteCreateAudio />
            </Panel>
            <Panel id={PanelTypes.NOTE_AUDIO_TEXT}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Расшифрованный текст
              </PanelHeader>
              <NoteAudioText />
            </Panel>
            <Panel id={PanelTypes.DOCTOR_NOTE_CHAT} style={{ height: '100%' }}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Памятки
              </PanelHeader>
              <DoctorNotes />
            </Panel>
            <Panel
              id={PanelTypes.DOCTOR_WITH_PATIENT_CHAT}
              style={{ height: '100%' }}
            >
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Чат
              </PanelHeader>
              <JournalChat />
            </Panel>
          </View>
          <View
            hidden={activeView === ViewTypes.JOURNALS}
            id={ViewTypes.REGISTER}
            activePanel={activePanel}
          >
            <Panel id={PanelTypes.REGISTER_CHOOSE}>
              <Register onRegister={go} />
            </Panel>
            <Panel id={PanelTypes.REGISTER_PATIENT}>
              <PanelHeader
                before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
              >
                Регистрация
              </PanelHeader>
              <RegisterPatient />
            </Panel>
            <Panel id={PanelTypes.ACCEPT_INVITE_LINK}>
              <AcceptInvitePanel />
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
