import Api from "@/utils/api";

const ApiRoute = {
  //   GetMasterJenisProdukKadar: (params: string = "") => {
  //     return Api.get(`/msgadaimasweb/v1/users/master${params}`);
  //   },
  postLogin: (data: any) => {
    return Api.post(`/login`, data);
  },
};

export default ApiRoute;
