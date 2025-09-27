import { create } from "zustand";

interface ProfileInterface {
  profile: any;
  setProfile: (newProfile: any) => void;
}

const ProfileStore = create<ProfileInterface>((set: any) => ({
  profile: { nama: "nama1" },
  setProfile: (newProfile: any) => set({ profile: newProfile }),
}));

export default ProfileStore;
