import axios from "axios";
import {useAuthStore} from "@/store/AuthStore.js";

const api = axios.create();

api.defaults.baseURL = 'https://api.shoutlink.me'
api.defaults.withCredentials = true

api.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.isLogin) {
    config.headers.Authorization = authStore.getBearerToken;
  }
  return config;
})

api.interceptors.response.use(response => {
  return response;
}, error => {
  const response = error.response.data;
  const errorCode = response.errorCode;
  const authStore = useAuthStore();
  switch (errorCode) {
    case 'SL101':
      alert('로그인이 필요합니다!')
      authStore.logout();
      break;
    case 'SL103':
      alert('로그인 세션이 만료되었습니다!')
      authStore.logout();
      break;
  }
  return Promise.reject(error);
})

export default api;
