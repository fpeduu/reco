import { Proposta } from "@/models/Acordos";

export interface IMessage {
  message: string;
  isBot: boolean;
  denyText?: string;
  confirmText?: string;
  iteractive?: boolean;
  onConfirm?: () => void;
  onDeny?: () => void;

  isUserInput?: boolean;
  installment?: number;
  reason?: string;
  value?: number;
}

export interface IProposal extends Proposta {
  message: string;
  denyText: string;
  confirmText: string;
}