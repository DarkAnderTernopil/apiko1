import axios from 'axios';

// axios.defaults.baseURL = ''
const names = {
  TOKEN: '___token',
};
export const Auth = {
  _token: null,
  setToken(token) {
    this._token = token;
    window.localStorage.setItem(names.TOKEN, token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  isLoggedIn() {
    return !!this._token;
  },
  getTokenFromStorage() {
    return window.localStorage.getItem(names.TOKEN);
  },
  clearToken() {
    window.localStorage.removeItem(names.TOKEN);
    this._token = null;
    axios.defaults.headers.authorization = null;
  },

  login({ email, password }) {
    return axios.post('/api/auth/login', { email, password });
  },
  register({ email, password, fullName }) {
    return axios.post('/api/auth/register', {
      email,
      password,
      fullName,
    });
  },
};
export const Account = {
  getUser() {
    return axios.get('/api/account');
  },
};
export const Products = {
  fetchLatest() {
    return axios.get('/api/products/latest');
  },
  getById(id) {
    return axios.get(`/api/products/${id}`);
  },
};
