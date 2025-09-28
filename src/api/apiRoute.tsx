import Api from "@/utils/api";

const ApiRoute = {
  getDashboard: (params: string = "") => {
    return Api().get(`/dashboard${params}`);
  },
  getMateri: (params: string = "") => {
    return Api().get(`/materi${params}`);
  },
  getTugas: (params: string = "") => {
    return Api().get(`/tugas${params}`);
  },
  getKelas: (params: string = "") => {
    return Api().get(`/kelas${params}`);
  },
  getMapel: (params: string = "") => {
    return Api().get(`/mapel${params}`);
  },

  postLogin: (data: any) => {
    return Api().post(`/login`, data);
  },
  postMapel: (data: any) => {
    return Api().post(`/mapel`, data);
  },
  postMapelLama: (data: any) => {
    return Api().post(`/mapel/kelas`, data);
  },
  postImage: (params: string = "", data: any) => {
    return Api().post(`/${params}/images`, data, { multipartForm: true });
  },
  postUser: (params: string = "", data: any) => {
    return Api().post(`/users/${params}`, data);
  },

  getProfile: (data: any) => {
    return Api().post(`/users/profile`, data);
  },
};

export default ApiRoute;
