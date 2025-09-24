"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingStore from "./store/loadingStore";

export default function Home() {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);

  useEffect(() => {
    router.push("/login");
    setLoading(true);
  }, []);
}
