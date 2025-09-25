"use client";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";

export default function TableCustom({
  columns,
  data,
  page_size,
  page,
  total,
  total_page,
  onChangeSize,
  onChangePage,
}: {
  columns?: any;
  data?: any;
  page_size?: number;
  page?: number;
  total?: number;
  total_page?: number;
  onChangeSize?: (parms: number) => void;
  onChangePage?: (parms: number) => void;
}) {
  const [isOpenPopOver, setIsOpenPopOVer] = useState<boolean>(false);
  const [checkHeader, setCheckHeader] = useState<boolean>(false);
  const [newData, setNewData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any[]>([]);

  const option: any[] = [
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
  ];

  const visiblePages: number[] = [];
  if (total_page! < 6) {
    for (let i = 0; i < total_page!; i++) {
      visiblePages.push(i + 1);
    }
  } else {
    if (page! < 3) {
      for (let i = 0; i < 3; i++) {
        visiblePages.push(i + 1);
      }
    } else if (page! > total_page! - 3) {
      for (let i = total_page! - 5; i < total_page!; i++) {
        visiblePages.push(i + 1);
      }
    } else {
      for (let i = page! - 2; i < page! + 1; i++) {
        visiblePages.push(i + 1);
      }
    }
  }

  useEffect(() => {
    if (Array.isArray(data)) {
      setNewData(data?.map((item: any) => ({ ...item, check: false })));
    }
  }, [data]);

  return (
    <div>
      <div className={`w-full border border-gray-300 rounded-lg overflow-x-auto`}>
        <table className="w-full">
          <thead className="text-gray-800 font-semibold bg-gray-200">
            <tr>
              {columns?.map((item: any) => (
                <td key={item?.title} className={`px-3 py-3.5 whitespace-nowrap`}>
                  <div className={`flex flex-row gap-2 items-center justify-center`}>{item?.title}</div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {newData?.map((item_data: any, index_data: number) => (
              <tr key={item_data} className={`border-t border-gray-300`}>
                {columns?.map((item_col: any) => (
                  <td key={item_col?.cell} className={`text-[13px] px-3 py-3.5`}>
                    {typeof item_col?.cell === "function" ? item_col?.cell(item_data, index_data) : item_data[item_col.cell]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`pt-6 px-4 flex flex-row justify-between items-center`}>
        <div className="text-gray-800 lg:!flex hidden">
          Menampilkan {1 + (page! - 1) * page_size!} hingga {page_size! + (page! - 1) * page_size!} dari {total} data
        </div>
        <div className="flex flex-row">
          <div className="flex gap-2 items-center">
            <div className="text-gray-800">data perhalaman: </div>
            <Popover
              containerStyle={{ zIndex: "9999" }}
              isOpen={isOpenPopOver}
              positions={"top"}
              onClickOutside={() => setIsOpenPopOVer(false)}
              content={
                <div className="bg-white py-2">
                  {option?.map((item) => (
                    <div
                      key={item?.value}
                      className="hover:bg-primary hover:text-white px-4 cursor-pointer"
                      onClick={() => {
                        setIsOpenPopOVer(false);
                        onChangeSize!(parseInt(item?.value));
                      }}
                    >
                      {item?.label}
                    </div>
                  ))}
                </div>
              }
            >
              <div className="flex cursor-pointer" onClick={() => setIsOpenPopOVer(!isOpenPopOver)}>
                {page_size}
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </Popover>
          </div>
          <div className="flex ms-4 lg:ms-10 gap-2">
            <div
              className={`border border-gray-300 rounded-md lg:p-2 p-1 flex justify-center items-center ${
                page === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={page != 1 ? () => onChangePage!(page! - 1) : undefined}
            >
              <div className="w-4">
                <ChevronLeftIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="hidden lg:!flex gap-2">
              {visiblePages?.map((item) => (
                <div
                  key={item}
                  className={`text-[12px] border rounded-md lg:py-2 lg:w-10 p-2 text-center cursor-pointer flex justify-center items-center ${
                    page === item ? "border-primary text-primaborder-primary" : "border-gray-300 text-gray-800"
                  }`}
                  onClick={item !== page ? () => onChangePage!(item) : undefined}
                >
                  {item}
                </div>
              ))}
            </div>
            {page! < total_page! - 2 && total_page! > 5 && (
              <>
                <div className="rounded-md p-2 hidden lg:!flex">...</div>
                <div
                  className={`text-[12px] border rounded-md lg:py-2 lg:w-10 p-2 text-center cursor-pointer lg:!flex hidden justify-center items-center`}
                  onClick={(item) => onChangePage!(total_page!)}
                >
                  {total_page}
                </div>
              </>
            )}
            <div
              className={`text-[12px] border rounded-md lg:py-2 lg:w-10 p-2 text-center cursor-pointer flex lg:hidden justify-center items-center border-primary text-primaborder-primary`}
            >
              {page}
            </div>
            <div
              className={`border border-gray-300 rounded-md lg:p-2 p-1 flex justify-center items-center ${
                page === total_page ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={page != total_page ? (item) => onChangePage!(page! + 1) : undefined}
            >
              <div className="w-4">
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
