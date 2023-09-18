"use client";

import { serverURL } from "@/config/index";
import { Condomino } from "@/models/Devedores";
import { Acordo } from "@/models/Acordos";
import { useParams } from "next/navigation";
import DebtorCard from "@/components/DebtorCard/debtor-card";
import StatusBarBig from "./components/StatusBarBig/status-bar-big";
import DownloadButton from "@/components/DownloadButton/download-button";
import { useEffect, useState } from "react";
import { Condominio } from "@/models/Condominios";

interface AgreementResponse {
  acordo: Acordo;
  devedor: Condomino;
  condominio: Condominio;
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
  const [tenant, setTenant] = useState<Condomino>({} as Condomino);
  const [condominium, setCondominium] = useState<Condominio>({} as Condominio);
  const tenantCpf = useParams().cpfDevedor as string;

  useEffect(() => {
    fetchAgreement(tenantCpf).then((response) => {
      setAgreement(response.acordo);
      setTenant(response.devedor);
      setCondominium(response.condominio);
    });
  }, [tenantCpf]);

  return (
    <div className="containerLayout flex flex-col gap-10">
      <h1 className="text-5xl font-extrabold mb-10">Confira os detalhes da negociação</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold leading-10">
          Informações do inadimplente
        </h1>
        <h2 className="text-lg font-medium leading-10">
          Confira o inadimplente com quem a negociação foi realizada
        </h2>
        {tenant && <DebtorCard tenant={tenant} isModal={false} isInteractive={false} />}
      </div>
      <div>
        <h1 className="text-4xl font-extrabold leading-10">Progresso</h1>
        <h2 className="text-lg font-medium leading-10">
          Confira o andamento da negociação.&nbsp;
          {agreement?.dataAcordo && (
            <span>
              Ela foi realizada há&nbsp;
              <span className="font-semibold">
                {new Date().getDate() - agreement.dataAcordo.getDate() + " dias"}
              </span>
            </span>
          )}
        </h2>
        <div className="w-full">
          <StatusBarBig status={agreement ? agreement.status : null} />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold leading-10">Proposta final</h1>
        <h2 className="text-lg font-medium leading-10">
          Confira a proposta final decidida entre a Reco e o inadimplente e baixe o
          documento.
        </h2>
        <DownloadButton acordo={agreement} devedor={tenant} condominio={condominium} />
      </div>
    </div>
  );
}
