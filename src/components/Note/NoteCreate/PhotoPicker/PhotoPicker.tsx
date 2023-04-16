import React, { useState, useCallback, ChangeEvent } from 'react';
import {
  Button,
  Image,
  SplitCol,
  SplitLayout,
  FormItem,
  File,
  CardGrid,
  classNames,
  ButtonGroup,
  Div,
  IconButton,
} from '@vkontakte/vkui';
import {
  Icon20CancelCircleFillRed,
  Icon24Camera,
  Icon20WarningTriangleOutline,
} from '@vkontakte/icons';
import styles from './PhotoPicker.module.css';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { PanelTypes } from '../../../../router/structure';
import {
  removeAudio,
  removeTemporaryNoteInfo,
} from '../../../../store/note/noteSlice';
import BackendService from '../../../../service/BackendService';

// interface PhotoPickerProps {
//   onAddCategoryClick: () => void;
// }

const PhotoPicker = () => {
  const notePhoto = useAppSelector((state) => state.note.temporaryNotePhoto);
  const isMedic = BackendService.getRole();
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<FileList>(
    notePhoto.images as unknown as FileList
  );
  const [goodImages, setGoodImages] = useState<
    { id: number; isGood: boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audio = useAppSelector((state) => state.note.temporaryNoteAudio);
  const { toPanel } = useRouterActions();
  const journalId = useAppSelector((state) => state.journal.id);
  const handleImageChange = (e: ChangeEvent) => {
    const imagesFromUser = e.target as HTMLInputElement;
    if (!imagesFromUser) {
      return;
    }
    const files = imagesFromUser.files as FileList;
    if (files.length) {
      const oldImages = Array.from(images);
      const newImages = oldImages.concat(
        Array.from(files)
      ) as unknown as FileList;
      setImages(newImages);
      setGoodImages(() => {
        return Array.from(newImages).map((_, index) => ({
          id: index,
          isGood: true,
        }));
      });
    }
  };

  const note = useAppSelector((state) => state.note.temporaryNoteInfo);

  const handleCreateNote = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('title', note.title);
    formData.append('treatment', note.treatment);
    formData.append('details', note.details);

    if (isMedic) {
      formData.append('recommendations', note.recommendations);
    } else {
      formData.append('complaints', note.complaints);
    }

    Array.from(images).forEach(async (image) => {
      formData.append(`images`, image);
    });
    if (audio.size !== undefined) {
      formData.append('audio', audio);
    }

    await BackendService.createNote(
      formData,
      journalId as number,
      isMedic ? 'medic' : 'patient'
    );

    dispatch(removeTemporaryNoteInfo());
    dispatch(removeAudio());
    setIsLoading(false);
    toPanel(PanelTypes.JOURNAL_SINGLE);
  };
  const removeImage = (id: number) => {
    setImages(
      (images) =>
        Array.from(images).filter(
          (_, index) => index !== id
        ) as unknown as FileList
    );
  };

  const checkQuality = () => {
    const formData = new FormData();
    const qualityArray = [];

    Array.from(images).map(async (image, index) => {
      formData.set(`image`, image);
      const quality = await BackendService.checkQuality(formData);
      qualityArray.push({ id: index, isGood: quality.assesment });
      const updatedList = goodImages.map((item) => {
        if (item.id === index && quality.assesment === false) {
          return { ...item, isGood: quality.assesment };
        }
        return item;
      });
      setGoodImages(updatedList);
    });
  };

  const ImageContent = useCallback(() => {
    if (images.length) {
      const list = Array.from(images).map((image, index) => {
        return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={`URL.createObjectURL(image)${index}`}>
            {goodImages.length > 0 && goodImages[index].isGood === false && (
              <Icon20WarningTriangleOutline
                fill={'red'}
                width={24}
                height={24}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  marginTop: '-2%',
                }}
              ></Icon20WarningTriangleOutline>
            )}
            <IconButton
              style={{
                position: 'absolute',
                zIndex: 1,
                marginLeft: '15%',
                marginTop: '-2%',
              }}
              onClick={(event) => {
                if ((event.target as HTMLElement).tagName === 'use') {
                  removeImage(index);
                }
              }}
            >
              <Icon20CancelCircleFillRed width={24} height={24} />
            </IconButton>
            <Image
              size={128}
              className={classNames(styles.image)}
              src={URL.createObjectURL(image)}
              alt="uploaded"
            ></Image>
          </label>
        );
      });
      return (
        <CardGrid
          style={{ justifyContent: 'center' }}
          size="l"
          className={styles.imageContainer}
        >
          {list}
        </CardGrid>
      );
    } else {
      return (
        <Div className={styles.imageContainer}>
          <Image size={128}></Image>
        </Div>
      );
    }
  }, [images, goodImages]);

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormItem
          top="Загрузите ваше фото"
          className={styles.picker}
          style={{ display: 'flex' }}
        >
          <File
            before={<Icon24Camera role="presentation" />}
            size="m"
            multiple
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png"
          >
            Открыть галерею
          </File>
        </FormItem>
        <ImageContent />

        {/* {Boolean(activeImages.length) ? (
          <ButtonGroup
            style={{
              justifyContent: 'center',
              marginTop: '16px',
              marginBottom: '8px',
            }}
            mode="horizontal"
            // gap="m"
            stretched
          >
            <Button
              mode="tertiary"
              style={{ color: '#808080' }}
              before={
                <Icon24DeleteOutline fill="#808080"></Icon24DeleteOutline>
              }
              disabled
            >
              Удалить
            </Button>
            <Button
              disabled
              style={{ color: '#808080' }}
              mode="tertiary"
              before={<Icon24Tag fill="#808080"></Icon24Tag>}
              // onClick={() => setIsClicked(true)}
            >
              Добавить категорию
            </Button>
          </ButtonGroup>
        ) : ( */}
        <Div>
          <ButtonGroup stretched mode="vertical">
            <Button
              loading={isLoading}
              size="m"
              stretched
              mode="secondary"
              onClick={checkQuality}
            >
              Проверить качество фотографий
            </Button>
            <Button
              loading={isLoading}
              size="m"
              stretched
              onClick={handleCreateNote}
            >
              Создать запись
            </Button>
          </ButtonGroup>
        </Div>
        {/* )} */}
        {/* {isClicked && (
          <>
            <FormItem top="Список">
              <ChipsInput
                placeholder="Введите название и нажмите Enter"
                onChange={setCategoriesInputValue}
                value={categoriesInputValue}
              />
            </FormItem>
            <ButtonGroup mode="horizontal" gap="m" stretched>
              <Button
                before={<Icon24Add></Icon24Add>}
                onClick={() => {
                  setCategoriesInputValue([]);
                  setIsClicked(false);
                }}
              >
                Отмена
              </Button>
              <Button
                before={<Icon24Add></Icon24Add>}
                onClick={() => {
                  handleCreateNote();
                  console.log(categoriesInputValue);
                }}
              >
                Сохранить
              </Button>
            </ButtonGroup>
          </>
        )} */}
      </SplitCol>
    </SplitLayout>
  );
};

export default PhotoPicker;
