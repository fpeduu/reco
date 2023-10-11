"use client";

import React, { useEffect, useState } from "react";

import ModalInformation from "./Modal-information";
import { Devedor } from "@/models/Devedores";
import { RegrasProposta } from "@/models/Usuarios";
import UserInput from "@/components/UserInput/user-input";
import { IUserInput } from "@/components/UserInput/user-input.dto";
import LoadingBar from "@/components/Loading/loading";

export interface INegotiationData extends RegrasProposta {
  bestValue: number;
  worstValue: number;
  bestInstallments: number;
  worstInstallments: number;
}

interface ModalContentProps {
  rules: RegrasProposta;
  debtor: Devedor;
  onClose: () => void;
  onConfirm: (data: INegotiationData) => void;
  setRules: (data: RegrasProposta) => void;
}

export default function ModalContent({
  rules,
  debtor,
  onClose,
  onConfirm,
  setRules
}: ModalContentProps) {
  const [negotiation, setNegotiation] = useState<INegotiationData>();
  const [showEditor, setShowEditor] = useState<boolean>(false);

  function initializeValues(rules: RegrasProposta) {
    if (!rules) return;

    const { melhorEntrada, piorEntrada, melhorParcela, piorParcela } = rules;
    const value = debtor.valorDivida;
    let bestValue = 0,
      worstValue = 0;
    if (melhorEntrada) {
      bestValue = melhorEntrada * value;
    }
    if (piorEntrada) {
      worstValue = piorEntrada * value;
    }
    const bestInstallments = (value - bestValue) / Math.max(melhorParcela, 1);
    const worstInstallments = (value - worstValue) / Math.max(piorParcela, 1);

    setNegotiation({
      mesesAtraso: debtor.mensalidadesAtrasadas,
      melhorEntrada,
      melhorParcela,
      piorEntrada,
      piorParcela,

      bestValue,
      worstValue,
      bestInstallments,
      worstInstallments
    });
  }

  useEffect(() => {
    initializeValues(rules);
  }, [rules]);

  async function confirmUserInput({ installment, value }: IUserInput) {
    setRules({
      ...rules,
      piorEntrada: value / debtor.valorDivida,
      piorParcela: installment
    });

    setShowEditor(false);
  }

  function onHandleConfirm() {
    if (!negotiation) return;
    onConfirm(negotiation);
  }

  if (!rules || !negotiation) return <LoadingBar />;

  return (
    <div className="bg-white pt-16 md:p-16 flex justify-center">
      <div className="mt-3 max-w-2xl w-full gap-5 sm:ml-4 sm:mt-0 sm:text-left">
        <h1 className="font-medium text-4xl leading-10 text-center mb-2" id="modal-title">
          Confira as informações:
        </h1>
        <p className="text-base font-light text-center">
          Você escolheu negociar com o inadimplente abaixo. <br />
          Ao confirmar, geraremos um link redirecionando à negociação.
        </p>

        <div className="w-full my-8 gap-2 flex flex-col">
          <div
            className="flex-1 p-4 gap-10 flex flex-wrap items-center
                          min-h-max justify-start rounded-md shadow bg-tertiary">
            <div className="flex flex-col items-start gap-2 w-1/2">
              <span className="font-normal text-lg">{debtor.nome}</span>
              <span className="text-sm font-light">
                {debtor.cpf} | {debtor.nomeCondominio}
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 mr-20">
              <span className="font-normal text-sm">Dívida relativa:</span>
              <span className="text-sm font-light">{debtor.mensalidadesAtrasadas} meses</span>
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
              value={negotiation.bestValue}
              installments={negotiation.melhorParcela}
              installmentValue={negotiation.bestInstallments}
            />
            <ModalInformation
              showEdit={!showEditor}
              title="Valor de reserva"
              value={negotiation.worstValue}
              onEdit={() => setShowEditor(true)}
              installments={negotiation.piorParcela}
              installmentValue={negotiation.worstInstallments}
            />
          </div>
        </div>
        {showEditor ? (
          <UserInput
            showReason={false}
            divida={debtor.valorDivida}
            onConfirm={confirmUserInput}
            confirmText="Alterar proposta"
            title="Edite o valor de reserva"
            onCancel={() => setShowEditor(false)}
            containerStyles="md:w-full rounded-md"
          />
        ) : (
          <div className="flex flex-row justify-center place-items-center gap-5 w-full">
            <button
              onClick={onClose}
              className="md:w-1/2 py-3 px-2 rounded-full text-tertiary
              md:text-lg font-medium text-center bg-[#808080]">
              Cancelar
            </button>
            <button
              onClick={onHandleConfirm}
              className="md:w-1/2 py-3 px-2 rounded-full text-tertiary
              md:text-lg font-medium text-center bg-secondary">
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
