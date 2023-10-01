"use client";

import React, { useState } from "react";

import ModalInformation from "./Modal-information";
import { Devedor } from "@/models/Devedores";

export interface INegotiationData {
  melhorParcela?: number;
  piorParcela?: number;
  bestValue: number;
  worstValue: number;
  bestInstallments: number;
  worstInstallments: number;
}

interface ModalContentProps {
  debtor: Devedor;
  onClose: () => void;
  onConfirm: () => void;
  negotiationData: INegotiationData;
  setNegotiationData: (data: INegotiationData) => void;
}

export default function ModalContent({
  onClose,
  onConfirm,
  negotiationData,
  debtor,
  setNegotiationData,
}: ModalContentProps) {
  const {
    melhorParcela,
    bestValue,
    bestInstallments,
    piorParcela,
    worstInstallments,
    worstValue,
  } = negotiationData;

  const setWorstValues = (newValue: number, newParcela: number) => {
    const totalValue =
      bestValue + (melhorParcela ? melhorParcela * bestInstallments : 0);

    if (newValue > totalValue) {
      alert(
        "A entrada é maior que o valor total da dívida. Por favor, insira um valor menor."
      );

      return false;
    }

    if (newValue === totalValue && newParcela > 0) {
      alert(
        "A entrada é igual ao valor total da dívida. Por favor, insira um valor menor ou coloque o número de parcelas como zero."
      );
      return false;
    }

    if (newValue < totalValue && newParcela === 0) {
      alert(
        "A entrada é menor que o valor total da dívida. Por favor, insira um valor maior ou coloque o número de parcelas como maior que zero."
      );
      return false;
    }

    setNegotiationData({
      ...negotiationData,
      worstValue: newValue,
      worstInstallments: (totalValue - newValue) / newParcela,
      piorParcela: newParcela,
    });

    return true;
  };

  return (
    <div className="bg-white pt-16 md:p-16 flex justify-center">
      <div className="mt-3 max-w-2xl w-full gap-5 sm:ml-4 sm:mt-0 sm:text-left">
        <h1
          className="font-medium text-4xl leading-10 text-center mb-2"
          id="modal-title"
        >
          Confira as informações:
        </h1>
        <p className="text-base font-light text-center">
          Você escolheu negociar com o inadimplente abaixo. <br />
          Ao confirmar, geraremos um link redirecionando à negociação.
        </p>

        <div className="w-full my-8 gap-2 flex flex-col">
          <div
            className="flex-1 p-4 gap-10 flex flex-wrap items-center
                          min-h-max justify-start rounded-md shadow bg-tertiary"
          >
            <div className="flex flex-col items-start gap-2 w-1/2">
              <span className="font-normal text-lg">{debtor.nome}</span>
              <span className="text-sm font-light">
                {debtor.cpf} | {debtor.nomeCondominio}
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 mr-20">
              <span className="font-normal text-sm">Atraso:</span>
              <span className="text-sm font-light">
                {debtor.mensalidadesAtrasadas} meses
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="font-normal text-sm">Dívida:</span>
              <span className="text-sm font-light">
                R$ {debtor.valorDivida?.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
          <div className="gap-2 flex flex-wrap lg:flex-nowrap items-center w-full">
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
              editable
              setValues={setWorstValues}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center place-items-center gap-5 w-full">
          <button
            onClick={onConfirm}
            className="md:w-1/2 py-3 px-2 rounded-full text-tertiary
              md:text-lg font-medium text-center bg-secondary"
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="md:w-1/2 py-3 px-2 rounded-full text-tertiary
              md:text-lg font-medium text-center bg-[#808080]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
