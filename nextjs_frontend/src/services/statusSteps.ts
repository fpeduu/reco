import { StatusType } from "@/models/Acordos";

export function getStatusStep(status: StatusType) {
  switch (status) {
    case "Primeira proposta":
      return 2;
    case "Segunda proposta":
      return 3;
    case "Decisão do inadimplente":
      return 3;
    case "Proposta do inadimplente":
      return 3;
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