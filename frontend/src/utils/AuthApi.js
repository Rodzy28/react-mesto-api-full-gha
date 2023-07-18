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

  checkToken(token) {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
});
export default authApi;
