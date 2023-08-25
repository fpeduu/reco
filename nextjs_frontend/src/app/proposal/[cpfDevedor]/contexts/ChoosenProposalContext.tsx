"use client";
import { Acordo } from "@/models/Acordos";
import { createContext, useContext, useState } from "react";

interface ChoosenProposalContext {
  choosenProposal: Acordo;
  setChoosenProposal: React.Dispatch<React.SetStateAction<Acordo>>;
}

interface ChoosenProposalProviderProps {
  children: React.ReactNode;
}

export const ChoosenProposalContext = createContext<ChoosenProposalContext | null>(null);

export function ChoosenProposalProvider({ children }: ChoosenProposalProviderProps) {
  const [choosenProposal, setChoosenProposal] = useState({} as Acordo);

  return (
    <ChoosenProposalContext.Provider value={{ choosenProposal, setChoosenProposal }}>
      {children}
    </ChoosenProposalContext.Provider>
  );
}

export function useChoosenProposalContext() {
  const context = useContext(ChoosenProposalContext);
  if (!context) throw new Error("ChoosenProposalContext not found!");
  return context;
}
