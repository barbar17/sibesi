"use client";

import LoadingStore from "@/store/loadingStore";
import InputCustom from "@/components/inputCustom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function DetailPR({ handleChangeTab, id }: { handleChangeTab: (tab: number) => void; id: number }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tugas, setTugas] = useState<any>();
  const [komen, setKomen] = useState<string>("");
  const [data, setData] = useState<any>({
    nama: "Tugas 1",
    isi: "<p>Isi Tugas1</p>",
    deadline: "2025-09-01",
    waktuSubmit: "2025-09-02",
    catatan: "Catatan",
    // tugas: "https://google.com",
    komen: [
      { nama: "siswa1", komen: "komen siswa 1" },
      { nama: "siswa1", komen: "komen siswa 1" },
      { nama: "siswa1", komen: "komen siswa 1" },
    ],
  });

  const handleFile = (evt: any) => {
    setTugas(evt.target.files?.[0]);
    fileRef.current!.value = "";
  };

  const onSubmitKomentar = () => {
    setKomen("");
    toast.success("Komentar berhasil disimpan");
  };

  const onSubmit = () => {
    toast.success("Tugas berhasil disimpan");
    handleChangeTab(1);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <input type="file" ref={fileRef} onChange={handleFile} className="hidden" />

      <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
        <div className="flex flex-row gap-2 justify-center items-center relative">
          <ArrowLeftIcon className="w-8 h-8 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="text-4xl">{data?.nama}</div>
        </div>
        <div className="w-full flex gap-3">
          <div className="flex flex-1">
            <div dangerouslySetInnerHTML={{ __html: data?.isi }} className="text-gray-800" />
          </div>
          <div className="flex flex-col justify-between gap-6 w-[250px]">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="underline text-blue-600 cursor-pointer">Nama Tugas</div>
              </div>
              <button className="button-secondary w-fit" onClick={() => fileRef.current?.click()}>
                {data?.tugas ? "Upload Ulang" : `Upload Tugas`}
              </button>
              <div>
                <span className="font-semibold">Tenggat waktu: </span>
                {dayjs(data?.deadline).format("DD MMMM YYYY")}
              </div>
              <div>
                <span className="font-semibold">Catatan: </span>
                {data?.catatan}
              </div>
            </div>

            {/* <button className="button-primary" disabled={!tugas} onClick={onSubmit}>
              Simpan Tugas
            </button> */}

            <button className="button-primary" onClick={() => handleChangeTab(4)}>
              Lihat Tugas Siswa
            </button>
          </div>
        </div>
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
          <button className="button-primary" disabled={!komen} onClick={onSubmitKomentar}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
