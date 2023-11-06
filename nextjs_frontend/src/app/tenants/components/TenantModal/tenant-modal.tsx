"use client";

import React, { useEffect, useState } from "react";

import { RegrasProposta } from "@/models/Usuarios";
import { serverURL } from "@/config";

import ModalContent, {
  INegotiationData
} from "./components/Modal-content";
import Confirmation from "./components/Confirmation";
import SnackBar from "@/components/SnackBar/snack-bar";
import LoadingBar from "@/components/Loading/loading";
import { Devedor } from "@/models/Devedores";
import Modal from "@/components/Modal/modal";

interface TenantModalProps {
  open: boolean;
  debtor: Devedor | null;
  onClose: () => void;
  onConfirm: (
    debtor: Devedor,
    negotiation: INegotiationData
  ) => Promise<string | null>;
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
  const [identifier, setIdentifier] = useState<string>("");
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  function handleClose() {
    setIdentifier("");
    onClose();
  }

  async function handleConfirm(negotiation: INegotiationData) {
    if (!debtor) return;
    onConfirm(debtor, negotiation).then((newIdentifier) => {
      if (newIdentifier !== null) {
        setIdentifier(newIdentifier);
      } else {
        setSnackbarMessage("Erro ao iniciar acordo, contacte o suporte");
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
    <Modal open={open} onClose={handleClose}>
      <SnackBar message={snackbarMessage} type={"error"} />
      <button
        onClick={handleClose}
        className="absolute sm:top-10 right-8 sm:right-14 text-5xl
                    h-0 text-gray-500 hover:text-gray-700">
        &times;
      </button>

      {identifier !== ""
        ? debtor && <Confirmation identifier={identifier} />
        : debtor && (
            <ModalContent
              rules={rules!}
              debtor={debtor}
              setRules={setRules}
              onClose={handleClose}
              onConfirm={handleConfirm}
            />
          )}
      </Modal>
    )
}
