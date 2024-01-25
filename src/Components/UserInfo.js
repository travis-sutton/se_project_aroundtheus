export default class UserInfo {
  constructor(nameElement, jobElement, avatarElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}
