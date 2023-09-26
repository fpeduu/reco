"use client";

import { useState } from "react";

import { useProposalContext } from "@/contexts/ProposalContext";
import TenantModal from "../TenantModal/tenant-modal";
import { Devedor } from "@/models/Devedores";

interface DebtorCardProps {
  tenant: Devedor;
}

export default function DebtorCard({ tenant }: DebtorCardProps) {
  const context = useProposalContext();
  const [modalOpen, setModalOpen] = useState(false);

  function handleStartAgreement() {
    context.setDebtor(tenant);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`w-full py-4 px-8 flex flex-wrap items-center justify-between rounded-xl shadow bg-white`}
      >
        <div className="flex flex-col items-start gap-1 w-2/12">
          <span className="font-normal text-xl">{tenant.nome}</span>
        </div>
        <div className="w-28">
          <p className="font-normal">CPF:</p>
          <span className="text-xs font-light">{tenant.cpf}</span>
        </div>
        <div className="w-36 pb-1">
          <p className="font-normal">Condomínio:</p>
          <div className="flex items-center gap-1 pt-1 text-xs font-light">
            {tenant?.nomeCondominio}
          </div>
        </div>
        <div className="w-20 pb-1">
          <p className="font-normal">Atraso:</p>
          <div className="flex items-center gap-1 text-xs font-light">
            <span className="pt-1">
              {tenant.mensalidadesAtrasadas > 0
                ? `${tenant.mensalidadesAtrasadas} meses`
                : "Nenhum atraso"}
            </span>
          </div>
        </div>
        <div className="w-20 pb-1">
          <p className="font-normal">Dívida:</p>
          <div className="flex items-center gap-1 text-xs font-light">
            <span className="pt-1">
              R$ {tenant.valorDivida?.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
        <div className="w-44 flex items-center justify-end">
          <button
            className="w-full h-10  rounded-md text-white
                    text-s font-normal text-center bg-primary"
            onClick={handleStartAgreement}
          >
            Negociar
          </button>
        </div>
      </div>
      <TenantModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
