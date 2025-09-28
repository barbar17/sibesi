"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import ModalCustom from "@/components/modalCustom";
import TableCustom from "@/components/tableCustom";
import LoadingStore from "@/store/loadingStore";
import { ArrowDownTrayIcon, ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ListDoneKuis({ handleChangeTab, id }: { handleChangeTab: (tab: number) => void; id: number }) {
  const setLoading = LoadingStore((state) => state.setLoading);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<any>({});
  const [data, setData] = useState<any>();

  const column = [
    { title: "Nama", cell: "nama" },
    {
      title: "Action",
      cell: (row: any) => (
        <div className="flex gap-3 items-center justify-center">
          {row?.nilai ? (
            <div className="text-[16px] font-medium">{row?.nilai}</div>
          ) : (
            <div className="button-secondary w-8 h-8 !p-0" onClick={() => handleChangeTab(2)}>
              <PencilIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      ),
    },
  ];

  const onSubmit = () => {
    setShowModal(false);
    toast.success("Nilai berhasil ditambahkan");
  };

  const fetchData = () => {
    setLoading(true);
    Promise.all([ApiRoute.getKuis(`/${id}/terkumpul`), ApiRoute.getKuis(`/${id}`)])
      .then((res) => {
        setData({ ...res[1], data: res[0] });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setForm({});
  }, [showModal]);

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 flex flex-col gap-4">
        <div className="flex justify-center items-center relative">
          <ArrowLeftIcon className="w-8 h-8 cursor-pointer absolute left-0" onClick={() => handleChangeTab(1)} />
          <div className="text-4xl">{data?.nama}</div>
        </div>
        <TableCustom columns={column} data={data?.data} />
      </div>
    </>
  );
}
