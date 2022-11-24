import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = token;
};
