import {DiaryBasicInfo} from './../interfaces/types';

class BackendService {
  localUrl = 'http://localhost:8080/';
  prefix = 'api/v1';
  deployUrl = 'https://park-hesh.ru/';
  currentUrl = this.deployUrl;
  userId = 0;
  isMedic = false;
  name = '';
  inviteLink = '';

  async initUser() {
    const user = await fetch(
      `${this.currentUrl}${this.prefix}/authorization/init?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
      }
    );
    console.log(user.headers)
    if (Object.fromEntries(user.headers)['x-message'] !== undefined) {
      return {name: ''};
    } else {
      console.log('dont need to register');
      const userInfo = await user.json();
      return userInfo;
    }
  }

  async registerUser(name: string, type: string, diaryid?: number) {
    console.log('getInfo');
    const data: { name: string; diaryid?: number } = {name};
    if (diaryid) {
      data.diaryid = diaryid;
    }

    const user = await fetch(
      `${this.currentUrl}${this.prefix}/authorization/register/${type}?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      }
    );
    const userInfo = await user.json();
    return userInfo;
  }

  async getDiary(id: number) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/diary/get/${id}?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
      }
    );
    const diary = await response.json();
    return diary;
  }

  async getAllDiary() {
    console.log('getInfo');
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/diary/get?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
      }
    );
    const diaryList = await response.json();
    return diaryList;
  }

  async editDiary(id: number, data: DiaryBasicInfo) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/diary/update/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({diarybasicinfo: data}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      }
    );
    if (response.ok) {
      return await response.json();
    }
  }

  async deleteDiary(id: number) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/diary/delete/${id}`,
      {
        method: 'POST',
        mode: 'cors',
      }
    );
    if (response.ok) {
      return 'success';
    } else {
      return '';
    }
  }

  async createDiary(data: DiaryBasicInfo) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/diary/create?vk_user_id=${this.userId}`,
      {
        method: 'POST',
        body: JSON.stringify({diarybasicinfo: data}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      }
    );
    return await response.json();
  }

  async getNote(id: number, type: string) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/record/${type}/get/${id}?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
      }
    );
    return await response.json();
  }

  async createNote(data: FormData, id: number, type: string) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/record/${type}/create/${id}?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
        method: 'POST',
        body: data,
        // headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(response.json());
  }

  async editNote(id: number, data: any, type: string) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/record/${type}/update/text/${id}?vk_user_id=${this.userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      }
    );
    if (response.ok) {
      return await response.json();
    }
  }

  async deleteNote(id: number, type: string) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/record/${type}/delete/${id}?vk_user_id=${this.userId}`,
      {
        method: 'POST',
        mode: 'cors',
      }
    );
    if (response.ok) {
      return 'success';
    } else {
      return '';
    }
  }

  async checkQuality(data: FormData) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/imageQualityAssesment`,
      {
        mode: 'cors',
        method: 'POST',
        body: data,
        // headers: { 'Content-Type': 'multipart/form-datua' },
      }
    );
    return await response.json();
  }

  // async getText(id: number) {
  //   const response = await fetch(
  //     `${this.currentUrl}${this.prefix}/record/medic/delete/${id}?vk_user_id=${this.userId}`,
  //     {
  //       mode: 'cors',
  //     }
  //   );
  // }

  async getComment(id: number) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/comment/get/${id}?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
      }
    );
    return await response.json();
  }

  async createComment(data: { text: string }, id: number) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/comment/create/${id}?vk_user_id=${this.userId}`,
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        // headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(response.json());
  }

  async updateComment(id: number, data: any, type: string) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/comment/update/${id}?vk_user_id=${this.userId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      }
    );
    if (response.ok) {
      return await response.json();
    }
  }

  async deleteComment(id: number, data: any, type: string) {
    const response = await fetch(
      `${this.currentUrl}${this.prefix}/comment/delete/${id}?vk_user_id=${this.userId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      }
    );
    if (response.ok) {
      return await response.json();
    }
  }

  setUserId(id: number) {
    this.userId = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setRole(isMedic: boolean) {
    this.isMedic = isMedic;
  }

  setInviteLink(link: string) {
    this.inviteLink = link;
  }

  getInviteLink() {
    return this.inviteLink;
  }

  getRole() {
    return this.isMedic;
  }

  getName() {
    return this.name;
  }
}

export default new BackendService();
