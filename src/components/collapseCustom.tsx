"use client";

import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CollapseCustom({ data, namaId, namaKonten }: { data: any; namaId: string; namaKonten: string }) {
  const [showModul, setShowModul] = useState<number>(0);

  return (
    <>
      {data?.map((item: any, index: number) => (
        <div className="flex flex-col p-3 border-gray-300 border rounded-lg justify-center ">
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
              <div className="w-8 h-8 rounded-full bg-primary flex justify-center items-center">
                <PlusIcon className="w-4 h-4 text-white font-bold" />
              </div>
              <div className="text-xl">{item?.nama}</div>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-800" />
          </div>

          {showModul === item[namaId] && (
            <div className="flex flex-col gap-1 text-gray-800 text-lg">
              <div className="h-[1px] bg-gray-300 w-full mt-2" />
              {item[namaKonten]?.map((itemModul: any, indexModul: number) => (
                <div className="flex cursor-pointer">{itemModul?.nama}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
