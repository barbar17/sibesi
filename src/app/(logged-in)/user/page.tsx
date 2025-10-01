"use client";

import ApiRoute from "@/api/apiRoute";
import Dropdown from "@/components/Dropdown";
import InputCustom from "@/components/inputCustom";
import ModalCustom from "@/components/modalCustom";
import TableCustom from "@/components/tableCustom";
import LoadingStore from "@/store/loadingStore";
import { OptionInterface } from "@/types/optionInterface";
import Formatting from "@/utils/formatting";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function User() {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [data, setData] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<OptionInterface | null>({ label: "Guru", value: 1 });
  const [formUser, setFormUser] = useState<any>({});
  const [showModalUser, setShowModalUser] = useState<boolean>(false);
  const [optionKelas, setOptionKelas] = useState<OptionInterface[]>([]);
  const [optionMapel, setOptionMapel] = useState<OptionInterface[]>([]);

  const optionRole = [
    { label: "Guru", value: 1 },
    { label: "Siswa", value: 2 },
  ];

  const column: any[] = [
    { title: "NISN/NIP", cell: "user_id" },
    { title: "Nama", cell: "nama_user" },
    { title: "Kelas/Mata Pelajaran", cell: (row: any) => <div>{row?.nama_kelas || row?.nama_mapel}</div> },
    {
      title: "Action",
      cell: (row: any) => (
        <div className="button-secondary !border-red-700 w-8 h-8 !p-0" onClick={() => onDelete(row?.user_id)}>
          <TrashIcon className="w-4 h-4 text-red-700" />
        </div>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    Promise.all([ApiRoute.getUser("/siswa"), ApiRoute.getUser("/guru")])
      .then((res) => {
        // setData([...res[0], ...res[1]]);

        setData([
          {
            user_id: "112233",
            kelas_id: "12MIPA2",
            nama_kelas: "12 MIPA 2",
            nama_user: "jhon doe",
          },
          {
            user_id: "1111",
            mapel_id: "IPA12",
            nama_mapel: "IPA 12",
            nama_user: "Jhon Deer",
          },
        ]);

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const onDelete = (id: number) => {
    setLoading(true);
    ApiRoute.deleteUser(`/${id}`)
      .then(() => {
        toast.success("User berhasil dihapus");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const onSubmitUser = () => {
    setLoading(true);
    let temp = { ...formUser };

    if (selectedRole?.value === 1) {
      temp = { ...temp, mapel_id: formUser?.mapel_id?.value };
    } else {
      temp = { ...temp, kelas_id: formUser?.kelas_id?.value };
    }

    ApiRoute.postUser(selectedRole?.value === 1 ? "guru" : "siswa", temp)
      .then(() => {
        toast.success("User berhasil ditambahkan");
        setShowModalUser(false);
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setFormUser({});
  }, [selectedRole, showModalUser]);

  useEffect(() => {
    fetchData();
    Promise.all([ApiRoute.getKelas(), ApiRoute.getMapel()])
      .then((res) => {
        setOptionKelas(Formatting.formatRC(res[0], "kelas_id", "nama_kelas"));
        setOptionMapel(Formatting.formatRC(res[1], "mapel_id", "nama_mapel"));
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ModalCustom isOpen={showModalUser} onClose={() => setShowModalUser(false)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-[120px] flex-shrink-0">Role</div>
              <div className="flex-1">
                <Dropdown options={optionRole} placeholder="Role" value={selectedRole} handleOnChange={(evt) => setSelectedRole(evt)} width="100%" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-[120px] flex-shrink-0">{selectedRole?.value === 1 ? "NIP" : "NIS"}</div>
            <InputCustom
              value={formUser?.user_id}
              onChange={(evt) => setFormUser({ ...formUser, user_id: evt })}
              placeholder={selectedRole?.value === 1 ? "NIP" : "NIS"}
              className="w-full"
            />
          </div>

          <div className="flex items-center">
            <div className="w-[120px] flex-shrink-0">Nama</div>
            <InputCustom value={formUser?.nama_user} onChange={(evt) => setFormUser({ ...formUser, nama_user: evt })} placeholder="Nama" className="w-full" />
          </div>

          <div className="flex items-center">
            <div className="w-[120px] flex-shrink-0">{selectedRole?.value === 1 ? "Mata Pelajaran" : "Kelas"}</div>
            {selectedRole?.value === 1 ? (
              <div className="flex-1">
                <Dropdown
                  options={optionMapel}
                  placeholder="Mata Pelajatan"
                  value={formUser?.mapel_id}
                  handleOnChange={(evt) => setFormUser({ ...formUser, mapel_id: evt })}
                  width="100%"
                />
              </div>
            ) : (
              <div className="flex-1">
                <Dropdown
                  options={optionKelas}
                  placeholder="Kelas"
                  value={formUser?.kelas_id}
                  handleOnChange={(evt) => setFormUser({ ...formUser, kelas_id: evt })}
                  width="100%"
                />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="w-[120px] flex-shrink-0">Username</div>
            <InputCustom value={formUser?.username} onChange={(evt) => setFormUser({ ...formUser, username: evt })} placeholder="Username" className="w-full" />
          </div>

          <div className="flex items-center">
            <div className="w-[120px] flex-shrink-0">Password</div>
            <InputCustom value={formUser?.password} onChange={(evt) => setFormUser({ ...formUser, password: evt })} placeholder="Password" className="w-full" />
          </div>

          <div className="flex flex-row gap-3 w-full mt-4">
            <button className="button-secondary flex-1" onClick={() => setShowModalUser(false)}>
              Batal
            </button>
            <button className="button-primary flex-1" onClick={onSubmitUser}>
              Simpan
            </button>
          </div>
        </div>
      </ModalCustom>

      <div className="bg-white flex-col border-t-4 border-primary rounded-lg w-full p-6 flex justify-center gap-6 overflow-auto ">
        <div className="lg:text-4xl text-lg text-center">Data User</div>
        <TableCustom columns={column} data={data} />
        <div
          className="rounded-full w-20 h-20 flex items-center justify-center bg-primary absolute right-10 bottom-10 cursor-pointer"
          onClick={() => setShowModalUser(true)}
        >
          <PlusIcon className="w-10 h-10 text-white" />
        </div>
      </div>
    </>
  );
}
