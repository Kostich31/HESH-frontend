import bridge from '@vkontakte/vk-bridge';

class VkService {
  async getUserInfo() {
    const user = await bridge.send('VKWebAppGetUserInfo');
    return user;
  }
  chareLink(link: string) {
    bridge.send('VKWebAppShare', {
      link: link,
    });
  }

  async notifyAccept() {
    await bridge.send('VKWebAppAllowNotifications');
  }

  updateConfigWatcher(callback) {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        callback(data.apperance);
      }
    });
  }
}

export default new VkService();
