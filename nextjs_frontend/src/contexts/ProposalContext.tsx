"use client";

import { createContext, useContext, useState } from "react";
import { Devedor } from "@/models/Devedores";

interface ProposalContext {
  debtor: Devedor;
  setDebtor: React.Dispatch<React.SetStateAction<Devedor>>;
}

interface ProposalProviderProps {
  children: React.ReactNode;
}

export const ProposalContext = createContext<ProposalContext | null>(null);

export function ProposalProvider({ children }: ProposalProviderProps) {
  const [debtor, setDebtor] = useState<Devedor>({} as Devedor);

  return (
    <ProposalContext.Provider
      value={{
        debtor,
        setDebtor
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
