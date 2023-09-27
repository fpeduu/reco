import { StatusType } from "@/models/Acordos";

export function getStatusStep(status: StatusType) {
  switch (status) {
    case "Conversa iniciada":
      return 1;
    case "Primeira proposta":
      return 2;
    case "Segunda proposta":
      return 3;
    case "Proposta do inadimplente":
      return 4;
    case "Aguardando aprovação":
      return 5;
    case "Acordo recusado":
      return 6;
    case "Acordo aceito":
      return 6;
    default:
      return 0;
  }
}