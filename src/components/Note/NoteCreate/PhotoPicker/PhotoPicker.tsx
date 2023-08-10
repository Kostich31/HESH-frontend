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
  unstable_TextTooltip as TextTooltip,
  Spinner,
  usePlatform,
  Text,
  InfoRow,
  MiniInfoCell,
} from '@vkontakte/vkui';
import {
  Icon20CancelCircleFillRed,
  Icon24Camera,
  Icon20WarningTriangleOutline,
  Icon20CheckCircleFillGreen,
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
import bridge from '@vkontakte/vk-bridge';

enum TIP_TEXT {
  LOADING = 'Происходит распознавание качества...',
  SUCCESS = 'Фотография хорошего качества',
  BAD = 'Фотография плохого качества',
}

const PhotoPicker = () => {
  const notePhoto = useAppSelector((state) => state.note.temporaryNotePhoto);
  const isMedic = BackendService.getRole();
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<FileList>(
    notePhoto.images as unknown as FileList
  );
  const [goodImages, setGoodImages] = useState<
    { id: number; status: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audio = useAppSelector((state) => state.note.temporaryNoteAudio);
  const { toPanel, resetHistory } = useRouterActions();
  const journalId = useAppSelector((state) => state.journal.id);

  const handleImageChange = (e: ChangeEvent) => {
    const imagesFromUser = e.target as HTMLInputElement;
    if (!imagesFromUser) {
      return;
    }
    const files = structuredClone(imagesFromUser.files) as FileList;
    if (files.length <= 10) {
      const oldImages = Array.from(images);
      const newImages = oldImages.concat(
        Array.from(files)
      ) as unknown as FileList;
      setImages(newImages);
      setGoodImages((oldArray) => {
        return [
          ...oldArray,
          ...Array.from(files).map((_, index) => ({
            id: oldArray.length + index,
            status: 'loading',
          })),
        ];
      });

      checkQuality(
        Array.from(files).map((elem, index) => {
          return { id: index + oldImages.length, image: elem };
        })
      );
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
      formData.append('feelings', String(note.feelings));
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
    resetHistory();
  };
  const removeImage = (id: number) => {
    setImages(
      (images) =>
        Array.from(images).filter(
          (_, index) => index !== id
        ) as unknown as FileList
    );
    setGoodImages((images) =>
      Array.from(images).filter((_, index) => index !== id)
    );
  };

  const checkQuality = async (images: Array<{ id: number; image: File }>) => {
    const formData = new FormData();
    Array.from(images).map(async (elem) => {
      formData.set(`image`, elem.image);
      const quality = await BackendService.checkQuality(formData);
      const status = quality.assesment ? 'success' : 'failed';
      setGoodImages((oldArray) =>
        oldArray.map((item) => {
          if (item.id === elem.id) {
            return { ...item, status };
          }
          return item;
        })
      );
    });
  };

  const ImageContent = useCallback(() => {
    if (images.length) {
      const list = Array.from(images).map((image, index) => {
        const status = goodImages[index].status;
        const tooltipText =
          status === 'loading'
            ? TIP_TEXT.LOADING
            : status === 'success'
            ? TIP_TEXT.SUCCESS
            : TIP_TEXT.BAD;
        return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={image.size}>
            {goodImages.length > 0 && (
              <TextTooltip text={tooltipText}>
                {status === 'loading' ? (
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      marginTop: '-5px',
                    }}
                  >
                    <Spinner></Spinner>
                  </div>
                ) : status === 'success' ? (
                  <Icon20CheckCircleFillGreen
                    width={24}
                    height={24}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      marginTop: '-5px',
                    }}
                  ></Icon20CheckCircleFillGreen>
                ) : (
                  <Icon20WarningTriangleOutline
                    fill={'red'}
                    width={24}
                    height={24}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      marginTop: '-5px',
                    }}
                  ></Icon20WarningTriangleOutline>
                )}
              </TextTooltip>
            )}
            <IconButton
              style={{
                position: 'absolute',
                zIndex: 1,
                marginLeft: '92px',
                marginTop: '-17px',
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
              className={classNames(styles.image, {
                [styles.opacity]: status === 'loading',
              })}
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
        <Div>
          <InfoRow
            header=""
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '15px',
              marginBottom: '15px',
            }}
          >
            {goodImages.find((elem) => elem.status === 'loading')
              ? 'Проверка качества фото...'
              : goodImages.find((elem) => elem.status === 'failed')
              ? 'Есть фото плохого качества'
              : ''}
          </InfoRow>
          <ButtonGroup stretched mode="vertical">
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
      </SplitCol>
    </SplitLayout>
  );
};

export default PhotoPicker;
