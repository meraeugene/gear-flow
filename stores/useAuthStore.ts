import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  userId: string | null;
  role: string | null;
  setAuth: (userId: string, role: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userId: null,
      role: null,
      setAuth: (userId, role) => set({ userId, role }),
      logout: () => set({ userId: null, role: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      // skipHydration: true, // optional: wait before using state
    },
  ),
);
