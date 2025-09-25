"use client";

import InputCustom from "@/components/inputCustom";
import RichTextEditor from "@/components/richTextEditor";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddPR({ handleChangeTab }: { handleChangeTab: (tab: number) => void }) {
  const [form, setForm] = useState<any>({});
  const [clearRTE, setClearRTE] = useState<boolean>(false);

  const onSubmit = () => {
    toast.success("Pekerjaan rumah berhasil ditambahkan");
    handleChangeTab(1);
  };

  useEffect(() => {
    setClearRTE(!clearRTE);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
      <div className="flex justify-center items-center relative">
        <ArrowLeftIcon className="w-8 h-8 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
        <div className="text-4xl">Tambah Tugas</div>
      </div>
      <div className="flex gap-3">
        <InputCustom value={form?.judul} placeholder="Masukkan judul modul" onChange={(evt) => setForm({ ...form, judul: evt })} className="flex-1" />
        <button className="button-primary" disabled={!form?.konten || !form?.judul || !form?.deadline} onClick={onSubmit}>
          Simpan
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-[16px]">Tenggat waktu:</div>
        <input type="date" value={form?.deadline} onChange={(evt) => setForm({ ...form, deadline: evt.target.value })} className="input-text" />
      </div>
      <div>
        <RichTextEditor value={form?.konten} handleChange={(evt) => setForm({ ...form, konten: evt })} isClear={clearRTE} />
      </div>
    </div>
  );
}
