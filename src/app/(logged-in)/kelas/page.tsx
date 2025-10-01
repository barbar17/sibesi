"use client";

import ApiRoute from "@/api/apiRoute";
import TableCustom from "@/components/tableCustom";
import LoadingStore from "@/store/loadingStore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Kelas() {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [data, setData] = useState<any[]>([]);

  const column: any[] = [
    { title: "Mata Pelajaran", cell: "nama_kelas" },
    {
      title: "Action",
      cell: (row: any) => (
        <div className="button-secondary !border-red-700 w-8 h-8 !p-0" onClick={() => onDelete(row?.kelas_id)}>
          <TrashIcon className="w-4 h-4 text-red-700" />
        </div>
      ),
    },
  ];

  const fetchData = () => {
    setData([
      {
        kelas_id: "112233",
        nama_kelas: "IPA 12",
      },
      {
        kelas_id: "1111",
        nama_kelas: "IPS 12",
      },
    ]);
    setLoading(false);
  };

  const onDelete = (id: number) => {
    setLoading(true);
    ApiRoute.deleteKelas(`/${id}`)
      .then(() => {
        toast.success("Kelas berhasil dihapus");
        fetchData();
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white flex-col border-t-4 border-primary rounded-lg w-full p-6 flex justify-center gap-6 overflow-auto ">
        <div className="lg:text-4xl text-lg text-center">Kelas</div>
        <TableCustom columns={column} data={data} />
      </div>
    </>
  );
}
