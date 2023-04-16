import bridge from '@vkontakte/vk-bridge';

class VkService {
  async getUserInfo() {
    const user = await bridge.send('VKWebAppGetUserInfo');
    return user;
  }
  async getImage(path: string) {
    await bridge
      .send('VKWebAppShowImages', {
        images: [`https://park-hesh/images/${path}.png`],
      })
      .then((data) => {
        if (data.result) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new VkService();
