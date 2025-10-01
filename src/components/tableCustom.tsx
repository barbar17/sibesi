"use client";
import { useEffect, useState } from "react";

export default function TableCustom({ columns, data }: { columns?: any; data?: any }) {
  const [newData, setNewData] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setNewData(data?.map((item: any) => ({ ...item, check: false })));
    }
  }, [data]);

  return (
    <div>
      <div className={`w-full border border-gray-300 overflow-x-auto`}>
        <table className="w-full">
          <thead className="text-gray-800 font-semibold bg-gray-200">
            <tr>
              {columns?.map((item: any) => (
                <td key={item?.title} className={`px-3 py-3 whitespace-nowrap border border-slate-400`}>
                  <div className={`flex flex-row gap-2 items-center justify-start text-lg`}>{item?.title}</div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {newData?.map((item_data: any, index_data: number) => (
              <tr key={item_data} className={`border-t border-gray-300 ${index_data % 2 === 1 ? "bg-slate-200" : "bg-white"}`}>
                {columns?.map((item_col: any) => (
                  <td key={item_col?.cell} className={`text-[16px] border border-slate-400 px-3 py-2`}>
                    {typeof item_col?.cell === "function" ? item_col?.cell(item_data, index_data) : item_data[item_col.cell]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
