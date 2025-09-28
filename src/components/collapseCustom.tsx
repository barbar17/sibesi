"use client";

import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CollapseCustom({
  data,
  namaId,
  namaIdDetail,
  namaKonten,
  onDetail,
  onAdd,
}: {
  data: any;
  namaId: string;
  namaKonten: string;
  namaIdDetail: string;
  onDetail: (id: number) => void;
  onAdd: (id: number) => void;
}) {
  const [showModul, setShowModul] = useState<number>(0);
  const isProfile = ProfileStore((state) => state.profile);
  const setLoading = LoadingStore((state) => state.setLoading);

  return (
    <>
      {data?.map((item: any, index: number) => (
        <div className="flex flex-col p-3 border-gray-300 border rounded-lg justify-center" key={index}>
          <div
            className="flex justify-between cursor-pointer items-center"
            onClick={() => {
              if (showModul === item[namaId]) {
                setShowModul(0);
              } else {
                setShowModul(item[namaId]);
              }
            }}
          >
            <div className="flex gap-4 items-center">
              {isProfile?.role === "guru" && (
                <div className="w-8 h-8 rounded-full bg-primary flex justify-center items-center cursor-pointer" onClick={() => onAdd(item[namaId])}>
                  <PlusIcon className="w-4 h-4 text-white font-bold" />
                </div>
              )}
              <div className="text-xl">{item?.nama}</div>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-800" />
          </div>

          {showModul === item[namaId] && (
            <div className="flex flex-col gap-1 text-gray-800 text-lg">
              <div className="h-[1px] bg-gray-300 w-full mt-2" />
              {item[namaKonten]?.map((itemModul: any, indexModul: number) => (
                <div
                  className="flex cursor-pointer ps-16"
                  onClick={() => {
                    setLoading(true);
                    onDetail(itemModul[namaIdDetail]);
                  }}
                  key={indexModul}
                >
                  {itemModul?.nama}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
