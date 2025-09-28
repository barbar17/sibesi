"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import RichTextEditor from "@/components/richTextEditor";
import LoadingStore from "@/store/loadingStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddMateri({ handleChangeTab, id }: { handleChangeTab: (tab: number) => void; id: number }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [form, setForm] = useState<any>({});
  const [clearRTE, setClearRTE] = useState<boolean>(false);

  const onSubmit = () => {
    let temp = { ...form, mapel_id: id };
    ApiRoute.postMateri(temp)
      .then((res) => {
        toast.success("Modul berhasil ditambahkan");
        handleChangeTab(1);
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
    <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4">
      <div className="flex justify-center items-center relative">
        <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
        <div className="lg:text-4xl text-xl">Tambah Materi</div>
      </div>
      <div className="flex gap-3">
        <InputCustom value={form?.nama} placeholder="Masukkan judul modul" onChange={(evt) => setForm({ ...form, nama: evt })} className="flex-1" />
        <button className="button-primary" disabled={!form?.isi || !form?.nama} onClick={onSubmit}>
          Simpan
        </button>
      </div>
      <div>
        <RichTextEditor jenis="materi" value={form?.isi} handleChange={(evt) => setForm({ ...form, isi: evt })} isClear={clearRTE} />
      </div>
    </div>
  );
}
