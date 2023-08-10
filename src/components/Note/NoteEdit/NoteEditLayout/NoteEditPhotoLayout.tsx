import React, { useState, useCallback } from 'react';
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
import { Icon20CancelCircleFillRed, Icon24Camera } from '@vkontakte/icons';

import styles from './NoteEditLayoutPhoto.module.css';

interface NoteEditPhotoLayout {
  onConfirmChange: (id: number, imagesData: any) => void;
  onCancelChange: () => void;
  imagesData: File[];
}

const NoteEditPhotoLayout = ({
  onCancelChange,
  onConfirmChange,
  imagesData,
}: NoteEditPhotoLayout) => {
  const [images, setImages] = useState<File[]>(imagesData);
  const ImageContent = useCallback(() => {
    images.map((elem) => {
    });
    if (images.length !== 0) {
      const list = images.map((image, index) => {
        return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={index}>
            <IconButton
              style={{
                position: 'absolute',
                zIndex: 1,
                marginLeft: '15%',
                marginTop: '-2%',
              }}
              // onClick={(event) => {
              //   if ((event.target as HTMLElement).tagName === 'use') {
              //     removeImage(index);
              //   }
              // }}
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
  }, [images]);

  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormItem
          top="Загрузите ваши фото"
          className={styles.picker}
          style={{ display: 'flex' }}
        >
          <File
            before={<Icon24Camera role="presentation" />}
            size="m"
            multiple
            // onChange={handleImageChange}
          >
            Открыть галерею
          </File>
        </FormItem>
        <ImageContent />
        <ButtonGroup
          style={{
            justifyContent: 'center',
            position: 'sticky',
            height: '60px',
            bottom: '45px',
            background: 'white',
            gap: '50px',
          }}
          align="center"
          mode="horizontal"
          gap="m"
          stretched
        >
          <Button
            mode="tertiary"
            appearance="negative"
            onClick={onCancelChange}
          >
            Отмена
          </Button>
          <Button
            mode="tertiary"
            // onClick={() => onConfirmChange(noteData.id, changeNoteState)}
          >
            Сохранить
          </Button>
        </ButtonGroup>
      </SplitCol>
    </SplitLayout>
  );
};

export default NoteEditPhotoLayout;
