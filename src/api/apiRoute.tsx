import Api from "@/utils/api";

const ApiRoute = {
  getDashboard: (params: string = "") => {
    return Api.get(`/dashboard${params}`);
  },

  postLogin: (data: any) => {
    return Api.post(`/login`, data);
  },

  getProfile: (data: any) => {
    return Api.post(`/users/profile`, data);
  },
};

export default ApiRoute;
