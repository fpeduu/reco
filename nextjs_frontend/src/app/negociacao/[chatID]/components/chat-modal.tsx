"use client";

import { useChatContext } from "../contexts/chat-context";
import React, { useCallback, useState } from "react";
import Modal from "@/components/Modal/modal";

interface ChatModalProps {
  cpf: string;
}

export default function ChatModal({ cpf }: ChatModalProps) {
  const [confirmCode, setConfirmCode] = useState<string>("");
  const { isAllowed, setIsAllowed } = useChatContext();

  const handleChangeCode = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmCode(event.target.value);
  }, []);

  function confirmPassword() {
    const lastCpfNumbers = cpf.replace(/\D/g, "").slice(-4);
    const isConfirmed = confirmCode === lastCpfNumbers;
    if (isConfirmed) setIsAllowed(true);
    else setConfirmCode("");
  }

  return (
    <Modal open={!isAllowed}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold p-2 mt-3">
            Digite os últimos 4 dígitos do seu CPF para confirmar a negociação
          </p>
          <input type="text" className="w-full border-tertiary 
              border-2 rounded-sm text-lg font-light p-2 mt-4
              overflow-x-auto break-keep whitespace-nowrap text-center"
              maxLength={4} placeholder="0000"
              value={confirmCode} onChange={handleChangeCode}/>
          <button className="bg-primary text-white rounded-sm
                                p-2 mt-4 disabled:bg-tertiary"
            disabled={confirmCode.length !== 4}
            onClick={confirmPassword}>
            Confirmar
          </button>
        </div>
      </div>
    </Modal>   
  )
}