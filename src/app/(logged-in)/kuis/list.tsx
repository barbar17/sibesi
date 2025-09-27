"use client";

import LoadingStore from "@/store/loadingStore";
import CollapseCustom from "@/components/collapseCustom";
import { useEffect, useState } from "react";

export default function ListKuis({ handleChangeTab }: { handleChangeTab: (tab: number, id?: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);

  const [data, setData] = useState<any[]>([
    {
      id: 1,
      nama: "Matematika",
      kuis: [
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
      ],
    },
    {
      id: 2,
      nama: "Matematika",
      kuis: [
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
      ],
    },
    {
      id: 3,
      nama: "Matematika",
      kuis: [
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
        { nama: "kuis1", id: 1 },
      ],
    },
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
      <CollapseCustom data={data} namaId="id" namaKonten="kuis" namaIdDetail="id" onDetail={(id) => handleChangeTab(2, id)} onAdd={() => handleChangeTab(3)} />
    </div>
  );
}
