"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DetailKuis({
  handleChangeTab,
  id,
  idSiswa,
  idKuisSiswa,
}: {
  handleChangeTab: (tab: number, id?: number) => void;
  id: number;
  idSiswa: number;
  idKuisSiswa: number;
}) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const [data, setData] = useState<any>();
  const [time, setTime] = useState<number>(-1);
  const [jawaban, setJawaban] = useState<any[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);
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
    let temp: any[] = [];
    jawaban?.forEach((item: any) => {
      temp.push({ jawaban: item?.jawaban, quiz_soal_id: item.quiz_soal_id });
    });

    ApiRoute.postKuis(temp, `/${id}/siswa/${isProfile?.user_id}`)
      .then((res) => {
        toast.success("Kuis berhasil disimpan");
        handleChangeTab(1);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const onSubmitNilai = () => {
    let temp = { nilai: parseInt(nilai) };

    setLoading(true);
    ApiRoute.postKuis(temp, `/nilai/${idKuisSiswa}`)
      .then(() => {
        handleChangeTab(4, id);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([ApiRoute.getKuis(`/${id}`), ApiRoute.getKuis(`/${id}/siswa/${idSiswa ? idSiswa : isProfile?.user_id}/jawaban`)])
      .then((res) => {
        if (res[1]?.length === 0 || !res) {
          setData(res[0]);
        } else {
          setData({ ...res[0], kuis: res[1] });
          setIsDone(true);
        }

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
        tempJawaban.push({ ...item });
      });

      setJawaban(tempJawaban);
    }
  }, [data]);

  useEffect(() => {
    if (isProfile?.role === "siswa" && !isDone) {
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
        {jawaban?.map((item: any, index: number) => (
          <div key={index} className="flex flex-col lg:flex-row shadow-sm rounded-sm gap-6 border-gray-300 border p-4 justify-between">
            <div dangerouslySetInnerHTML={{ __html: item?.soal }} />
            <div className="w-full lg:w-[300px] flex flex-col gap-2">
              {item?.tipe === "pg" ? (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" || idSiswa ? (
                      <input
                        type="radio"
                        checked={item?.jawaban === item?.pilihan_1}
                        name={item.quiz_soal_id}
                        onChange={() => handleJawaban(item?.pilihan_1, item.quiz_soal_id)}
                        disabled={isDone}
                      />
                    ) : (
                      <></>
                    )}
                    {item?.pilihan_1}
                  </div>
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" || idSiswa ? (
                      <input
                        type="radio"
                        checked={item?.jawaban === item?.pilihan_2}
                        name={item.quiz_soal_id}
                        onChange={() => handleJawaban(item?.pilihan_2, item.quiz_soal_id)}
                        disabled={isDone}
                      />
                    ) : (
                      <></>
                    )}

                    {item?.pilihan_2}
                  </div>
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" || idSiswa ? (
                      <input
                        type="radio"
                        checked={item?.jawaban === item?.pilihan_3}
                        name={item.quiz_soal_id}
                        onChange={() => handleJawaban(item?.pilihan_3, item.quiz_soal_id)}
                        disabled={isDone}
                      />
                    ) : (
                      <></>
                    )}
                    {item?.pilihan_3}
                  </div>
                  <div className="flex gap-1">
                    {isProfile?.role === "siswa" || idSiswa ? (
                      <input
                        type="radio"
                        checked={item?.jawaban === item?.pilihan_4}
                        name={item.quiz_soal_id}
                        onChange={() => handleJawaban(item?.pilihan_4, item.quiz_soal_id)}
                        disabled={isDone}
                      />
                    ) : (
                      <></>
                    )}
                    {item?.pilihan_4}
                  </div>

                  {isProfile?.role === "guru" && idSiswa ? (
                    <div>
                      <span className="font-semibold">Kunci Jawaban:</span>
                      {item?.kunci_jawaban}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <textarea
                  className={`input-text h-[100px] ${isProfile?.role === "siswa" || idSiswa ? "flex" : "!hidden"}`}
                  value={item?.jawaban}
                  placeholder="Isi jawaban disini"
                  onChange={(evt) => handleJawaban(evt.target.value, item.quiz_soal_id)}
                  disabled={isDone}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {isProfile?.role === "siswa" ? (
        isDone ? (
          <div>
            <span className="font-semibold">Nilai: {jawaban[0]?.nilai_quiz}</span>
          </div>
        ) : (
          <button className={`button-primary`} onClick={onSubmit}>
            Simpan
          </button>
        )
      ) : idSiswa ? (
        <div className="flex gap-2 items-center">
          <div className="font-semibold">Nilai</div>
          <InputCustom type="number" onChange={(value) => setNilai(value)} placeholder="Nilai" value={nilai} />
          <button className="button-primary" onClick={onSubmitNilai}>
            Simpan
          </button>
        </div>
      ) : (
        <button className="button-primary" onClick={() => handleChangeTab(4, id)}>
          Lihat Kuis Siswa
        </button>
      )}
    </div>
  );
}
