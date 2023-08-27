"use client";

import { createContext, useContext, useState } from "react";
import { Condomino } from "@/models/Devedores";

interface ProposalContext {
  debtor: Condomino;
  setDebtor: React.Dispatch<React.SetStateAction<Condomino>>;
}

interface ProposalProviderProps {
  children: React.ReactNode;
}

export const ProposalContext = createContext<ProposalContext | null>(null);

export function ProposalProvider({ children }: ProposalProviderProps) {
  const [debtor, setDebtor] = useState<Condomino>({} as Condomino);

  return (
    <ProposalContext.Provider value={{
      debtor,
      setDebtor,
    }}>
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposalContext() {
  const context = useContext(ProposalContext);
  if (!context) throw new Error("ProposalContext not found!");
  return context;
}
