"use client";

import LoadingStore from "@/store/loadingStore";
import InputCustom from "@/components/inputCustom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiRoute from "@/api/apiRoute";
import ProfileStore from "@/store/profileStore";

export default function DetailMateri({ id, handleChangeTab }: { id: any; handleChangeTab: (tab: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const [komen, setKomen] = useState<string>("");
  const [data, setData] = useState<any>();

  const onSubmit = () => {
    let temp = {
      comment_id: data?.comment_id?.toString(),
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
    ApiRoute.getMateri(`/${id}`)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4">
        <div className="flex flex-row gap-2 justify-center items-center relative">
          <ArrowLeftIcon className="lg:w-8 lg:h-8 w-6 h-6 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="lg:text-4xl text-xl">{data?.nama}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.isi }} className="text-gray-800 " />
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
          <button className="button-primary" disabled={!komen} onClick={onSubmit}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
