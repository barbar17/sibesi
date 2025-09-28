"use client";

import { OptionInterface } from "@/types/optionInterface";
import InputCustom from "@/components/inputCustom";
import RichTextEditor from "@/components/richTextEditor";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "@/components/Dropdown";

export default function AddKuis({ handleChangeTab }: { handleChangeTab: (tab: number) => void }) {
  const [form, setForm] = useState<any>({});
  const [soal, setSoal] = useState<any[]>([{}]);
  const pilihanGanda = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
  ];
  const option = [
    { label: "Pilihan Ganda", value: 1 },
    { label: "Essay", value: 2 },
  ];

  const handleSoal = (evt: any, index: number, tipe: string) => {
    let temp = [...soal];
    temp.forEach((item: any, i: number) => {
      if (i === index) {
        item[tipe] = evt;
      }
    });

    setSoal(temp);
  };

  const handleTime = (value: string, tipe: string, max: number) => {
    let valueNumber = parseFloat(value);
    if (value === "" || (valueNumber >= 0 && valueNumber <= max)) {
      setForm({ ...form, [tipe]: valueNumber });
    }
  };

  const tambahSoal = () => {
    let temp = [...soal];
    temp.push({});
    setSoal(temp);
  };

  const onSubmit = () => {
    toast.success("Kuis berhasil ditambahkan");
    handleChangeTab(1);
  };

  return (
    <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4 overflow-auto">
      <div className="flex justify-center items-center relative">
        <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6  cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
        <div className="lg:text-4xl text-xl">Tambah Kuis</div>
      </div>
      <div className="flex gap-3">
        <InputCustom value={form?.judul} placeholder="Masukkan judul modul" onChange={(evt) => setForm({ ...form, judul: evt })} className="flex-1" />
        <button className="button-primary" disabled={!form?.judul || !form?.menit || !form?.detik} onClick={onSubmit}>
          Simpan
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <div className="text-[16px]">Waktu</div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            className="input-text w-[50px] !p-2"
            value={form?.menit}
            placeholder="00"
            onChange={(evt) => handleTime(evt.target.value, "menit", 100)}
            min={0}
            max={100}
          />
          <div>:</div>
          <input
            type="number"
            className="input-text w-[50px] !p-2"
            value={form?.detik}
            onChange={(evt) => handleTime(evt.target.value, "detik", 60)}
            placeholder="00"
            max={60}
            min={0}
          />
        </div>
      </div>

      {soal?.map((item: any, index: number) => (
        <div key={index} className="flex lg:flex-row flex-col shadow-xl gap-6 border-gray-300 border p-4 justify-between relative">
          <RichTextEditor jenis="kuis" value={item?.soal} handleChange={(evt) => handleSoal(evt, index, "soal")} />
          <div className="flex flex-col gap-3 w-[300px]">
            <div className="flex flex-row gap-4 items-center">
              <div className="whitespace-nowrap font-semibold">Tipe Soal</div>
              <div className="lg:w-[170px] w-[150px]">
                <Dropdown placeholder="Tipe" options={option} value={item?.tipe} handleOnChange={(evt) => handleSoal(evt, index, "tipe")} width="100%" />
              </div>
            </div>
            {item.tipe?.value === 1 && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  A <input className="input-text" />
                </div>
                <div className="flex gap-1 items-center">
                  B <input className="input-text" />
                </div>
                <div className="flex gap-1 items-center">
                  C <input className="input-text" />
                </div>
                <div className="flex gap-1 items-center">
                  D <input className="input-text" />
                </div>
                <div className="flex gap-1 items-center mt-2">
                  <span className="font-semibold">Jawaban</span>
                  <Dropdown placeholder="Jawaban" options={pilihanGanda} value={item?.jawaban} handleOnChange={(evt) => handleSoal(evt, index, "jawaban")} />
                </div>
              </div>
            )}
          </div>
          {index === soal?.length - 1 && (
            <div className="w-8 h-8 rounded-full bg-primary flex justify-center items-center absolute bottom-4 right-4 cursor-pointer" onClick={tambahSoal}>
              <PlusIcon className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
