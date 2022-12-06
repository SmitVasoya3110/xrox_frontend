import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
