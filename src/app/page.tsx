"use client";

import LoadingStore from "@/store/loadingStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const setLoading = LoadingStore((state) => state.setLoading);

  useEffect(() => {
    router.push("/login");
    setLoading(true);
  }, []);
}
