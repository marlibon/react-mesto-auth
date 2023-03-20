class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getCardList = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  };

  patchUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  };

  addCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  };

  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  };

  setLike = (id, value) => {
    value = value ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${value}`,
      headers: this._headers,
    }).then(this._getResponseData);
  };

  replaceAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponseData);
  };
}
// создание экземпляра подключения к серверу
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "6820f07f-8dfa-4fad-8bb6-c96815674778",
    "Content-Type": "application/json",
  },
});