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
  getKuis: (params: string = "") => {
    return Api().get(`/quiz${params}`);
  },
  getUser: (params: string = "") => {
    return Api().get(`/users${params}`);
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
  postKomen: (data: any) => {
    return Api().post(`/comments`, data);
  },
  postMateri: (data: any) => {
    return Api().post(`/materi`, data);
  },
  postTugas: (data: any, params: string = "") => {
    return Api().post(`/tugas${params}`, data);
  },
  postKuis: (data: any, params: string = "") => {
    return Api().patch(`/quiz${params}`, data);
  },
  postFileTugas: (data: any) => {
    return Api().post(`/tugas/file`, data, { multipartForm: true });
  },

  deleteUser: (params: string = "") => {
    return Api().delete(`/users${params}`);
  },

  getProfile: (data: any) => {
    return Api().post(`/users/profile`, data);
  },
};

export default ApiRoute;
