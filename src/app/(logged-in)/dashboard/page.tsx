"use client";

import LoadingStore from "@/app/store/loadingStore";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const setLoading = LoadingStore((state) => state.setLoading);

  const [data, setData] = useState<any[]>([
    { nama: "Matematika", kelas: "11", guru: "Pak Guru A", modulSelesai: 9, totalModul: 9 },
    { nama: "Matematika", kelas: "11", guru: "Pak Guru A", modulSelesai: 0, totalModul: 9 },
    { nama: "Matematika", kelas: "11", guru: "Pak Guru A", modulSelesai: 5, totalModul: 9 },
    { nama: "Matematika", kelas: "11", guru: "Pak Guru A", modulSelesai: 5, totalModul: 9 },
    { nama: "Matematika", kelas: "11", guru: "Pak Guru A", modulSelesai: 5, totalModul: 9 },
    { nama: "Matematika", kelas: "11", guru: "Pak Guru A", modulSelesai: 5, totalModul: 9 },
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white rounded-lg w-full p-6 grid grid-cols-4 gap-6">
      {data?.map((item: any, index: number) => (
        <div className="rounded-lg border border-gray-300 shadow-lg flex flex-col p-4 w-full gap-6" key={index}>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold">{item?.nama}</div>
            <div className="text-lg">{item?.kelas}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium">{item?.guru}</div>
            <div className="flex flex-col">
              <div>
                {item?.modulSelesai}/{item?.totalModul} modul
              </div>
              <div className="flex relative w-full bg-gray-300 rounded-sm h-4">
                <div
                  className={`h-4 rounded-l-sm bg-green-400 ${item?.modulSelesai === item?.totalModul && "rounded-r-sm"}`}
                  style={{ width: `${(item?.modulSelesai / item?.totalModul) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-full w-20 h-20 flex items-center justify-center bg-primary absolute right-10 bottom-10 cursor-pointer">
        <PlusIcon className="w-10 h-10 text-white" />
      </div>
    </div>
  );
}
