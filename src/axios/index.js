import axios from "axios";

const api = axios.create();

api.defaults.baseURL = 'https://api.shoutlink.me'
api.defaults.withCredentials = true
export default api;
