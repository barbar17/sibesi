import axios from "axios";

const Api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

Api.interceptors.response.use(
  (response) => response?.data?.data || response?.data,
  (error) => {
    return Promise.reject(error?.response?.data?.message || error);
  }
);

export default Api;
