"use client";

import Link from "next/link";
import { serverURL } from "@/config";
import { useProposalContext } from "../../../../contexts/ProposalContext";
import { Condomino } from "../../../../models/Devedores";
import TenantModal from "../TenantModal/tenant-modal";
import { useState } from "react";

interface DebtorCardProps {
  tenant: Condomino;
  isModal: boolean;
}

export default function DebtorCard({ tenant, isModal }: DebtorCardProps) {
  const context = useProposalContext();
  const [modalOpen, setModalOpen] = useState(false);

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
    setModalOpen(true);
  }

  const closeModal = () => {
    console.log("card", modalOpen);
    setModalOpen(false);
  };

  const bgColorClass = isModal ? "bg-tertiary" : "bg-white";

  return (
    <div
      className={`w-full py-4 px-8 flex flex-wrap items-center justify-between rounded-xl shadow ${bgColorClass}`}
    >
      <TenantModal open={modalOpen} onClose={closeModal} />
      <div className="flex flex-col items-start gap-1 w-2/12">
        <span className="font-semibold text-xl">{tenant.nome}</span>
      </div>
      <div className="w-2/12">
        <p className="font-semibold">CPF:</p>
        <span className="text-xs font-oblique ">{tenant.cpf}</span>
      </div>
      <div className="w-44 pb-1">
        <p className="font-semibold">Local:</p>
        <div className="flex items-center gap-1 pt-1 text-xs font-oblique">
          {tenant.nomeCondominio}
        </div>
      </div>
      <div className="w-44 pb-1">
        <p className="font-semibold">Atraso:</p>
        <div className="flex items-center gap-1 text-xs font-oblique">
          <span className="pt-1">
            {tenant.mensalidadesAtrasadas > 0
              ? `${tenant.mensalidadesAtrasadas} dias de atraso`
              : "Nenhum atraso"}
          </span>
        </div>
      </div>
      {!isModal && (
        <div className="w-60 flex items-center justify-end">
          <button
            className="w-full h-10  rounded-md text-white
                     text-s font-semibold text-center bg-primary"
            onClick={handleStartAgreement}
          >
            Iniciar Negociação
          </button>
        </div>
      )}
    </div>
  );
}
