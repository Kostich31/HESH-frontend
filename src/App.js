import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  PanelHeader,
  Panel,
  Epic,
  Tabbar,
  TabbarItem,
  useAdaptivityConditionalRender,
} from "@vkontakte/vkui";

import {
  Icon28BookOutline,
  Icon28UserCircleOutline,
  Icon28AddCircleOutline,
  Icon28UsersOutline,
} from "@vkontakte/icons";

import JournalCardList from "./components/Journal/JournalCardList";
import Home from "./panels/Home";
import Persik from "./panels/Persik";
import { PanelTypes } from "./routing/structure";
import SearchInput from "./components/SearchInput/SearchInput";
import Journal from "./panels/Journal";
import NewNote from "./panels/NewNote";
import NewJournal from "./panels/NewJournal";

const App = () => {
  const [activeStory, setActiveStory] = React.useState(PanelTypes.JOURNALS);
  const [activeJournal, setActiveJournal] = React.useState("");
  const { viewWidth } = useAdaptivityConditionalRender();
  const onStoryChange = (storyName) => setActiveStory(storyName);
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
    }
    fetchData();
    console.log("useEffect");
  }, []);

  const onJournalChange = (storyName, journalName) => {
    setActiveStory(storyName);
    setActiveJournal(journalName);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Epic
            activeStory={activeStory}
            tabbar={
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={() => onStoryChange(PanelTypes.JOURNALS)}
                  selected={activeStory === PanelTypes.JOURNALS}
                  text="Дневники"
                >
                  <Icon28BookOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => onStoryChange(PanelTypes.ADDNOTE)}
                  selected={activeStory === PanelTypes.ADDNOTE}
                  text="Добавить запись"
                >
                  <Icon28AddCircleOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => onStoryChange(PanelTypes.ADDJOURNAL)}
                  selected={activeStory === PanelTypes.ADDJOURNAL}
                  text="Добавить дневник"
                >
                  <Icon28AddCircleOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => onStoryChange(PanelTypes.MYDOCTORS)}
                  selected={activeStory === PanelTypes.MYDOCTORS}
                  text="Мои врачи"
                >
                  <Icon28UsersOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={() => onStoryChange(PanelTypes.PROFILE)}
                  selected={activeStory === PanelTypes.PROFILE}
                  text="Профиль"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
              </Tabbar>
            }
          >
            <View id={PanelTypes.JOURNALS} activePanel={PanelTypes.JOURNALS}>
              <Panel id={PanelTypes.JOURNALS}>
                <PanelHeader>Мои дневники</PanelHeader>
                <SearchInput></SearchInput>
                <JournalCardList onClick={onJournalChange}></JournalCardList>
              </Panel>
            </View>
            <View id={PanelTypes.ADDNOTE} activePanel={PanelTypes.ADDNOTE}>
              <Panel id={PanelTypes.ADDNOTE}>
                <NewNote />
              </Panel>
            </View>
            <View
              id={PanelTypes.ADDJOURNAL}
              activePanel={PanelTypes.ADDJOURNAL}
            >
              <Panel id={PanelTypes.ADDJOURNAL}>
                <NewJournal />
              </Panel>
            </View>
            <View id={PanelTypes.MYDOCTORS} activePanel={PanelTypes.MYDOCTORS}>
              <Panel id={PanelTypes.MYDOCTORS}>
                <PanelHeader>Мои врачи</PanelHeader>
              </Panel>
            </View>
            <View id={PanelTypes.PROFILE} activePanel={PanelTypes.PROFILE}>
              <Panel id={PanelTypes.PROFILE}>
                <PanelHeader>Профиль</PanelHeader>
              </Panel>
            </View>
            <View id={PanelTypes.JOURNAL} activePanel={PanelTypes.JOURNAL}>
              <Panel id={PanelTypes.JOURNAL}>
                <PanelHeader>Дневник {activeJournal}</PanelHeader>
                <Journal></Journal>
              </Panel>
            </View>
          </Epic>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
