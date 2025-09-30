import axios, { AxiosRequestConfig } from "axios";

// const Api = axios.create({
//   baseURL: "/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000,
// });

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error?.response?.data?.message || error?.response?.data?.error || error?.response?.data?.data);
  }
);

interface Headers {
  "Content-Type"?: string;
}

interface ConfigInterface {
  body?: any;
  multipartForm?: boolean;
  url?: string;
}

const Api = () => ({
  Config: ({ multipartForm = false }: ConfigInterface) => {
    let headers: Headers = {};
    if (multipartForm) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const client: AxiosRequestConfig = {
      baseURL: "/api",
      headers: headers as any,
      timeout: 60000,
    };

    return client;
  },

  get: (url: string = "") => {
    return axios.get(url, Api().Config({ body: {}, url })).then((res) => res?.data?.data);
  },

  post: (url: string, body: any, config?: ConfigInterface) => {
    return axios
      .post(
        url,
        body,
        Api().Config({
          body,
          url,
          multipartForm: config?.multipartForm,
        })
      )
      .then((res) => res?.data?.data || res?.data || res);
  },

  patch: (url: string, body: any, config?: ConfigInterface) => {
    return axios
      .patch(
        url,
        body,
        Api().Config({
          body,
          url,
          multipartForm: config?.multipartForm,
        })
      )
      .then((res) => res?.data?.data || res?.data || res);
  },
});

export default Api;
