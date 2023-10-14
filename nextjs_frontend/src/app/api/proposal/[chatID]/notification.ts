import io from "socket.io-client";

import { apiURL } from "@/config";
import { Devedor } from "@/models/Devedores";
import { Acordo, StatusType } from "@/models/Acordos";
import { INotification } from "@/types/notification.dto";

function notificationMesssage(status: StatusType) {
  if (status === "Aguardando aprovação") {
    return {
      type: "Sucesso",
      message: "Um acordo foi aceito e está aguardando sua aprovação."
    };
  }

  return {
    type: "Informação",
    message: `O inadimplente fez uma movimentação no acordo: ${status}`
  };
}

export function notificate(debtor: Devedor, agreement: Acordo) {
  if (agreement.status === "Acordo aceito" || agreement.status === "Acordo recusado") return;

  const socket = io(apiURL as string, { transports: ["websocket"] });
  const length = agreement.historicoValores.length;
  const lastProposalStatus = agreement.historicoValores[length - 1].status;

  const message = notificationMesssage(lastProposalStatus);

  socket.emit(
    "notificate",
    {
      condominiumName: debtor.nomeCondominio,
      email: debtor.emailAdministrador,
      message: message.message,
      tenantName: debtor.nome,
      tenantCpf: debtor.cpf,
      type: message.type
    } as INotification,
    () => {
      socket.close();
    }
  );
}
