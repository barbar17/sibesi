"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import RichTextEditor from "@/components/richTextEditor";
import LoadingStore from "@/store/loadingStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddPR({ handleChangeTab, id }: { handleChangeTab: (tab: number) => void; id: number }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [form, setForm] = useState<any>({});
  const [clearRTE, setClearRTE] = useState<boolean>(false);

  const onSubmit = () => {
    let temp = { ...form, mapel_id: id, deadline: dayjs(form?.deadline).format("YYYY-MM-DD HH:mm:00") };

    setLoading(true);
    ApiRoute.postTugas(temp)
      .then((res) => {
        toast.success("Pekerjaan rumah berhasil ditambahkan");
        handleChangeTab(1);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setClearRTE(!clearRTE);
  }, []);

  return (
    <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4 overflow-auto">
      <div className="flex justify-center items-center relative">
        <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
        <div className="lg:text-4xl text-xl">Tambah Tugas</div>
      </div>
      <div className="flex gap-3">
        <InputCustom value={form?.nama} placeholder="Masukkan judul modul" onChange={(evt) => setForm({ ...form, nama: evt })} className="flex-1" />
        <button className="button-primary" disabled={!form?.isi || !form?.nama || !form?.deadline} onClick={onSubmit}>
          Simpan
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-[16px]">Tenggat waktu:</div>
        <input type="datetime-local" value={form?.deadline} onChange={(evt) => setForm({ ...form, deadline: evt.target.value })} className="input-text" />
      </div>
      <div>
        <RichTextEditor jenis="tugas" value={form?.isi} handleChange={(evt) => setForm({ ...form, isi: evt })} isClear={clearRTE} />
      </div>
    </div>
  );
}
