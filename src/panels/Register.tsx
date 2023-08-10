import { Button, Div, Text, Image } from '@vkontakte/vkui';
import React from 'react';
import { useRouterActions } from 'react-router-vkminiapps-updated';
import { Roles } from '../interfaces/types';
import { PanelTypes, ViewTypes } from '../router/structure';
import BackendService from '../service/BackendService';
import { useAppDispatch } from '../store/store';
import { initUser } from '../store/user/userSlice';

interface RegisterProps {
  onRegister: (route: string) => void;
}
const Register = ({ onRegister }: RegisterProps) => {
  const { toPanel } = useRouterActions();
  const dispatch = useAppDispatch();
  const registerMedic = async () => {
    const user = await BackendService.registerUser(
      BackendService.getName(),
      'medic'
    );
    dispatch(initUser({ vkID: user.id, role: Roles.MEDIC, name: user.name }));
    BackendService.setRole(true);

    onRegister(ViewTypes.JOURNALS);
  };

  const registerPatient = () => {
    toPanel(PanelTypes.REGISTER_PATIENT);
  };

  return (
    <Div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ marginBottom: '50px' }}>
        <Image src={'logo/logo.png'} size={128}></Image>
      </div>
      <Text>
        Приложение поможет врачам следить за историей заболевания пациента и
        оказать наилучшую помощь
      </Text>
      <Button
        style={{ marginBottom: '20px', marginTop: '20px' }}
        mode="tertiary"
        size="l"
        onClick={registerMedic}
      >
        Врач
      </Button>
      <Button mode="tertiary" size="l" onClick={registerPatient}>
        Пациент
      </Button>
    </Div>
  );
};

export default Register;
