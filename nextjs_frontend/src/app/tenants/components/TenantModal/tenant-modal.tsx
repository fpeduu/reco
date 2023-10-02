"use client";

import React, { useEffect, useState } from "react";

import { RegrasProposta } from "@/models/Usuarios";
import { serverURL } from "@/config";

import ModalContent, { INegotiationData } from "./components/Modal-content";
import Confirmation from "./components/Confirmation";
import { Devedor } from "@/models/Devedores";
import LoadingBar from "@/components/Loading/loading";

interface TenantModalProps {
  open: boolean;
  debtor: Devedor | null;
  onClose: () => void;
  onConfirm: (
    debtor: Devedor,
    negotiation: INegotiationData
  ) => Promise<boolean>;
}

async function fetchProposalInfos(cpf: string) {
  return (await fetch(`${serverURL}/api/tenants/${cpf}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null;
    })) as RegrasProposta | null;
}

export default function TenantModal({
  open,
  debtor,
  onClose,
  onConfirm,
}: TenantModalProps) {
  const [rules, setRules] = useState<RegrasProposta>();
  const [confirmed, setConfirmed] = useState<boolean>(false);

  function handleClose() {
    setConfirmed(false);
    onClose();
  }

  async function handleConfirm(negotiation: INegotiationData) {
    if (!debtor) return;
    onConfirm(debtor, negotiation).then((isConfirmed) => {
      if (isConfirmed) {
        setConfirmed(true);
      } else {
        alert("Erro ao criar acordo");
        console.error(isConfirmed);
      }
    });
  }

  useEffect(() => {
    if (open && debtor)
      fetchProposalInfos(debtor.cpf).then((data) => {
        if (data) setRules(data);
      });
  }, [open]);

  if (!debtor && open) return <LoadingBar />;

  return (
    open && (
      <div
        className="relative z-40"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75
                      transition-opacity"
        ></div>

        <div className="fixed inset-0 z-10 h-screen overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4 text-center
                        sm:items-center sm:p-0"
          >
            <div
              className="relative p-6 transform overflow-hidden rounded-2xl
                        bg-white text-left shadow-xl transition-all sm:my-8
                          sm:w-full sm:max-w-4xl"
            >
              <button
                onClick={handleClose}
                className="absolute sm:top-10 right-8 sm:right-14 text-5xl h-0
                        text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>

              {confirmed
                ? debtor && <Confirmation cpfDevedor={debtor.cpf} />
                : debtor && (
                    <ModalContent
                      rules={rules!}
                      debtor={debtor}
                      setRules={setRules}
                      onClose={handleClose}
                      onConfirm={handleConfirm}
                    />
                  )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
