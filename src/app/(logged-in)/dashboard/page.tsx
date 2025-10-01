"use client";

import ApiRoute from "@/api/apiRoute";
import Dropdown from "@/components/Dropdown";
import InputCustom from "@/components/inputCustom";
import ModalCustom from "@/components/modalCustom";
import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";
import { OptionInterface } from "@/types/optionInterface";
import Formatting from "@/utils/formatting";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { toast } from "react-toastify";

export default function Dashboard() {
  const setLoading = LoadingStore((state) => state.setLoading);
  const isProfile = ProfileStore((state) => state.profile);
  const [showModalMapel, setShowModalMapel] = useState<boolean>(false);
  const [isNewMapel, setIsNewMapel] = useState<boolean>(true);
  const [optionKelas, setOptionKelas] = useState<OptionInterface[]>([]);
  const [optionMapel, setOptionMapel] = useState<OptionInterface[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [formMapel, setFormMapel] = useState<any>({});

  const onSubmitMapel = () => {
    setLoading(true);
    if (isNewMapel) {
      let temp = { ...formMapel, kelas_id: formMapel?.kelas_id?.value };
      ApiRoute.postMapel(temp)
        .then((res) => {
          toast.success("Mata pelajaran berhasil ditambahkan");
          setShowModalMapel(false);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    } else {
      let temp = {
        kelas_id: formMapel?.kelas_id?.value,
        mapel_id: formMapel?.mapel_id?.value,
      };
      ApiRoute.postMapelLama(temp)
        .then((res) => {
          toast.success("Mata pelajaran berhasil ditambahkan");
          setShowModalMapel(false);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setFormMapel({});
  }, [showModalMapel]);

  useEffect(() => {
    if (isProfile?.role) {
      setLoading(true);
      ApiRoute.getDashboard(isProfile?.role == "siswa" ? `/siswa?kelas=${isProfile?.kelas_id}` : `/guru?mapel=${isProfile?.mapel_id}`)
        .then((res: any) => {
          if (isProfile?.role === "guru") {
            Promise.all([ApiRoute.getKelas(), ApiRoute.getMapel()])
              .then((res) => {
                setOptionKelas(Formatting.formatRC(res[0], "kelas_id", "nama_kelas"));
                setOptionMapel(Formatting.formatRC(res[1], "mapel_id", "nama_mapel"));
                setLoading(false);
              })
              .catch((err) => {
                toast.error(err);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
          setData(res);
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
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={isNewMapel} onChange={(evt) => setIsNewMapel(evt?.target?.checked)} />
              <div>Mata Pelajaran Baru</div>
            </div>
            <div className="flex items-center">
              <div className="w-[120px] flex-shrink-0">Mata Pelajaran</div>
              {isNewMapel ? (
                <InputCustom
                  value={formMapel?.nama_mapel}
                  onChange={(evt) => setFormMapel({ ...formMapel, nama_mapel: evt })}
                  placeholder="Mata Pelajaran"
                  className="w-full"
                />
              ) : (
                <div className="flex-1">
                  <Dropdown
                    options={optionMapel}
                    placeholder="Mata Pelajatan"
                    value={formMapel?.mapel_id}
                    handleOnChange={(evt) => setFormMapel({ ...formMapel, mapel_id: evt })}
                    width="100%"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center">
              <div className="w-[120px] flex-shrink-0">Kelas</div>
              <div className="flex-1">
                <Dropdown
                  options={optionKelas}
                  placeholder="Kelas"
                  value={formMapel?.kelas_id}
                  handleOnChange={(evt) => setFormMapel({ ...formMapel, kelas_id: evt })}
                  width="100%"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 w-full">
            <button className="button-secondary flex-1" onClick={() => setShowModalMapel(false)}>
              Batal
            </button>
            <button className="button-primary flex-1" onClick={onSubmitMapel}>
              Simpan
            </button>
          </div>
        </div>
      </ModalCustom>

      <div className="bg-white border-t-4 border-primary rounded-lg w-full p-6 grid lg:grid-cols-4 grid-cols-1 gap-6 overflow-auto">
        {data?.map((item: any, index: number) => (
          <div className="rounded-lg border border-gray-300 shadow-lg flex flex-col p-4 w-full gap-6 h-fit relative" key={index}>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-semibold pe-8">{item?.nama_mapel}</div>
              <div className="text-md">{item?.nama_materi}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="w-full flex flex-row item-center pb-1 justify-between">
                  <div className="font-semibold">{item?.nama_guru || item?.nama_kelas}</div>
                  <div>
                    Modul {item?.materi_selesai}/{item?.total_materi}
                  </div>
                </div>
                <div className="flex relative w-full bg-gray-300 rounded-sm h-4">
                  <div
                    className={`h-4 rounded-l-sm bg-green-400 ${item?.materi_selesai === item?.total_materi && "rounded-r-sm"}`}
                    style={{ width: `${(item?.materi_selesai / item?.total_materi) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            {/* <div className="w-8 h-8 right-4 bg-red-700 cursor-pointer rounded-full items-center justify-center flex absolute" onClick={onDelete}>
              <MinusIcon className="w-4 h-4 text-white" />
            </div> */}
          </div>
        ))}
        {/* {isProfile?.role === "guru" && (
          <Popover
            isOpen={showPopover}
            onClickOutside={() => setShowPopover(false)}
            positions="top"
            align="end"
            content={
              <div className="flex flex-col gap-2 bg-white rounded-lg p-4 border-gray-300 border font-semibold mb-4">
                <div className="cursor-pointer hover:bg-gray-300 px-2 rounded-sm" onClick={() => setShowModalUser(true)}>
                  User
                </div>
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
        )} */}
        <div
          className="rounded-full w-20 h-20 flex items-center justify-center bg-primary absolute right-10 bottom-10 cursor-pointer"
          onClick={() => setShowModalMapel(true)}
        >
          <PlusIcon className="w-10 h-10 text-white" />
        </div>
      </div>
    </>
  );
}
