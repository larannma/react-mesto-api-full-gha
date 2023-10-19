import api from './api'
const BASE_URL = process.env.REACT_APP_URL || 'http://localhost:3000';

const _handleResponse = (res) => {
  if (res.ok){
    return res.json()
  } else {
    return Promise.reject(`Ошибка ${res.status}`)
  }
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
  .then(_handleResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password }),
  })
  .then(_handleResponse)
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      api.setToken(data.token)
      return data;
    }
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  })
  .then(_handleResponse)
  .then(data => data)
}