class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handlerServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handlerServerResponse);
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  postNewCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  addLike(id, isLiked) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    });
  }

  // deleteLike(id) {
  //   return fetch(`${this._url}/cards/${id}/likes`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(this._handlerServerResponse);
  // }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  setAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a12736da-b955-4664-b6d4-b697b2666b6e',
    'Content-Type': 'application/json'
  }
});
export default api;
