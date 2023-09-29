import { Proposta } from "@/models/Acordos";

export interface IMessage {
  message: string;
  isBot: boolean;
  iteractive?: boolean;
  onConfirm?: () => void;
  onDeny?: () => void;
}

export interface IUserInput {
  value: number,
  reason: string,
  installment: number,
}

export interface IProposal extends Proposta {
  message: string;
  confirmMessage: string;
}