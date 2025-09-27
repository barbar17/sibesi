"use client";

import InputCustom from "@/components/inputCustom";
import ModalCustom from "@/components/modalCustom";
import TableCustom from "@/components/tableCustom";
import { ArrowDownTrayIcon, ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ListPRDone({ handleChangeTab, id }: { handleChangeTab: (tab: number) => void; id: number }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<any>({});
  const [data, setData] = useState<any>({
    nama: "Tugas 1",
    data: [
      { nama: "Siswa 1", id: 1 },
      { nama: "Siswa 1", id: 1 },
      { nama: "Siswa 1", id: 1, nilai: 80 },
      { nama: "Siswa 1", id: 1 },
      { nama: "Siswa 1", id: 1 },
      { nama: "Siswa 1", id: 1 },
      { nama: "Siswa 1", id: 1 },
    ],
    page: 1,
    page_size: 10,
    total: 20,
    total_page: 2,
  });

  const column = [
    { title: "Nama", cell: "nama" },
    {
      title: "Action",
      cell: (row: any) => (
        <div className="flex gap-3 items-center justify-center">
          <div className="button-secondary w-8 h-8 !p-0">
            <ArrowDownTrayIcon className="w-4 h-4" />
          </div>
          {row?.nilai ? (
            <div className="text-[16px] font-medium">{row?.nilai}</div>
          ) : (
            <div className="button-secondary w-8 h-8 !p-0" onClick={() => setShowModal(true)}>
              <PencilIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      ),
    },
  ];

  const onSubmit = () => {
    setShowModal(false);
    toast.success("Nilai berhasil ditambahkan");
  };

  useEffect(() => {
    setForm({});
  }, [showModal]);

  return (
    <>
      <ModalCustom isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-[70px] flex-shrink-0">Nilai</div>
              <InputCustom value={form?.nilai} onChange={(evt) => setForm({ ...form, nilai: evt })} placeholder="Masukkan nilai" className="min-w-0" />
            </div>
            <div className="flex items-center">
              <div className="w-[70px] flex-shrink-0">Catatan</div>
              <textarea
                value={form?.catatan}
                className="input-text"
                onChange={(evt) => setForm({ ...form, catatan: evt.target.value })}
                placeholder="Masukkan catatan"
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full">
            <button className="button-secondary flex-1" onClick={() => setShowModal(false)}>
              Batal
            </button>
            <button className="button-primary flex-1" disabled={!form?.nilai} onClick={onSubmit}>
              Simpan
            </button>
          </div>
        </div>
      </ModalCustom>

      <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
        <div className="flex justify-center items-center relative">
          <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="lg:text-4xl text-xl">{data?.nama}</div>
        </div>
        <TableCustom columns={column} data={data?.data} page={data?.page} page_size={data?.page_size} total={data?.total} total_page={data?.total_page} />
      </div>
    </>
  );
}
