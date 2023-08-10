import { Button, Div, Input, FormItem, ButtonGroup } from '@vkontakte/vkui';
import React, { ChangeEvent, useState } from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { Roles } from '../interfaces/types';
import { PanelTypes, ViewTypes } from '../router/structure';
import BackendService from '../service/BackendService';
import { useAppDispatch } from '../store/store';
import { initUser } from '../store/user/userSlice';

const AcceptInvitePanel = () => {
  const { toPanel, toView } = useRouterActions();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>(
    `${BackendService.getInviteLink()}`
  );

  const acceptInviteLink = async () => {
    const tokenArray = inputValue.match(/token=(\w+)/i);

    const token = tokenArray?.length === 2 ? tokenArray[1] : '';
    if (!token.trim()) {
      return;
    }
    const user = await BackendService.acceptInviteLink(
      Number(
        inputValue
          .match(/diaryid=(\d+)/g)
          ?.toString()
          .replace(/[^0-9]/g, '')
      ),
      token
    );
    BackendService.setRole(false);
    toView(ViewTypes.JOURNALS);
    toPanel(PanelTypes.JOURNALS);
  };

  return (
    <Div
      style={{
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      <FormItem width="100%" top="Приглашение от врача">
        <Input
          value={inputValue}
          placeholder="Ссылка-приглашение"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputValue(event.target.value)
          }
        ></Input>
      </FormItem>
      <FormItem width="100%">
        <ButtonGroup stretched align="center">
          <Button
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
            size="l"
            onClick={acceptInviteLink}
          >
            Принять приглашение
          </Button>
        </ButtonGroup>
      </FormItem>
    </Div>
  );
};

export default AcceptInvitePanel;
