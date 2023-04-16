import { CardGrid, Image } from '@vkontakte/vkui';
import React from 'react';

export const NotePhotoContainer = ({ imagesList }) => {
  const ImageContainer = () => {
    return (
      <CardGrid
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',

          gap: '10px',
        }}
        size="l"
      >
        {imagesList.map((path: string, index: number) => {
          return <Image size={128} key={index} src={`images/${path}`}></Image>;
        })}
      </CardGrid>
    );
  };
  return <ImageContainer></ImageContainer>;
};
