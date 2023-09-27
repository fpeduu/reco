"use client";

import { serverURL } from "@/config/index";
import { useEffect, useState } from "react";

import { DevedorAcordo } from "@/types/acordo.dto";
import { Acordo, Proposta } from "@/models/Acordos";

import CurrencyCard from "./components/CurrencyCard/currency-card";
import StatusBarBig from "./components/StatusBarBig/status-bar-big";
import DownloadButton from "./components/DownloadButton/download-button";
import TenantProfileCard from "./components/TenantProfileCard/tenant-profile-card";
import AgreementDecision from "./components/AgreementDecision/agreement-decision";

async function fetchAgreement(cpfDevedor: string) {
  return (await fetch(`${serverURL}/api/agreements/${cpfDevedor}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    })) as DevedorAcordo;
};

async function fetchAcceptAgreement(cpf: string, newProposal: Proposta) {
  return (await fetch(`${serverURL}/api/proposal/${cpf}/`, {
    method: "POST", headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProposal),
  }).then((response) => response.json())
    .catch((error) => {
      console.error(error);
    })) as Acordo;
}

interface AgreementStatusProps {
  params: {
    cpfDevedor: string;
  }
}

export default function AgreementStatus({ params }: AgreementStatusProps) {
  const [agreement, setAgreement] = useState<DevedorAcordo>();
  const [subpage, setSubpage] = useState<"timeline" | "details">("timeline");
  const [installmentValue, setInstallmentValue] = useState<number>(0);

  useEffect(() => {
    fetchAgreement(params.cpfDevedor).then((response) => {
      setAgreement(response);

      const { entrada, qtdParcelas } = response.acordo;
      const totalInstallmentValue = response.valorDivida - entrada;
      setInstallmentValue(totalInstallmentValue / qtdParcelas);
    });
  }, [params]);

  function getAndModifyAgreement(accept: boolean) {
    if (!agreement) return;
    const length = agreement.acordo.historicoValores.length - 1;
    const lastAgreement = agreement.acordo.historicoValores[length];
    lastAgreement.aceito = accept;
    return lastAgreement;
  }

  async function onAcceptAgreement() {
    const lastAgreement = getAndModifyAgreement(true);
    if (!lastAgreement || !agreement) return;
    const response = await fetchAcceptAgreement(params.cpfDevedor,
                                                lastAgreement);
    agreement.acordo.status = response.status;
    setAgreement(agreement);
  }

  async function onRejectAgreement() {
    const lastAgreement = getAndModifyAgreement(false);
    if (!lastAgreement || !agreement) return;
    const response = await fetchAcceptAgreement(params.cpfDevedor,
                                                lastAgreement);
    agreement.acordo.status = response.status;
    setAgreement(agreement);
  }

  function switchToTimeline() {
    setSubpage("timeline");
  }

  function switchToDetails() {
    setSubpage("details");
  }

  if (!agreement) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="containerLayout flex flex-col gap-10">
      <h1 className="text-4xl font-medium">
        Detalhes da negociação
      </h1>
      <div className="flex items-end justify-start gap-20">
        <TenantProfileCard tenant={agreement} />
        <CurrencyCard
          icon="/icons/dollar_sign.svg"
          iconSize={34}
          title="Valor em débito"
          value={agreement.valorDivida}
          desccriptionTitle="Em atraso:"
          description={`${agreement.mensalidadesAtrasadas} meses`}
          descriptionStyle="text-rose-400"
        />
        <CurrencyCard
          icon="/icons/document.svg"
          iconSize={26}
          title="Valor de entrada"
          value={agreement.acordo.entrada}
          descriptionStyle="text-green-600"
          description={`+ ${agreement.acordo.qtdParcelas} parcelas de ${installmentValue.toLocaleString()}`}
        />
      </div>
      <h2 className="text-4xl font-medium">Andamento</h2>
      <div className="w-full h-full bg-white rounded-2xl">
        <nav className="border-b border-b-slate-300">
          <button
            onClick={switchToTimeline}
            className={"w-56 p-5 pb-0 border-b text-sm " +
              (subpage === "timeline" ? "text-red-600 border-b-red-600" : "text-slate-500")
            }>
            Linha do Tempo
          </button>
          <button
            onClick={switchToDetails}
            className={"w-56 p-5 pb-0 border-b text-sm " +
              (subpage === "details" ? "text-red-600 border-b-red-600" : "text-slate-500")
            }>
            Detalhes
          </button>
        </nav>
        {subpage === "timeline" && 
        <div className="p-20 flex flex-col items-end gap-10">
            <StatusBarBig status={agreement.acordo.status} />
          {agreement.acordo.status === "Aguardando aprovação" && 
            <AgreementDecision onAcceptAgreement={onAcceptAgreement}
                               onRejectAgreement={onRejectAgreement}/>
          }
          {agreement.acordo.status === "Acordo aceito" && 
            <DownloadButton agreement={agreement} />}
        </div>}
      </div>
    </div>
  );
}
