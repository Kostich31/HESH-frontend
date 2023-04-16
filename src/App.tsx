import React, { useState } from 'react';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Epic,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Tabbar,
  TabbarItem,
  View,
} from '@vkontakte/vkui';
import { Icon28BookOutline } from '@vkontakte/icons';
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
export default function App() {
  const { toView, toBack, toPanel } = useRouterActions();
  const [loading, setLoading] = useState(true);
  if (window.location.hash.includes('link')) {
    BackendService.setInviteLink(`${window.location.hash}`);
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
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        <AppRoot>
          <Epic
            hidden={activeView === ViewTypes.REGISTER}
            activeStory={activeView}
            tabbar={
              <Tabbar>
                <TabbarItem
                  onClick={() => toView(ViewTypes.JOURNALS)}
                  selected={activeView === ViewTypes.JOURNALS}
                  text="Дневники"
                >
                  <Icon28BookOutline />
                </TabbarItem>
              </Tabbar>
            }
          >
            <View id={ViewTypes.JOURNALS} activePanel={activePanel}>
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
                <PanelHeader
                  before={<PanelHeaderBack onClick={toBack}></PanelHeaderBack>}
                >
                  Создание записи
                </PanelHeader>
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
            </View>
          </Epic>
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
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
