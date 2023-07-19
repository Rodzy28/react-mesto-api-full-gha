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
      credentials: 'include',
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
    });
  }

  setAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});
export default api;
