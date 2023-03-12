import React, { useState } from "react";
import {
  Button,
  Group,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Input,
  NativeSelect,
  FormItem,
  Textarea,
} from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";

import styles from "./JournalCreate.module.css";
const JournalCreate = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [pacient, setPacient] = useState("");
  const [diaryDescription, setDiaryDescription] = useState("");

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  }
  function getRandomInt() {
    return Math.round(Math.random() * 100);
  }

  const handleCreateJournal = () => {
    postData("http://localhost:8080/api/v1/diary/create", {
      Category: selectedCategory === "rodinka" ? 0 : 1,
      MedicId: getRandomInt(),
      PatientId: getRandomInt(),
      CreatingDate: new Date().toJSON(),
      Title: journalTitle,
      Description: diaryDescription,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormItem width="100%" top="Название дневника">
          <Input
            value={journalTitle}
            onChange={(event) => setJournalTitle(event.target.value)}
          />
        </FormItem>
        <FormItem width="100%" top="Описание дневника">
          <Textarea
            onChange={(event) => setDiaryDescription(event.target.value)}
            value={diaryDescription}
          />
        </FormItem>
        <FormItem width="100%" top="Категория">
          <NativeSelect
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            placeholder="Не выбрана"
          >
            <option value="rodinka">Родинка</option>
            <option value="nerodinka">Другое</option>
          </NativeSelect>
        </FormItem>
        <FormItem top="Пациент">
          <NativeSelect
            value={pacient}
            onChange={(event) => setPacient(event.target.value)}
            placeholder="Не выбран"
          >
            <option value="vasya">Вася Васильев</option>
          </NativeSelect>
        </FormItem>
        <Group mode="plain" className={styles.uploadButtonContainer}>
          <SimpleCell>
            <Button
              before={<Icon24Add></Icon24Add>}
              onClick={handleCreateJournal}
            >
              Создать
            </Button>
          </SimpleCell>
        </Group>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalCreate;
