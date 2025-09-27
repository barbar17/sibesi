"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import ModalCustom from "@/components/modalCustom";
import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { toast } from "react-toastify";

export default function Dashboard() {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [showModalMapel, setShowModalMapel] = useState<boolean>(false);
  const [showModalUser, setShowModalUser] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [formMapel, setFormMapel] = useState<any>({});

  const onSubmitMapel = () => {};

  useEffect(() => {
    if (isProfile?.kelas_id) {
      setLoading(true);
      ApiRoute.getDashboard(isProfile?.role == "siswa" ? `/siswa?kelas=${isProfile?.kelas_id}` : `/guru?mapel=${isProfile?.mapel_id}`)
        .then((res: any) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
  }, [isProfile]);

  return (
    <>
      <ModalCustom isOpen={showModalMapel} onClose={() => setShowModalMapel(false)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-[120px] flex-shrink-0">Kelas</div>
              <InputCustom
                value={formMapel?.kelas_id}
                onChange={(evt) => setFormMapel({ ...formMapel, kelas_id: evt })}
                placeholder="Kelas"
                className="w-full"
              />
            </div>
            <div className="flex items-center">
              <div className="w-[120px] flex-shrink-0">Mata Pelajaran</div>
              <InputCustom
                value={formMapel?.nama_mapel}
                onChange={(evt) => setFormMapel({ ...formMapel, nama_mapel: evt })}
                placeholder="Mata Pelajaran"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full">
            <button className="button-secondary flex-1" onClick={() => setShowModalMapel(false)}>
              Batal
            </button>
            <button className="button-primary flex-1" disabled={!formMapel?.nama_mapel || !formMapel?.kelas_id} onClick={onSubmitMapel}>
              Simpan
            </button>
          </div>
        </div>
      </ModalCustom>

      <div className="bg-white rounded-lg w-full p-6 grid lg:grid-cols-4 grid-cols-1 gap-6 overflow-auto">
        {data?.map((item: any, index: number) => (
          <div className="rounded-lg border border-gray-300 shadow-lg flex flex-col p-4 w-full gap-6 h-fit" key={index}>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-semibold">{item?.nama_mapel}</div>
              <div className="text-lg">{item?.nama_materi}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">{item?.nama_user}</div>
              <div className="flex flex-col">
                <div>
                  {item?.materi_selesai}/{item?.total_materi} modul
                </div>
                <div className="flex relative w-full bg-gray-300 rounded-sm h-4">
                  <div
                    className={`h-4 rounded-l-sm bg-green-400 ${item?.materi_selesai === item?.total_materi && "rounded-r-sm"}`}
                    style={{ width: `${(item?.materi_selesai / item?.total_materi) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {isProfile?.role === "guru" && (
          <Popover
            isOpen={showPopover}
            onClickOutside={() => setShowPopover(false)}
            positions="top"
            align="end"
            content={
              <div className="flex flex-col gap-2 bg-white rounded-lg p-4 border-gray-300 border font-semibold mb-4">
                <div className="cursor-pointer hover:bg-gray-300 px-2 rounded-sm">User</div>
                <div className="cursor-pointer hover:bg-gray-300 px-2 rounded-sm" onClick={() => setShowModalMapel(true)}>
                  Mata Pelajaran
                </div>
              </div>
            }
          >
            <div
              className="rounded-full w-20 h-20 flex items-center justify-center bg-primary absolute right-10 bottom-10 cursor-pointer"
              onClick={() => setShowPopover(!showPopover)}
            >
              <PlusIcon className="w-10 h-10 text-white" />
            </div>
          </Popover>
        )}
      </div>
    </>
  );
}
