import {
  Icon24WriteOutline,
  Icon24CheckCircleOutline,
  Icon24DoNotDisturb,
  Icon24MoreVertical,
  Icon24ErrorCircleOutline,
} from '@vkontakte/icons';
import { ButtonGroup, Button, IconButton } from '@vkontakte/vkui';
import { Popover } from '@vkontakte/vkui/dist/components/Popover/Popover';
import React, { useState } from 'react';

interface IDropdownJournalProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  onChatClick: () => void;
  onMoreClick: () => void;
  onCompleteClick: () => void;
  isMedic: boolean;
}

export const DropdownJournal = ({
  onEditClick,
  onDeleteClick,
  onChatClick,
  onMoreClick,
  onCompleteClick,
  isMedic,
}: IDropdownJournalProps) => {
  const [shown, setShown] = useState<boolean>(false);
  return (
    <Popover
      action="hover"
      shown={shown}
      onShownChange={setShown}
      content={
        <ButtonGroup mode="vertical" align="left">
          {isMedic && (
            <>
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
                Редактировать дневник
              </Button>
              <Button
                size="l"
                before={<Icon24ErrorCircleOutline />}
                appearance="accent"
                mode="tertiary"
                align="left"
                stretched
                onClick={(e) => {
                  e.stopPropagation();
                  onMoreClick();
                }}
              >
                Подробнее
              </Button>
              <Button
                size="l"
                before={<Icon24CheckCircleOutline />}
                appearance="accent"
                mode="tertiary"
                align="left"
                stretched
                onClick={(e) => {
                  e.stopPropagation();
                  setShown(false);
                  onCompleteClick();
                }}
              >
                Завершить лечение
              </Button>
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
                Удалить дневник
              </Button>
            </>
          )}
        </ButtonGroup>
      }
    >
      <IconButton size={24} style={{ display: 'flex', marginLeft: '2px' }}>
        <Icon24MoreVertical
          width={24}
          height={24}
          onClick={(e) => e.stopPropagation()}
        />
      </IconButton>
    </Popover>
  );
};
