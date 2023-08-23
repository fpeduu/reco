"use client";
import { Devedor } from "@/models/Devedores";
import { Condominio } from "@/models/Condominios";
import DebtorCard from "../DebtorCard/debtor-card";
import { useState } from "react";

interface DebtorListProps {
  debtors: Devedor[];
  condominiums: Condominio[];
}

export default function DebtorList({ debtors, condominiums }: DebtorListProps) {
  const [showAll, setShowAll] = useState(false);

  function handleShowAll() {
    setShowAll(!showAll);
  }

  function mapDebtor(debtor: Devedor, index: number) {
    const condominium = condominiums.find(
      (condominium) => condominium.cnpj === debtor.condominioCnpj
    );

    return (
      <DebtorCard
        key={index}
        debtorName={debtor.nome}
        debtorCPF={debtor.cpf}
        condominiumName={condominium?.nome ?? "Condomínio não encontrado"}
        lateTuitions={debtor.mensalidadesAtrasadas}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      {debtors.length < 5 || showAll ? (
        debtors.map(mapDebtor)
      ) : (
        <>
          {debtors.slice(0, 4).map(mapDebtor)}
          <button
            className="w-1/6 py-3 px-5 mr-10 rounded-xl text-white text-xs font-medium bg-gray-950"
            onClick={handleShowAll}>
            Ver Todos
          </button>
        </>
      )}
    </div>
  );
}
