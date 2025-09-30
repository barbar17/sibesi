"use client";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center fixed z-[99999] bg-black opacity-90 inset-x-0 inset-y-0">
      <ClipLoader color="#0f4073" />
    </div>
  );
}
