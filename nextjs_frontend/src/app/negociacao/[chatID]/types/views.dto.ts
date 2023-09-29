import { NegotiationData } from "@/types/negotiation.dto";

export interface ChatProps {
  chatData: NegotiationData;
}

export interface GenericMessageProps {
  name: string,
  contact?: string
}

export interface AcceptProposalProps {
  author: string;
  value: number;
  debit: number;
  installment: number;
}

export interface UserInputMessageProps {
  value: number,
  reason: string,
  installment: number,
}

export interface UserInputProps {
  divida: number,
  onConfirm: (userInput: UserInputMessageProps) => void;
}