"use client";

import Loading from "@/app/loading";
import LoadingStore from "@/app/store/loadingStore";

export default function LoadingComp() {
  const isLoading = LoadingStore((state) => state.loading);

  console.log("coba", isLoading);
  return <div>{isLoading && <Loading />}</div>;
}
