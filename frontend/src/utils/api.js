class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: token,
                'Content-type': 'aplication/json'
            }
        })
        .then(this._handleResponse);
    }

    deleteCard(cardID, token) {
        return fetch(`${this._url}/cards/${cardID}`, {
            method: "DELETE",
            headers: {
                authorization: token,
                'Content-type': 'aplication/json'
            }
        })
        .then(this._handleResponse);
    }

    postCard(name, link, token) {
      return fetch(`${this._url}/cards/`, {
        method: "POST",
        headers: {
          authorization: token,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._handleResponse);
    }

    getUserInfo(token){
      return fetch(`${this._url}/users/me`, {
          headers: {
            authorization: token,
            'Content-type': 'aplication/json'
          }
      })
      .then(this._handleResponse);
  }

    editUserInfo(name, about, token) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: token,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about,
        })
    })
    .then(this._handleResponse);
  }

  setToken(token) {
    this._authorization = token;
  }

  _handleResponse(res) {
    if (res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  getCardInfo(name, link) {
    return Promise.all([this.postCard(name, link), this.getUserInfo()]);
  }

  putLike(userData, cardID, token) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(this._handleResponse);
  }

  deleteLike(userData, cardID, token) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(this._handleResponse);
  }

  editUserPhoto(avatarURL, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarURL
      })
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, likeStatus) {
    
  }
}

const api = new Api ({
  url: 'http://localhost:3000'
})

export default api;
