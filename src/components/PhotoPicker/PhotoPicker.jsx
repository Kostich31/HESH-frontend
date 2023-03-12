import React, { useState, useRef } from "react";
import {
  Button,
  Group,
  IconButton,
  Image,
  SimpleCell,
  SplitCol,
  SplitLayout,
  Input,
  Title,
  NativeSelect,
  Textarea,
  FormItem,
} from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";

import styles from "./PhotoPicker.module.css";
const PhotoPicker = () => {
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [selectedPartOfBody, setSelectedPartOfBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [symptomeText, setSymptomeText] = useState("");
  const [selectedJournal, setSelectedJournal] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Token {{lC0PQ7Qm7wexELxR4Awb1XC8BxBxT0WYs7h}}",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  const handleCreateNote = () => {
    // console.log(noteTitle, symptomeText, selectedPartOfBody);
    // const formData = new FormData();
    // formData.append("image", image);
    postData("https://api.imageban.ru/v1/user/28422", {
      Id: getRandomInt() * getRandomInt(),
      Category: selectedCategory === "rodinka" ? 0 : 1,
      MedicId: getRandomInt(),
      PatientId: getRandomInt(),
      CreatingDate: new Date().toJSON(),
      Title: journalTitle,
      Description: "",
    })
      .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ImageContent = () => {
    if (imageURL) {
      return (
        <>
          <Image size={128} src={imageURL} alt="uploaded" />{" "}
        </>
      );
    } else {
      return (
        <>
          <Image size={128}></Image>
        </>
      );
    }
  };

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <Group
          mode="plain"
          className={styles.imageContainer}
          style={{ display: "flex" }}
        >
          <SimpleCell
            before={
              <IconButton onClick={() => fileInputRef.current.click()}>
                <Icon24Add></Icon24Add>
              </IconButton>
            }
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              hidden
            />
          </SimpleCell>
          <SimpleCell>
            <ImageContent />
          </SimpleCell>
        </Group>
        <FormItem width="100%" top="Название записи">
          <Input
            value={noteTitle}
            onChange={(event) => setNoteTitle(event.target.value)}
          />
        </FormItem>
        <FormItem width="100%" top="Описание симптомов">
          <Textarea
            onChange={(event) => setSymptomeText(event.target.value)}
            value={symptomeText}
          />
        </FormItem>
        <FormItem top="Область тела">
          <NativeSelect
            value={selectedPartOfBody}
            onChange={(event) => setSelectedPartOfBody(event.target.value)}
            placeholder="Не выбрана"
          >
            <option value="leftLeg">Левая нога</option>
            <option value="rightLeg">Правая нога</option>
            <option value="leftArm">Левая рука</option>
            <option value="rightArm">Правая рука</option>
          </NativeSelect>
        </FormItem>
        <FormItem top="Выбрать дневник">
          <NativeSelect
            value={selectedJournal}
            onChange={(event) => setSelectedJournal(event.target.value)}
            placeholder="Не выбрана"
          >
            <option value="leftLeg">Дневник №1</option>
            <option value="rightLeg">Дневник №2</option>
          </NativeSelect>
        </FormItem>
        <Group mode="plain" className={styles.uploadButtonContainer}>
          <SimpleCell>
            <Button before={<Icon24Add></Icon24Add>} onClick={handleCreateNote}>
              Создать
            </Button>
          </SimpleCell>
        </Group>
      </SplitCol>
    </SplitLayout>
  );
};

export default PhotoPicker;
