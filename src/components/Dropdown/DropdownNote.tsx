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
  onDoctorNoteClick: () => void;
  onProtocolClick: () => void;
  isOwner: boolean;
  isMedic: boolean;
  isJournalComplete?: boolean;
}

export const DropdownNote = ({
  onEditClick,
  onDeleteClick,
  onDoctorNoteClick,
  onProtocolClick,
  isOwner,
  isMedic,
  isJournalComplete = false,
}: IDropdownNoteProps) => {
  const [shown, setShown] = useState<boolean>(false);
  const protocolFlag = (isMedic && isOwner) || !(isMedic || isOwner);
  return (
    <Popover
      action="hover"
      shown={shown}
      onShownChange={setShown}
      content={
        <ButtonGroup mode="vertical" align="left">
          {!isJournalComplete && isOwner && (
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
              size="l"
              before={<Icon24ArticleBoxOutline />}
              appearance="accent"
              mode="tertiary"
              align="left"
              stretched
              onClick={(e) => {
                e.stopPropagation();
                onDoctorNoteClick();
              }}
            >
              Памятки
            </Button>
          )}
          {protocolFlag && (
            <Button
              size="l"
              before={<Icon24NewsfeedMusicNoteOutline />}
              appearance="accent"
              mode="tertiary"
              align="left"
              stretched
              onClick={(e) => {
                e.stopPropagation();
                onProtocolClick();
              }}
            >
              Протокол
            </Button>
          )}
          {!isJournalComplete && isOwner && (
            <Button
              size="l"
              before={<Icon24DoNotDisturb fill="red" />}
              appearance="accent"
              mode="tertiary"
              align="left"
              stretched
              onClick={(e) => {
                e.stopPropagation();
                setShown(false);
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
        hasActive
        hasHover
        size={24}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '2px',
        }}
      >
        <Icon24MoreVertical
          width={24}
          height={24}
          onClick={(e) => e.stopPropagation()}
        />
      </IconButton>
    </Popover>
  );
};
