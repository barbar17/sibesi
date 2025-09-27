import { create } from "zustand";
import { LoadingInterface } from "@/types/loadingInterface";

const LoadingStore = create<LoadingInterface>((set: any) => ({
  loading: true,
  setLoading: (newLoading: boolean) => set({ loading: newLoading }),
}));

export default LoadingStore;
