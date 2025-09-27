"use client";

import { ArrowLeftEndOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import LoadingStore from "../../store/loadingStore";

export default function LayoutLoggedIn({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const pathname = usePathname();
  const [showTugas, setShowTugas] = useState<boolean>(true);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<any[]>([
    { label: "Nama", value: "Nama Siswa" },
    { label: "Kelas", value: "8A" },
    { label: "NIS", value: "0011111" },
  ]);

  return (
    <div className="flex flex-col bg-gray-300 h-[100dvh] w-[100vw]">
      <div className="flex justify-between w-full bg-white py-3 px-4 h-[90px] items-center shadow-xl border-b border-gray-300">
        <Image
          src={"/logo_landscape.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-[200px] h-fit cursor-pointer"
          onClick={() => {
            if (pathname !== "/dashboard") {
              setLoading(true);
              router.push("/dashboard");
            }
          }}
        />

        <Popover
          isOpen={showProfile}
          positions={"bottom"}
          onClickOutside={() => setShowProfile(false)}
          content={
            <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-2xl border border-gray-300 me-4">
              <div className="flex flex-col gap-1">
                {dataProfile?.map((item: any, index: number) => (
                  <div className="flex items-center">
                    <div className="w-[100px]">{item?.label}:</div>
                    <div>{item?.value}</div>
                  </div>
                ))}
              </div>
              <div className="border-gray-300 border-t h-[1px]" />
              <button
                className="button-secondary"
                onClick={() => {
                  setLoading(true);
                  router.push("/login");
                }}
              >
                <ArrowLeftEndOnRectangleIcon className="w-4 h-4 text-gray-800" />
                Logout
              </button>
            </div>
          }
        >
          <div className="flex gap-3 cursor-pointer items-center" onClick={() => setShowProfile(!showProfile)}>
            <div className="text-lg">Nama Siswa</div>
            <ChevronDownIcon className="text-gray-800 w-4 h-4" />
          </div>
        </Popover>
      </div>

      <div className="flex">
        <div className="w-[250px] flex flex-col gap-3 bg-white h-[calc(100dvh-90px)] py-5 px-4 text-lg sticky">
          <div
            className={`w-full cursor-pointer ${pathname === "/materi" && "font-semibold"}`}
            onClick={() => {
              if (pathname !== "/materi") {
                setLoading(true);
                router.push("/materi");
              }
            }}
          >
            Materi
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => setShowTugas(!showTugas)}>
              <div>Tugas</div>
              <ChevronDownIcon className="w-4 h-4 text-gray-800" />
            </div>
            {showTugas && (
              <div className="flex flex-col gap-1 px-4">
                <div
                  className={`w-full cursor-pointer ${pathname === "/pr" && "font-semibold"}`}
                  onClick={() => {
                    if (pathname !== "/pr") {
                      setLoading(true);
                      router.push("/pr");
                    }
                  }}
                >
                  Pekerjaan Rumah
                </div>
                <div
                  className={`w-full cursor-pointer ${pathname === "kuis" && "font-semibold"}`}
                  onClick={() => {
                    if (pathname !== "/kuis") {
                      setLoading(true);
                      router.push("/kuis");
                    }
                  }}
                >
                  Kuis
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="py-6 px-4 flex max-h-[calc(100dvh-90px)] flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
