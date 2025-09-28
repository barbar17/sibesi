"use client";

import { ArrowLeftEndOnRectangleIcon, Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { deleteAllToken, getToken } from "@/utils/cookie";
import ApiRoute from "@/api/apiRoute";
import { toast } from "react-toastify";
import LoadingStore from "@/store/loadingStore";
import ProfileStore from "@/store/profileStore";

export default function LayoutLoggedIn({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);
  const setProfile = ProfileStore((state) => state.setProfile);
  const [profileNow, setProfileNow] = useState<any>();
  const pathname = usePathname();
  const [showTugas, setShowTugas] = useState<boolean>(true);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (getToken(process.env.NEXT_PUBLIC_KEY_TOKEN!)) {
      ApiRoute.getProfile(getToken(process.env.NEXT_PUBLIC_KEY_TOKEN!))
        .then((res) => {
          setProfile(res);
          setProfileNow(res);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    setDataProfile([
      { label: "Nama", value: profileNow?.nama_user },
      { label: profileNow?.role === "siswa" ? "Kelas" : "Mata Pelajaran", value: profileNow?.role === "siswa" ? profileNow?.kelas_id : profileNow?.mapel_id },
      { label: profileNow?.role === "siswa" ? "NIS" : "NIP", value: profileNow?.user_id },
    ]);
  }, [profileNow]);

  return (
    <div className="flex flex-col bg-gray-300 h-[100dvh] w-[100vw]">
      <div className="flex justify-between w-full bg-white py-3 px-4 lg:h-[90px] h-[45px] items-center shadow-xl border-b border-gray-300">
        <div className="flex gap-4 items-center">
          <Image
            src={"/logo_landscape.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-[100px] lg:w-[200px] h-fit cursor-pointer"
            onClick={() => {
              if (pathname !== "/dashboard") {
                setLoading(true);
                setShowMenu(false);
                router.push("/dashboard");
              }
            }}
          />
          <Bars3Icon className="text-gray-800 w-6 h-6 cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
        </div>

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
                  deleteAllToken();
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
            <div className="lg:text-lg">{profileNow?.nama_user}</div>
            <ChevronDownIcon className="text-gray-800 w-4 h-4" />
          </div>
        </Popover>
      </div>

      <div className="flex relative">
        <div
          className={`w-full lg:w-[250px] lg:flex flex-col gap-3 bg-white h-[calc(100dvh-45px)] lg:h-[calc(100dvh-90px)] py-5 px-4 text-lg lg:sticky absolute z-10 ${
            showMenu ? "flex" : "hidden"
          }`}
        >
          <div
            className={`w-full cursor-pointer ${pathname === "/materi" && "font-semibold"}`}
            onClick={() => {
              if (pathname !== "/materi") {
                setLoading(true);
                setShowMenu(false);
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
                      setShowMenu(false);
                      router.push("/pr");
                    }
                  }}
                >
                  Pekerjaan Rumah
                </div>
                <div
                  className={`w-full cursor-pointer ${pathname === "/kuis" && "font-semibold"}`}
                  onClick={() => {
                    if (pathname !== "/kuis") {
                      setLoading(true);
                      setShowMenu(false);
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
        <div className="py-6 px-4 max-h-[calc(100dvh-45px)] lg:max-h-[calc(100dvh-90px)] flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
