"use client";

import Link from "next/link";
import { serverURL } from "@/config";
import { useProposalContext } from "../../../../contexts/ProposalContext";
import { Condomino } from "../../../../models/Devedores";

interface DebtorCardProps {
  tenant: Condomino;
}

export default function DebtorCard({ tenant }: DebtorCardProps) {
  const context = useProposalContext();

  function getStatusColor() {
    let lateTuitions = tenant.mensalidadesAtrasadas;
    if (lateTuitions > 3) lateTuitions = 3;
    return `bg-status-${lateTuitions}`;
  }

  function getProfileText() {
    switch (tenant.mensalidadesAtrasadas) {
      case 0:
        return "Nunca atrasa";
      case 1:
        return "Atrasa por pouco tempo";
      case 2:
        return "Atrasa por algum tempo";
      default:
        return "Atrasa por muito tempo";
    }
  }

  function handleStartAgreement() {
    context.setDebtor(tenant);
  }

  return (
    <div className="w-full py-4 px-8 flex items-center justify-between rounded-xl bg-white shadow">
      <div className="flex flex-col items-start gap-1 w-4/12">
        <span className="font-extrabold text-xl">
          {tenant.nome}
        </span>
        <span className="text-xs text-neutral-400 font-medium">
          {tenant.nomeCondominio}
        </span>
      </div>
      <div className="w-24">
        <p className="font-medium">CPF:</p>
        <span className="text-xs font-medium">
          {tenant.cpf}
        </span>
      </div>
      <div className="w-44">
        <p className="font-medium">Perfil:</p>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className={`w-5 h-5 rounded-full
                          ${getStatusColor()}`}
          />
          {getProfileText()}
        </div>
      </div>
      <div className="w-44">
        <p className="font-medium">Atraso:</p>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="pt-1">
            {tenant.mensalidadesAtrasadas > 0
              ? `${tenant.mensalidadesAtrasadas} dias de atraso`
              : "Nenhum atraso"}
          </span>
        </div>
      </div>
      <div className="w-36 flex items-center justify-end">
        <Link
          className="w-full py-3 px-5 rounded-xl text-white
                     text-xs font-semibold text-center bg-gray-950"
          href={`${serverURL}/tenants/${tenant.cpf}/`}
          onClick={handleStartAgreement}>
          Iniciar Acordo
        </Link>
      </div>
    </div>
  );
}
