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
  byUserId(userId) {
    return axios.get(`/api/users/${userId}/products`);
  },
  addProductToSaved(id) {
    return axios.post(`/api/products/${id}/saved`);
  },
  removeProductFromSaved(id) {
    return axios.delete(`/api/products/${id}/saved`);
  },
  getSavedProducts() {
    return axios.get(`/api/products/saved`);
  },
  createNewProduct(data) {
    return axios.post(`/api/products`, data);
  },
};
export const Users = {
  getUserProducts(userId) {
    return axios.get(`/api/users/${userId}/products`);
  },
  getUserById(userId) {
    return axios.get(`/api/users/${userId}`);
  },
};
export const Chats = {
  createChat(id, message) {
    return axios.post(`/api/products/${id}/createChat`, { message });
  },
  getList() {
    return axios.get('/api/chats');
  },
  sendMessage(id, message) {
    return axios.post(`/api/chats/${id}/messages`, { message });
  },
  getChatMessages(id) {
    return axios.get(`/api/chats/${id}/messages`);
  },
};
export const Image = {
  async upload(image) {
    const bodyForm = new FormData();
    console.log({ image });
    bodyForm.append('image', image);

    const res = await axios.post('/api/upload/images', bodyForm);
    return res.data;
  },
};
