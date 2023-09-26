"use client";

import React from "react";

import { useProposalContext } from "@/contexts/ProposalContext";
import ModalInformation from "./Modal-information";

export interface NegotiationData {
  melhorParcela?: number;
  piorParcela?: number;
  bestValue: number;
  worstValue: number;
  bestInstallments: number;
  worstInstallments: number;
}

interface ModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  negotiationData: NegotiationData;
}

export default function ModalContent({
  onClose, onConfirm, negotiationData
}: ModalContentProps) {
  const { debtor } = useProposalContext();

  const { melhorParcela, piorParcela, bestValue, worstValue, 
    bestInstallments, worstInstallments } = negotiationData;

  return (
    <div className="bg-white p-16 flex justify-center">
      <div className="mt-3 max-w-2xl w-full gap-5 sm:ml-4 sm:mt-0 sm:text-left">
        <h1 className="font-medium text-4xl leading-10 text-center mb-2" 
            id="modal-title">
          Confira as informações:
        </h1>
        <p className="text-base font-light text-center">
          Você escolheu negociar com o inadimplente abaixo. <br/>
          Ao confirmar, geraremos um link redirecionando à negociação.
        </p>

        <div className="w-full my-8 gap-2 flex flex-col">
          <div className="flex-1 p-4 gap-10 flex flex-wrap items-center
                          min-h-max justify-start rounded-md shadow bg-tertiary">
            <div className="flex flex-col items-start gap-2 mr-auto">
              <span className="font-normal text-lg">
                {debtor.nome}
              </span>
              <span className="text-sm font-light">
                {debtor.cpf} | {debtor.nomeCondominio}
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-normal text-sm">
                Atraso:
              </span>
              <span className="text-sm font-light">
                {debtor.mensalidadesAtrasadas} meses
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-normal text-sm">
                Dívida:
              </span>
              <span className="text-sm font-light">
                R$ {debtor.valorDivida?.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
          <div className="gap-2 flex items-center w-full">
            <ModalInformation
              title="Melhor proposta"
              value={bestValue}
              installments={melhorParcela}
              installmentValue={bestInstallments}
            />
            <ModalInformation
              title="Valor reserva"
              value={worstValue}
              installments={piorParcela}
              installmentValue={worstInstallments}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center place-items-center gap-5 w-full">
          <button
            onClick={onConfirm}
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
  )
}