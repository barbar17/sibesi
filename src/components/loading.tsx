"use client";

import Loading from "@/app/loading";
import LoadingStore from "@/store/loadingStore";

export default function LoadingComp() {
  const isLoading = LoadingStore((state) => state.loading);

  return <div>{isLoading && <Loading />}</div>;
}
