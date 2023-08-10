import { Button, Div, Input, FormItem } from '@vkontakte/vkui';
import React, { ChangeEvent, useState } from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { Roles } from '../interfaces/types';
import { PanelTypes, ViewTypes } from '../router/structure';
import BackendService from '../service/BackendService';
import { useAppDispatch } from '../store/store';
import { initUser } from '../store/user/userSlice';
import VkService from '../service/VkService';

const RegisterPatient = () => {
  const { toPanel, toView } = useRouterActions();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>(
    `${BackendService.getInviteLink()}`
  );

  const registerPatient = async () => {
    const tokenArray = inputValue.match(/token=(\w+)/i);

    const token = tokenArray?.length === 2 ? tokenArray[1] : '';
    if (!token.trim()) {
      return;
    }
    const user = await BackendService.registerUser(
      BackendService.getName(),
      'patient',
      Number(
        inputValue.match(/diaryid=(\d+)/g)?.toString().replace(/[^0-9]/g, '')
      ),
      token
    );
    const userInfo = user.userinfo;
    dispatch(
      initUser({ vkID: userInfo.id, role: Roles.PATIENT, name: userInfo.name })
    );
    BackendService.setRole(false);
    VkService.notifyAccept();
    toView(ViewTypes.JOURNALS);
    toPanel(PanelTypes.JOURNALS);
  };

  return (
    <Div
      style={{flexDirection: 'column',display: 'flex'}}
    >
      <FormItem width="100%" top="Приглашение от врача">
        <Input
          value={inputValue} placeholder="Ссылка-приглашение" onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value) }
        ></Input>
      </FormItem>
      <FormItem width="100%">
        <Button
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
          size="l"
          onClick={registerPatient}
        >
          Принять приглашение
        </Button>
      </FormItem>
    </Div>
  );
};

export default RegisterPatient;

