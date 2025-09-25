"use client";

import LoadingStore from "@/app/store/loadingStore";
import CollapseCustom from "@/components/collapseCustom";
import { useEffect, useState } from "react";

export default function ListPR({ handleChangeTab }: { handleChangeTab: (tab: number, id?: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);

  const [data, setData] = useState<any[]>([
    {
      id: 1,
      nama: "Matematika",
      tugas: [
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
      ],
    },
    {
      id: 2,
      nama: "Matematika",
      tugas: [
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
      ],
    },
    {
      id: 3,
      nama: "Matematika",
      tugas: [
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
        { nama: "Tugas1", id: 1 },
      ],
    },
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
      <CollapseCustom data={data} namaId="id" namaKonten="tugas" namaIdDetail="id" onDetail={(id) => handleChangeTab(2, id)} onAdd={() => handleChangeTab(3)} />
    </div>
  );
}
