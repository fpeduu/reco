import { StatusType } from "@/models/Acordos";

export function getStatusStep(status: StatusType) {
  switch (status) {
    case "Conversa iniciada":
      return 0; // Este passo ocorre ao mesmo tempo que o 2°
    case "Primeira proposta":
      return 1;
    case "Segunda proposta":
      return 2;
    case "Proposta do inadimplente":
      return 3; // Este passo ocorre ao mesmo tempo que o 5°
    case "Aguardando aprovação":
      return 4;
    case "Acordo recusado":
      return 5;
    case "Acordo aceito":
      return 5;
    default:
      return 0;
  }
}