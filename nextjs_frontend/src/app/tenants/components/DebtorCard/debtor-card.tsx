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

  function handleStartAgreement() {
    context.setDebtor(tenant);
  }

  return (
    <div className="w-full py-4 px-8 flex items-center justify-between rounded-xl bg-white shadow">
      <div className="flex flex-col items-start gap-1 w-2/12">
        <span className="font-extrabold text-xl">{tenant.nome}</span>
      </div>
      <div className="w-24">
        <p className="font-medium">CPF:</p>
        <span className="text-xs font-medium">{tenant.cpf}</span>
      </div>
      <div className="w-52">
        <p className="font-medium">Local:</p>
        <span className="text-xs font-medium">{`Condomínio ${tenant.nomeCondominio}`}</span>
      </div>
      <div className="w-24">
        <p className="font-medium">Atraso:</p>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="pt-1">
            {tenant.mensalidadesAtrasadas > 0
              ? `${tenant.mensalidadesAtrasadas} meses`
              : "Nenhum atraso"}
          </span>
        </div>
      </div>
      <div className="w-44 flex items-center justify-end">
        <Link
          className="w-full py-3 px-5 rounded-md text-white
                     text-xs font-semibold text-center bg-red-600"
          href={`${serverURL}/tenants/${tenant.cpf}/`}
          onClick={handleStartAgreement}>
          Iniciar Negociação
        </Link>
      </div>
    </div>
  );
}
