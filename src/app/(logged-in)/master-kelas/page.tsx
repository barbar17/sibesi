"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import ModalCustom from "@/components/modalCustom";
import TableCustom from "@/components/tableCustom";
import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Kelas() {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const [data, setData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();

  const column: any[] = [
    { title: "No", cell: "no" },
    { title: "Kelas", cell: "nama_kelas" },
    {
      title: "Action",
      cell: (row: any) => (
        <div className="button-secondary !border-red-700 w-8 h-8 !p-0" onClick={() => onDelete(row?.id)}>
          <TrashIcon className="w-4 h-4 text-red-700" />
        </div>
      ),
    },
  ];

  const fetchData = () => {
    if (isProfile?.role) {
      setLoading(true);
      ApiRoute.getKelasMapel(`?mapel=${isProfile?.mapel_id}`)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
  };

  const onDelete = (id: number) => {
    setLoading(true);
    ApiRoute.deleteKelasMapel(`/${id}`)
      .then(() => {
        toast.success("Kelas berhasil dihapus");
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const onSubmit = () => {
    setLoading(true);
    ApiRoute.postKelas(formData)
      .then(() => {
        toast.success("Kelas berhasil ditambahkan");
        setShowModal(false);
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isProfile]);

  useEffect(() => {
    setFormData({});
  }, [showModal]);

  return (
    <>
      <ModalCustom isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="w-[120px] flex-shrink-0">Nama Kelas</div>
            <InputCustom
              value={formData?.nama_kelas}
              onChange={(evt) => setFormData({ ...formData, nama_kelas: evt })}
              placeholder="Nama Kelas"
              className="w-full"
            />
          </div>

          <div className="flex flex-row gap-3 w-full mt-4">
            <button className="button-secondary flex-1" onClick={() => setShowModal(false)}>
              Batal
            </button>
            <button className="button-primary flex-1" onClick={onSubmit}>
              Simpan
            </button>
          </div>
        </div>
      </ModalCustom>

      <div className="bg-white flex-col border-t-4 border-primary rounded-lg w-full p-6 flex justify-center gap-6 overflow-auto">
        <div className="lg:text-4xl text-lg font-bold text-start">Modul Master Kelas</div>
        <TableCustom columns={column} data={data} />
        <div
          className="rounded-full w-20 h-20 flex items-center justify-center bg-primary absolute right-10 bottom-10 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon className="w-10 h-10 text-white" />
        </div>
      </div>
    </>
  );
}
