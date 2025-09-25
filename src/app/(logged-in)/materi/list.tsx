"use client";

import LoadingStore from "@/app/store/loadingStore";
import CollapseCustom from "@/components/collapseCustom";
import { useEffect, useState } from "react";

export default function ListMateri({ handleChangeTab }: { handleChangeTab: (tab: number, id?: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);

  const [data, setData] = useState<any[]>([
    {
      id: 1,
      nama: "Matematika",
      modul: [
        { nama: "modul1", id: 1 },
        { nama: "modul2", id: 2 },
        { nama: "modul3", id: 3 },
        { nama: "modul4", id: 4 },
      ],
    },
    {
      id: 2,
      nama: "Matematika",
      modul: [
        { nama: "modul1", id: 1 },
        { nama: "modul2", id: 2 },
        { nama: "modul3", id: 3 },
        { nama: "modul4", id: 4 },
      ],
    },
    {
      id: 3,
      nama: "Matematika",
      modul: [
        { nama: "modul1", id: 1 },
        { nama: "modul2", id: 2 },
        { nama: "modul3", id: 3 },
        { nama: "modul4", id: 4 },
      ],
    },
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
      <CollapseCustom data={data} namaId="id" namaKonten="modul" namaIdDetail="id" onDetail={(id) => handleChangeTab(2, id)} onAdd={() => handleChangeTab(3)} />
    </div>
  );
}
