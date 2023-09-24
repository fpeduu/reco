"use client";

import { useProposalContext } from "../../contexts/ProposalContext";
import { Devedor } from "../../models/Devedores";
import TenantModal from "../../app/tenants/components/TenantModal/tenant-modal";
import { useState } from "react";

interface DebtorCardProps {
  tenant: Devedor;
  isModal: boolean;
  isInteractive: boolean;
}

export default function DebtorCard({
  tenant,
  isModal,
  isInteractive,
}: DebtorCardProps) {
  const context = useProposalContext();
  const [modalOpen, setModalOpen] = useState(false);

  function handleStartAgreement() {
    context.setDebtor(tenant);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const bgColorClass = isModal ? "bg-tertiary" : "bg-white";

  return (
    <>
      <div
        className={`w-full py-4 px-8 flex flex-wrap items-center justify-between rounded-xl shadow ${bgColorClass}`}
      >
        <div className="flex flex-col items-start gap-1 w-2/12">
          <span className="font-semibold text-xl">{tenant.nome}</span>
        </div>
        <div className="w-28">
          <p className="font-semibold">CPF:</p>
          <span className="text-xs font-medium ">{tenant.cpf}</span>
        </div>
        <div className="w-36 pb-1">
          <p className="font-semibold">Condomínio:</p>
          <div className="flex items-center gap-1 pt-1 text-xs font-medium">
            {tenant?.nomeCondominio}
          </div>
        </div>
        <div className="w-20 pb-1">
          <p className="font-semibold">Atraso:</p>
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className="pt-1">
              {tenant.mensalidadesAtrasadas > 0
                ? `${tenant.mensalidadesAtrasadas} meses`
                : "Nenhum atraso"}
            </span>
          </div>
        </div>
        <div className="w-20 pb-1">
          <p className="font-semibold">Dívida:</p>
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className="pt-1">
              R$ {tenant.valorDivida?.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
        {isInteractive && (
          <div className="w-44 flex items-center justify-end">
            <button
              className="w-full h-10  rounded-md text-white
                     text-s font-semibold text-center bg-primary"
              onClick={handleStartAgreement}
            >
              Negociar
            </button>
          </div>
        )}
      </div>
      <TenantModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
