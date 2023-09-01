"use client";

import DebtorCard from "../components/DebtorCard/debtor-card";
import { useRouter } from "next/navigation";
import { serverURL } from "@/config";
import { useProposalContext } from "@/contexts/ProposalContext";

export default function ConfirmationPage() {
  const router = useRouter();
  const { debtor } = useProposalContext();

  function handleStartAgreement() {
    router.push(`${serverURL}/proposal/${debtor.cpf}`);
  }

  function handleRefuseAgreement() {
    router.back();
  }

  return (
    <div className="containerLayout">
      <div className="flex flex-col justify-center gap-5 m-auto h-full max-w-3xl">
        <h1 className="font-bold text-3xl leading-10">
          Confira as informações
        </h1>
        <h2 className="text-xl font-medium leading-10">
          Você selecionou o seguinte inadimplente:
        </h2>
        <DebtorCard tenant={debtor}/>
        <h2 className="text-xl font-medium leading-10">
          É com esta pessoa que deseja iniciar o acordo?
        </h2>
        <div className="flex flex-row justify-center place-items-center gap-5 w-full">
          <button
            onClick={handleRefuseAgreement}
            className="w-1/2 py-3 px-2 rounded-full text-tertiary
                       text-s font-medium text-center bg-[#ADADAD]">
            Não, escolher outra
          </button>
          <button
            onClick={handleStartAgreement}
            className="w-1/2 py-3 px-2 rounded-full text-tertiary
                       text-s font-medium text-center bg-secondary">
            Sim, iniciar acordo
          </button>
        </div>
      </div>
    </div>
  );
}
