"use client";

import LoadingStore from "@/app/store/loadingStore";
import CollapseCustom from "@/components/collapseCustom";
import { useEffect, useState } from "react";

export default function Materi() {
  const setLoading = LoadingStore((state) => state.setLoading);

  const [data, setData] = useState<any[]>([
    { id: 1, nama: "Matematika", modul: [{ nama: "modul1" }, { nama: "modul2" }, { nama: "modul3" }, { nama: "modul4" }] },
    { id: 2, nama: "Matematika", modul: [{ nama: "modul1" }, { nama: "modul2" }, { nama: "modul3" }, { nama: "modul4" }] },
    { id: 3, nama: "Matematika", modul: [{ nama: "modul1" }, { nama: "modul2" }, { nama: "modul3" }, { nama: "modul4" }] },
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-6 flex flex-col gap-4">
      <CollapseCustom data={data} namaId="id" namaKonten="modul" />
    </div>
  );
}
