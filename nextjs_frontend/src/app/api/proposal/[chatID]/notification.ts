import io from 'socket.io-client';

import { apiURL } from "@/config";
import { Devedor } from "@/models/Devedores";
import { Acordo, StatusType } from "@/models/Acordos";
import { INotification } from "@/types/notification.dto";

function notificationMesssage(
  status: StatusType, accepted: boolean, historyLength: number
) {
  if (historyLength >= 4 && !accepted) {
    return {
      type: "Erro",
      message: "O inadimplente rejeitou todas as propostas!"
    }
  }
  if (historyLength === 3 && accepted) {
    return {
      type: "Aviso",
      message: "O inadimplente está propondo um acordo."
    }
  }
  if (status === "Aguardando aprovação") {
    return {
      type: "Sucesso",
      message: "Um acordo foi aceito e está aguardando sua aprovação."
    }
  }
    
  return {
    type: "Informação",
    message: `O inadimplente fez uma movimentação no acordo: ${status}`
  }
}

export function notificate(debtor: Devedor, agreement: Acordo) {
  if (agreement.status === "Acordo aceito" ||
      agreement.status === "Acordo recusado") return;

  const socket = io(apiURL as string, { transports: ['websocket'] });
  const length = agreement.historicoValores.length;
  const lastProposal = agreement.historicoValores[length - 1].aceito;

  const message = notificationMesssage(
    agreement.status, lastProposal, length
  );

  socket.emit("notificate", {
    condominiumName: debtor.nomeCondominio,
    email: debtor.emailAdministrador,
    message: message.message,
    tenantName: debtor.nome,
    type: message.type,
  } as INotification, () => {
    socket.close();
  })
}