import axios from "axios";
const instance = axios.create({
  baseURL: "https://registration-form-ych0.onrender.com/api",
});
export default instance;
