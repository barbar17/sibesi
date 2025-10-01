"use client";

import LoadingStore from "@/store/loadingStore";
import CollapseCustom from "@/components/collapseCustom";
import { useEffect, useState } from "react";
import ProfileStore from "@/store/profileStore";
import ApiRoute from "@/api/apiRoute";
import { toast } from "react-toastify";

export default function ListPR({ handleChangeTab }: { handleChangeTab: (tab: number, id?: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (isProfile?.role) {
      setLoading(true);
      ApiRoute.getTugas(isProfile?.role === "siswa" ? `?kelas=${isProfile?.kelas_id}` : `/guru?mapel=${isProfile?.mapel_id}`)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
  }, [isProfile]);

  return (
    <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4">
      <div className="lg:text-4xl text-lg font-bold text-start">Modul PR</div>
      <CollapseCustom
        data={data}
        namaId="id"
        namaKonten="tugas"
        namaIdDetail="id"
        onDetail={(id) => handleChangeTab(2, id)}
        onAdd={(id) => handleChangeTab(3, id)}
      />
    </div>
  );
}
