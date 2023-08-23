"use client";
import AgreementCard from "../AgreementCard/agreement-card";
import { Acordo } from "@/models/Acordos";
import { Devedor } from "@/models/Devedores";
import { Condominio } from "@/models/Condominios";
import { useState } from "react";

interface AgreementListProps {
  agreements: Acordo[];
  debtors: Devedor[];
  condominiums: Condominio[];
}

export default function AgreementList({
  agreements,
  debtors,
  condominiums
}: AgreementListProps) {
  const [showAll, setShowAll] = useState(false);

  function handleShowAll() {
    setShowAll(!showAll);
  }

  function mapAgreement(agreement: Acordo, index: number) {
    const debtor = debtors.find((debtor) => debtor.cpf === agreement.devedorCpf);
    const condominium = condominiums.find(
      (condominium) => condominium.cnpj === debtor?.condominioCnpj
    );

    return (
      <AgreementCard
        key={index}
        debtorName={debtor?.nome ?? "Devedor não encontrado"}
        debtorCPF={debtor?.cpf ?? "inválido"}
        condominiumName={condominium?.nome ?? "Condomínio não encontrado"}
        agreementStatus={agreement.status}
        agreementProposalPage={debtor?.cpf ?? null}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      {agreements.length < 5 || showAll ? (
        agreements.map(mapAgreement)
      ) : (
        <>
          {agreements.slice(0, 4).map(mapAgreement)}
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
