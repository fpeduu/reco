"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useProposalContext } from "@/contexts/ProposalContext";
import DebtorCard from "@/components/DebtorCard/debtor-card";
import { RegrasProposta } from "@/models/Usuarios";
import { serverURL } from "@/config";

interface TenantModalProps {
  open: boolean;
  onClose: () => void;
}

async function fetchProposalInfos(cpf: string) {
    return await fetch(`${serverURL}/api/proposal/${cpf}/`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
            return null 
        }) as RegrasProposta | null;
}

export default function TenantModal({ open, onClose }: TenantModalProps) {
  const router = useRouter();
  const { debtor } = useProposalContext();

  const [tenantInfo, setTenantInfo] = useState<RegrasProposta>();
  const [bestValue, setBestValue] = useState<number>(0);
  const [worstValue, setWorstValue] = useState<number>(0);

  function handleStartAgreement() {
    // router.push(`${serverURL}/proposal/${debtor.cpf}`);
  }

  useEffect(() => {
    if (open) fetchProposalInfos(debtor.cpf).then((data) => {
      if (data) {
        setTenantInfo(data);
        if (data.melhorEntrada) {
          setBestValue(data.melhorEntrada * debtor.valorDivida);
        }
        if (data.piorEntrada) {
          setWorstValue(data.piorEntrada * debtor.valorDivida);
        }
      }
    });
  }, [open]);

  return open && (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75
                      transition-opacity">
      </div>

      <div className="fixed inset-0 z-10 h-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center
                        sm:items-center sm:p-0">
          <div className="relative p-8 transform overflow-hidden rounded-2xl
                        bg-white text-left shadow-xl transition-all sm:my-8
                          sm:w-full sm:max-w-5xl">
            <div className="bg-white sm:p-6 sm:pb-4">
              <div className="flex justify-center">
                <button onClick={onClose}
                  className="absolute top-2 right-6 text-5xl h-0
                           text-gray-500 hover:text-gray-700">
                  &times;
                </button>

                <div className="mt-3 max-w-2xl w-full gap-5 sm:ml-4 sm:mt-0 sm:text-left">
                  <h1 className="font-medium text-4xl leading-10 text-center mb-2" 
                      id="modal-title">
                    Confira as informações:
                  </h1>
                  <p className="text-base font-light text-center">
                    Você escolheu negociar com o inadimplente abaixo. <br/>
                    Ao confirmar, geraremos um link redirecionando à negociação.
                  </p>

                  <div className="w-full my-8 gap-2 flex">
                    <div className="flex-1 p-8 gap-2 flex flex-wrap items-center min-h-max
                                    justify-between rounded-xl shadow bg-tertiary">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-normal text-lg">
                          {debtor.nome}
                        </span>
                        <span className="text-xs font-light">
                          {debtor.cpf} | {debtor.nomeCondominio}
                        </span>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-normal text-xs">
                          Atraso:
                        </span>
                        <span className="text-xs font-light">
                          {debtor.mensalidadesAtrasadas} meses
                        </span>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-normal text-xs">
                          Dívida:
                        </span>
                        <span className="text-xs font-light">
                          R$ {debtor.valorDivida?.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </div>
                    <div className="gap-2 flex flex-col items-center w-max">
                      <div className="flex flex-col gap-1 p-4
                                    bg-tertiary rounded-xl shadow">
                        <span className="font-normal text-xs">
                          Melhor proposta:
                        </span>
                        <span className="text-xs font-light whitespace-nowrap">
                          <b>Entrada:</b> R$ {bestValue.toLocaleString("pt-BR")} <br/>
                          Parcelado em {tenantInfo?.melhorParcela} meses
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 p-4
                                    bg-tertiary rounded-lg shadow">
                        <span className="font-normal text-xs">
                          Valor reserva:
                        </span>
                        <span className="text-xs font-light whitespace-nowrap">
                          <b>Entrada:</b> R$ {worstValue.toLocaleString("pt-BR")} <br/>
                          Parcelado em {tenantInfo?.piorParcela} meses
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center place-items-center gap-5 w-full">
                    <button
                      onClick={handleStartAgreement}
                      className="w-1/2 py-3 px-2 rounded-full text-tertiary
                        text-lg font-medium text-center bg-secondary">
                      Confirmar
                    </button>
                    <button
                      onClick={onClose}
                      className="w-1/2 py-3 px-2 rounded-full text-tertiary
                        text-lg font-medium text-center bg-[#808080]">
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
