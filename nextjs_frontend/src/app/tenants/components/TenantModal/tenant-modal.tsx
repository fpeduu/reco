"use client";

import React, { useEffect, useState } from "react";

import { RegrasProposta } from "@/models/Usuarios";
import { Acordo } from "@/models/Acordos";
import { serverURL } from "@/config";

import ModalContent, { INegotiationData } from "./components/Modal-content";
import Confirmation from "./components/Confirmation";
import { Devedor } from "@/models/Devedores";

interface TenantModalProps {
  open: boolean;
  debtor: Devedor;
  onClose: () => void;
}

async function fetchProposalInfos(cpf: string) {
  return await fetch(`${serverURL}/api/tenants/${cpf}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null 
    }) as RegrasProposta | null;
}

async function createAgreement(
  cpf: string,
  entrada: number,
  valorParcela: number,
  qtdParcelas: number
) {
  return await fetch(`${serverURL}/api/agreements/${cpf}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ entrada, valorParcela, qtdParcelas })
  }).then((response) => response.json())
    .catch((error) => {
        console.error(error);
        return null 
    }) as Acordo | null;
}

export default function TenantModal({
  open, onClose, debtor
}: TenantModalProps) {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [negotiation, setNegotiation] = useState<INegotiationData>({
    bestValue: 0, worstValue: 0, bestInstallments: 0,
    worstInstallments: 0, piorParcela: 0, melhorParcela: 0
  });

  async function onConfirm() {
    createAgreement(debtor.cpf, negotiation.bestValue,
                    negotiation.bestInstallments,
                    negotiation.melhorParcela as number
    ).then((data) => {
      if (data) {
        setConfirmed(true);
      } else {
        alert("Erro ao criar acordo");
        console.error(data);
      }
    });
  }

  useEffect(() => {
    if (open) fetchProposalInfos(debtor.cpf).then((data) => {
      if (data) {
        const value = debtor.valorDivida;
        let bestValue = 0, worstValue = 0;
        if (data.melhorEntrada) {
          bestValue = data.melhorEntrada * value;
        }
        if (data.piorEntrada) {
          worstValue = data.piorEntrada * value;
        }
        setNegotiation({
          bestValue,
          worstValue,
          piorParcela: data.piorParcela,
          melhorParcela: data.melhorParcela,
          bestInstallments: (value - bestValue) / data.melhorParcela,
          worstInstallments: (value - worstValue) / data.piorParcela
        })
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
          <div className="relative p-6 transform overflow-hidden rounded-2xl
                        bg-white text-left shadow-xl transition-all sm:my-8
                          sm:w-full sm:max-w-4xl">
            <button onClick={onClose}
              className="absolute top-10 right-14 text-5xl h-0
                        text-gray-500 hover:text-gray-700">
              &times;
            </button>
            {confirmed ?
            <Confirmation cpfDevedor={debtor.cpf}/> : 
            <ModalContent
              debtor={debtor}
              onClose={onClose}
              onConfirm={onConfirm}
              negotiationData={negotiation}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};
