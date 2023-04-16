import {
  useRouterActions,
} from 'react-router-vkminiapps-updated';
import { ViewTypes, PanelTypes } from './../../router/structure';
import { useAppDispatch } from './../../store/store';
import { useState, useLayoutEffect } from 'react';
import BackendService from '../BackendService';
import VkService from '../VkService';
import { initUser } from '../../store/user/userSlice';
import { Roles } from '../../interfaces/types';

export const useAuth = ({ setLoading }) => {
  const { toView, toPanel } = useRouterActions();
  const [needRegister, setNeedRegister] = useState(false);

  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const authUser = async () => {
      const user = await VkService.getUserInfo();
      console.log('[vk user]', user);
      const userVKInfo = {
        id: user.id,
        name: `${user.last_name} ${user.first_name}`,
      };
      BackendService.setUserId(userVKInfo.id);
      BackendService.setName(userVKInfo.name);
      const userInfo = await BackendService.initUser();
      if (userInfo.name === '') {
        setNeedRegister(true);
        toView(ViewTypes.REGISTER);
        if (BackendService.getInviteLink() !== '') {
          toPanel(PanelTypes.REGISTER_PATIENT);
        } else {
          toPanel(PanelTypes.REGISTER_CHOOSE);
        }
      } else {
        BackendService.setRole(userInfo.ismedic);
        dispatch(
          initUser({
            vkID: userVKInfo.id,
            role: userInfo.ismedic ? Roles.MEDIC : Roles.PATIENT,
            name: userVKInfo.name,
          })
        );
        setNeedRegister(false);
        toView(ViewTypes.JOURNALS);
        toPanel(PanelTypes.JOURNALS);
      }
      setLoading(false);
    };
    authUser();
  }, []);

  return { needRegister };
};
