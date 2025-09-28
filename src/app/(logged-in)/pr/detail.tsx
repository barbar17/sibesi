"use client";

import LoadingStore from "@/store/loadingStore";
import InputCustom from "@/components/inputCustom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import ApiRoute from "@/api/apiRoute";
import ProfileStore from "@/store/profileStore";

export default function DetailPR({ handleChangeTab, id }: { handleChangeTab: (tab: number, id?: number) => void; id: number }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tugas, setTugas] = useState<any>();
  const [komen, setKomen] = useState<string>("");
  const [data, setData] = useState<any>();
  const [dataTugas, setDataTugas] = useState<any>();

  const handleFile = (evt: any) => {
    setLoading(true);
    ApiRoute.postFileTugas({ file: evt.target.files?.[0] })
      .then((res) => {
        setTugas(res?.url);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
    fileRef.current!.value = "";
  };

  const onSubmitKomentar = () => {
    let temp = {
      comment_id: data?.comments_id?.toString(),
      user_id: isProfile?.user_id,
      isi: komen,
    };

    setLoading(true);
    ApiRoute.postKomen(temp)
      .then((res) => {
        toast.success("Komentar berhasil disimpan");
        fetchData();
        setKomen("");
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  const fetchData = () => {
    setLoading(true);
    ApiRoute.getTugas(`/${id}`)
      .then((res) => {
        if (isProfile?.role === "siswa") {
          ApiRoute.getTugas(`/${id}/${isProfile?.user_id}`)
            .then((res) => {
              setDataTugas(res);
              setLoading(false);
            })
            .catch((err) => {
              setDataTugas(null);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
        setData(res);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
    setLoading(false);
  };

  const onSubmit = () => {
    setLoading(true);
    let temp = {
      user_id: isProfile?.user_id,
      created_by: isProfile?.nama_user,
      status_deadline: dayjs() > dayjs(data?.deadline) ? 1 : 0,
      file_url: tugas,
      tanggal_submit: dayjs().format("YYYY-MM-DD HH:mm:00"),
    };

    ApiRoute.postTugas(temp, `/${id}`)
      .then((res) => {
        toast.success("Tugas berhasil disimpan");
        handleChangeTab(1);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <input type="file" ref={fileRef} onChange={handleFile} className="hidden" />

      <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4">
        <div className="flex flex-row gap-2 justify-center items-center relative">
          <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="lg:text-4xl text-xl">{data?.nama}</div>
        </div>
        <div className="w-full flex gap-3 lg:flex-row flex-col">
          <div className="flex flex-1">
            <div dangerouslySetInnerHTML={{ __html: data?.isi }} className="text-gray-800" />
          </div>
          <div className="flex flex-col justify-between gap-6 lg:w-[300px] w-full">
            <div className="flex flex-col gap-2">
              {isProfile?.role === "siswa" && (
                <>
                  {(tugas || dataTugas) && (
                    <div className="flex flex-col">
                      <div className="underline text-blue-600 cursor-pointer" onClick={() => window.open(tugas ? tugas : dataTugas?.file_url)}>
                        {tugas ? tugas.split("/")[tugas.split("/").length - 1] : dataTugas.file_url.split("/")[dataTugas.file_url.split("/").length - 1]}
                      </div>
                    </div>
                  )}
                  <button className="button-secondary w-fit" onClick={() => fileRef.current?.click()}>
                    {dataTugas ? "Upload Ulang" : `Upload Tugas`}
                  </button>
                </>
              )}
              <div>
                <span className="font-semibold">Tenggat waktu: </span>
                {dayjs(data?.deadline).format("DD MMMM YYYY HH:mm")}
              </div>
              {dataTugas && (
                <>
                  <div>
                    <span className="font-semibold">Catatan: </span>
                    {dataTugas?.catatan}
                  </div>
                  <div>
                    <span className="font-semibold">Nilai: </span>
                    {dataTugas?.nilai ? dataTugas?.nilai : ""}
                  </div>
                </>
              )}
            </div>

            {isProfile?.role === "siswa" ? (
              <button className={`button-primary ${dataTugas?.nilai && "!hidden"}`} disabled={!tugas} onClick={onSubmit}>
                Simpan Tugas
              </button>
            ) : (
              <button className="button-primary" onClick={() => handleChangeTab(4, id)}>
                Lihat Tugas Siswa
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg w-full p-4 flex flex-col gap-2">
        {data?.comments?.map((item: any, index: number) => (
          <div className="flex flex-row gap-1 items-center">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">{item?.nama_user}</div>
              <div className="text-sm">{item?.isi}</div>
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
