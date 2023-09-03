"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContext {
  hideSideBar: boolean;
  setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SideBarProviderProps {
  children: React.ReactNode;
}

export const SideBarContext = createContext<SidebarContext | null>(null);

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [hideSideBar, setHideSideBar] = useState<boolean>(false);

  return (
    <SideBarContext.Provider value={{ hideSideBar, setHideSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (!context) throw new Error("SideBarContext not found!");
  return context;
}
