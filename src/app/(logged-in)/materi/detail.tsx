"use client";

import LoadingStore from "@/app/store/loadingStore";
import InputCustom from "@/components/inputCustom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DetailMateri({ id, handleChangeTab }: { id: any; handleChangeTab: (tab: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [komen, setKomen] = useState<string>("");
  const [data, setData] = useState<any>({
    nama: "Modul 1",
    isi: "<p>Isi Modul</p>",
    komen: [
      { nama: "siswa1", komen: "komen siswa 1" },
      { nama: "siswa1", komen: "komen siswa 1" },
      { nama: "siswa1", komen: "komen siswa 1" },
    ],
  });

  const onSubmit = () => {
    setKomen("");
    toast.success("Komentar berhasil disimpan");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
        <div className="flex flex-row gap-2 justify-center items-center relative">
          <ArrowLeftIcon className="w-8 h-8 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="text-4xl">{data?.nama}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.isi }} className="text-gray-800 " />
      </div>
      <div className="bg-white rounded-lg w-full p-4 flex flex-col gap-2">
        {data?.komen?.map((item: any, index: number) => (
          <div className="flex flex-row gap-1 items-center">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">{item?.nama}</div>
              <div className="text-sm">{item?.komen}</div>
            </div>
          </div>
        ))}
        <div className="flex flex-row gap-3">
          <InputCustom value={komen} placeholder="Tulis komentar anda" onChange={(evt) => setKomen(evt)} className="flex-1" />
          <button className="button-primary" disabled={!komen} onClick={onSubmit}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
