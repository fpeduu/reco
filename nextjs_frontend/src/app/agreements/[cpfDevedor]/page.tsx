"use client";

import { serverURL } from "@/config/index";
import { Acordo } from "@/models/Acordos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Devedor } from "@/models/Devedores";
import TenantProfileCard from "./components/TenantProfileCard/tenant-profile-card";
import CurrencyCard from "./components/CurrencyCard/currency-card";
import StatusBarBig from "./components/StatusBarBig/status-bar-big";
import DownloadButton from "./components/DownloadButton/download-button";

interface AgreementResponse {
  acordo: Acordo;
  devedor: Devedor;
}

const fetchAgreement = async (cpfDevedor: string) => {
  return (await fetch(`${serverURL}/api/agreements/${cpfDevedor}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    })) as AgreementResponse;
};

export default function AgreementStatus() {
  const [agreement, setAgreement] = useState<Acordo>({} as Acordo);
  const [tenant, setTenant] = useState<Devedor>({} as Devedor);
  const [subpage, setSubpage] = useState<"timeline" | "details">("timeline");
  const tenantCpf = useParams().cpfDevedor as string;

  useEffect(() => {
    fetchAgreement(tenantCpf).then((response) => {
      setAgreement(response.acordo);
      setTenant(response.devedor);
    });
  }, [tenantCpf]);

  return (
    <div className="containerLayout flex flex-col gap-10">
      <h1 className="text-4xl font-extrabold">Detalhes da negociação</h1>
      <div className="flex items-end gap-20">
        <TenantProfileCard tenant={tenant} />
        <CurrencyCard
          icon="/icons/dollar_sign.svg"
          iconSize={34}
          title="Valor em débito"
          value={tenant.mensalidadesAtrasadas * tenant.valorDivida}
          desccriptionTitle="Em atraso"
          description={`${tenant.mensalidadesAtrasadas} meses`}
          isUpArrow={false}
        />
        <CurrencyCard
          icon="/icons/document.svg"
          iconSize={26}
          title="Valor proposto"
          value={agreement.valorTotal ? agreement.valorTotal / agreement.qtdParcelas : 0}
          desccriptionTitle="Parcelado"
          description={`${agreement.qtdParcelas} meses`}
          isUpArrow={true}
        />
      </div>
      <h2 className="text-4xl font-bold">Andamento</h2>
      <div className="w-full h-full bg-white rounded-2xl">
        <nav className="border-b border-b-slate-300">
          <button
            onClick={() => setSubpage("timeline")}
            className={
              "w-56 p-5 pb-0 border-b text-sm " +
              (subpage === "timeline" ? "text-red-600 border-b-red-600" : "text-slate-500")
            }>
            Linha do Tempo
          </button>
          <button
            onClick={() => setSubpage("details")}
            className={
              "w-56 p-5 pb-0 border-b text-sm " +
              (subpage === "details" ? "text-red-600 border-b-red-600" : "text-slate-500")
            }>
            Detalhes
          </button>
        </nav>
        <div className="p-20 flex flex-col items-end gap-10">
          {subpage === "timeline" && <StatusBarBig status={agreement.status} />}
          {subpage === "timeline" && agreement.status === "Acordo aceito" && (
            <DownloadButton acordo={agreement} devedor={tenant} />
          )}
        </div>
      </div>
    </div>
  );
}
