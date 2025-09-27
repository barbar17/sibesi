"use client";

import ApiRoute from "@/api/apiRoute";
import InputCustom from "@/components/inputCustom";
import LoadingStore from "@/store/loadingStore";
import { getToken } from "@/utils/cookie";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const setLoading = LoadingStore((state: any) => state.setLoading);
  const router = useRouter();
  const [form, setForm] = useState<any>({ username: "", password: "" });
  const [showPass, setShowPass] = useState<boolean>(false);

  const onSubmit = () => {
    setLoading(true);
    ApiRoute.postLogin(form)
      .then((res) => {
        console.log("coba", res);
        // router.push("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        console.log("coba", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const isLogin: string = getToken(process.env.NEXT_PUBLIC_KEY_TOKEN!);
    if (isLogin) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-300 items-center justify-center flex">
      <div className="bg-white rounded-xl flex flex-col px-4 py-6 gap-4 w-[300px] items-center">
        <Image src={"/logo_landscape.png"} alt="logo" width={100} height={100} className="w-[200px]" />
        <div className="text-gray-700 text-lg">Login to Sibesi</div>

        <div className="flex flex-col gap-2 w-full">
          <div className="font-[500]">Username</div>
          <InputCustom value={form?.username} onChange={(evt) => setForm({ ...form, username: evt })} placeholder="Masukkan username anda" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="font-[500]">Password</div>
          <div className="flex w-full relative items-center">
            <input
              className="input-text !pe-6 w-full"
              value={form?.password}
              onChange={(evt) => setForm({ ...form, password: evt.target.value })}
              placeholder="Masukkan password anda"
              type={showPass ? "text" : "password"}
            />
            <div className="text-gray-500 cursor-pointer absolute right-4" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
            </div>
          </div>
        </div>

        <button className="button-primary w-full" disabled={!form?.username || !form?.password} onClick={onSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
