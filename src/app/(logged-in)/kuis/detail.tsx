"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DetailKuis({ handleChangeTab, id }: { handleChangeTab: (tab: number, id?: number) => void; id: number }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const [data, setData] = useState<any>();
  const [time, setTime] = useState<number>(-1);
  const [jawaban, setJawaban] = useState<any[]>([]);
  const [nilai, setNilai] = useState<string>("");

  const handleJawaban = (value: any, id: number) => {
    let temp = [...jawaban];

    temp.forEach((item: any) => {
      if (item.quiz_soal_id === id) {
        item.jawaban = value;
      }
    });

    setJawaban(temp);
  };

  const onSubmit = () => {
    setLoading(true);
    ApiRoute.postKuis(jawaban, `/${id}/siswa/${isProfile?.user_id}`)
      .then((res) => {
        toast.success("Kuis berhasil disimpan");
        handleChangeTab(1);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    ApiRoute.getKuis(`/${id}`)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (data) {
      setTime(data?.time);

      let temp = [...data?.kuis];
      let tempJawaban: any[] = [];

      temp.forEach((item: any) => {
        tempJawaban.push({ quiz_soal_id: item?.quiz_soal_id });
      });

      setJawaban(tempJawaban);
    }
  }, [data]);

  useEffect(() => {
    if (isProfile?.role === "siswa") {
      if (time === 0) {
        onSubmit();
      }

      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, isProfile]);

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
        {data?.kuis?.map((item: any, index: number) => (
          <div key={index} className="flex flex-col lg:flex-row shadow-sm rounded-sm gap-6 border-gray-300 border p-4 justify-between">
            <div dangerouslySetInnerHTML={{ __html: item?.soal }} />
            <div className="w-full lg:w-[300px] flex flex-col gap-2">
              {item?.tipe === "pg" ? (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" && (
                      <input type="radio" name={item.quiz_soal_id} onChange={() => handleJawaban(item?.pilihan_1, item.quiz_soal_id)} />
                    )}
                    {item?.pilihan_1}
                  </div>
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" && (
                      <input type="radio" name={item.quiz_soal_id} onChange={() => handleJawaban(item?.pilihan_2, item.quiz_soal_id)} />
                    )}

                    {item?.pilihan_2}
                  </div>
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" && (
                      <input type="radio" name={item.quiz_soal_id} onChange={() => handleJawaban(item?.pilihan_3, item.quiz_soal_id)} />
                    )}
                    {item?.pilihan_3}
                  </div>
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" && (
                      <input type="radio" name={item.quiz_soal_id} onChange={() => handleJawaban(item?.pilihan_4, item.quiz_soal_id)} />
                    )}
                    {item?.pilihan_4}
                  </div>
                </div>
              ) : (
                <textarea className="input-text" placeholder="Isi jawaban disini" onChange={(evt) => handleJawaban(evt.target.value, item.id)} />
              )}
            </div>
          </div>
        ))}
      </div>

      {isProfile?.role === "siswa" ? (
        <button className="button-primary" onClick={onSubmit}>
          Simpan
        </button>
      ) : (
        <>
          <button className="button-primary" onClick={() => handleChangeTab(4, id)}>
            Lihat Kuis Siswa
          </button>

          {/* <div className="flex gap-2">
            <InputCustom onChange={(value) => setNilai(value)} placeholder="Nilai" value={nilai} />
            <button className="button-primary" onClick={() => handleChangeTab(4)}>
              Simpan
            </button>
          </div> */}
        </>
      )}
    </div>
  );
}
