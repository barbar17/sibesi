"use client";

import InputCustom from "@/components/inputCustom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DetailKuis({ handleChangeTab, id }: { handleChangeTab: (tab: number) => void; id: number }) {
  const [data, setData] = useState<any>({
    nama: "Tugas 1",
    menit: 0,
    detik: 5,
    soal: [
      { soal: "<p>Isi Tugas1</p>", id: 1, tipe: 1, option: ["a", "b", "c", "d"] },
      { soal: "<p>Isi Tugas2</p>", id: 2, tipe: 2 },
    ],
  });
  const [time, setTime] = useState<number>(-1);
  const [jawaban, setJawaban] = useState<any[]>([]);
  const [nilai, setNilai] = useState<string>("");

  const handleJawaban = (value: any, id: number) => {
    let temp = [...jawaban];

    temp.forEach((item: any) => {
      if (item.id === id) {
        item.jawaban = value;
      }
    });

    setJawaban(temp);
  };

  const onSubmit = () => {
    toast.success("Kuis berhasil disimpan");
    handleChangeTab(1);
  };

  useEffect(() => {
    setTime(data?.menit * 60 + data?.detik);
    let temp = [...data?.soal];
    let tempJawaban: any[] = [];

    temp.forEach((item: any) => {
      tempJawaban.push({ id: item?.id });
    });

    setJawaban(tempJawaban);
  }, [data]);

  // useEffect(() => {
  //   if (time === 0) {
  //     onSubmit();
  //   }

  //   const interval = setInterval(() => {
  //     setTime((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [time]);

  return (
    <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4 overflow-auto">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 justify-center items-center relative">
          <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="lg:text-4xl text-xl">{data?.nama}</div>
        </div>
        <div className="flex w-full justify-end">
          {parseInt((time / 60).toString())}:{time % 60}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data?.soal?.map((item: any, index: number) => (
          <div key={index} className="flex flex-col lg:flex-row shadow-sm rounded-sm gap-6 border-gray-300 border p-4 justify-between">
            <div dangerouslySetInnerHTML={{ __html: item?.soal }} />
            <div className="w-full lg:w-[300px] flex flex-col gap-2">
              {item?.tipe === 1 ? (
                <div className="flex flex-col gap-1">
                  {item?.option?.map((itemOption: any, indexOption: number) => (
                    <div className="flex gap-1" key={indexOption}>
                      <input type="radio" name={item.id} onChange={() => handleJawaban(itemOption, item.id)} />
                      {itemOption}
                    </div>
                  ))}
                </div>
              ) : (
                <textarea className="input-text" placeholder="Isi jawaban disini" onChange={(evt) => handleJawaban(evt.target.value, item.id)} />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <button className="button-primary" onClick={onSubmit}>
        Simpan
      </button> */}

      <button className="button-primary" onClick={() => handleChangeTab(4)}>
        Lihat Kuis Siswa
      </button>

      <div className="flex gap-2">
        <InputCustom onChange={(value) => setNilai(value)} placeholder="Nilai" value={nilai} />
        <button className="button-primary" onClick={() => handleChangeTab(4)}>
          Simpan
        </button>
      </div>
    </div>
  );
}
