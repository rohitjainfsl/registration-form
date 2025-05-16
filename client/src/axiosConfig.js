import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_PATH + "/api",
  withCredentials: true, 
});
export default instance;
