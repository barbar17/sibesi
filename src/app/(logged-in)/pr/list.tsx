"use client";

import LoadingStore from "@/app/store/loadingStore";
import { useEffect } from "react";

export default function ListPR({ handleChangeTab }: { handleChangeTab: (tab: number) => void }) {
  const setLoading = LoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <div>ListPR</div>;
}
