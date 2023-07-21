class AuthApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _handlerServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then(this._handlerServerResponse);
  }

  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then(this._handlerServerResponse);
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(this._handlerServerResponse);
  }

  checkUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
      },
    })
    .then(this._handlerServerResponse);
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://api.rodzy28.nomoredomains.xyz',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
export default authApi;
