"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "app-state",
      }
    )
  )
);
