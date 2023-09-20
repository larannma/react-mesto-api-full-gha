class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.headers.authorization; //token
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization,
                'Content-type': 'aplication/json'
            }
        })
        .then(this._handleResponse);
    }

    deleteCard(cardID) {
        return fetch(`${this._url}/cards/${cardID}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
                'Content-type': 'aplication/json'
            }
        })
        .then(this._handleResponse);
    }

    postCard(name, link) {
      return fetch(`${this._url}/cards/`, {
        method: "POST",
        headers: {
          authorization: this._authorization,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._handleResponse);
    }

    getUserInfo(){
      return fetch(`${this._url}/users/me`, {
          headers: {
              authorization: this._authorization,
              'Content-type': 'aplication/json'
          }
      })
      .then(this._handleResponse);
  }

    editUserInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about,
        })
    })
    .then(this._handleResponse);
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

  putLike(userData, cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(this._handleResponse);
  }

  deleteLike(userData, cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(this._handleResponse);
  }

  editUserPhoto(avatarURL) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
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
  url: process.env.REACT_APP_URL,
  headers: {
    authorization:"dc202966-4535-49ef-8591-fac68a4cb807",
  }
})

export default api;
