import {
  Icon24WriteOutline,
  Icon24ArticleBoxOutline,
  Icon24DoNotDisturb,
  Icon24MoreVertical,
  Icon24NewsfeedMusicNoteOutline,
} from '@vkontakte/icons';
import { ButtonGroup, Button, IconButton } from '@vkontakte/vkui';
import { Popover } from '@vkontakte/vkui/dist/components/Popover/Popover';
import React, { useState } from 'react';

interface IDropdownNoteProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  onMemoClick: () => void;
  onProtocolClick: () => void;
  isOwner: boolean;
  isMedic: boolean;
}

export const DropdownNote = ({
  onEditClick,
  onDeleteClick,
  onMemoClick,
  onProtocolClick,
  isOwner,
  isMedic,
}: IDropdownNoteProps) => {
  const [shown, setShown] = useState<boolean>(false);

  return (
    <Popover
      action="click"
      shown={shown}
      onShownChange={setShown}
      content={
        <ButtonGroup mode="vertical" align="left">
          {isOwner && (
            <Button
              size="l"
              before={<Icon24WriteOutline />}
              appearance="accent"
              mode="tertiary"
              align="left"
              stretched
              onClick={(e) => {
                e.stopPropagation();
                onEditClick();
              }}
            >
              Редактировать запись
            </Button>
          )}
          {isMedic && (
            <Button
              disabled
              size="l"
              before={<Icon24ArticleBoxOutline />}
              appearance="accent"
              mode="tertiary"
              align="left"
              stretched
              onClick={(e) => {
                e.stopPropagation();
                onMemoClick();
              }}
            >
              Заметки
            </Button>
          )}
          <Button
            size="l"
            before={<Icon24NewsfeedMusicNoteOutline />}
            appearance="accent"
            mode="tertiary"
            align="left"
            stretched
            disabled
            onClick={(e) => {
              e.stopPropagation();
              onProtocolClick();
            }}
          >
            Протокол
          </Button>
          {isOwner && (
            <Button
              size="l"
              before={<Icon24DoNotDisturb fill="red" />}
              appearance="accent"
              mode="tertiary"
              align="left"
              stretched
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
            >
              Удалить запись
            </Button>
          )}
        </ButtonGroup>
      }
    >
      <IconButton
        hasActive={false}
        hasHover={false}
        size={24}
        style={{ display: 'flex' }}
      >
        <Icon24MoreVertical
          width={24}
          height={24}
          onClick={(e) => e.stopPropagation()}
          fill="black"
        />
      </IconButton>
    </Popover>
  );
};
