class AuthApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _handlerServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(email, password) {
    return fetch(email, password).then(this._handlerServerResponse);
  }

  registration(data) {
    return this._request(`${this._url}/signup`, {
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
    });
  }

  login(data) {
    return this._request(`${this._url}/signin`, {
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
    });
  }

  signOut() {
    return this._request(`${this._url}/signout`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  checkUser() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
      },
    });
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://rodzy28.nomoredomains.xyz',
  headers: {
    'Accept': 'application/json',
    'Content-Type': "application/json",
  }
});
export default authApi;
