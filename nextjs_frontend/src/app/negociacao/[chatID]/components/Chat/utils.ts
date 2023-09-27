import { NegotiationData } from "@/types/negotiation.dto";
import { Proposta } from "@/models/Acordos";

export interface IProposal extends Proposta {
  message: string;
  confirmMessage: string;
}

export function formatProposal(
  totalValue: number, value: number, installment: number
) {
  const newValue = totalValue * value;
  let proposalString = "";
  if (value > 0) {
    proposalString = `R$ ${newValue.toLocaleString("pt-br")} de entrada`;
    if (installment > 0) {
      proposalString += " e ";
    }
  } else {
    proposalString = "em ";
  }

  if (installment === 1) {
    proposalString += "à vista";
  } else if (installment > 1) {
    proposalString += `${installment} vezes`;
    const installmentValue = (totalValue - newValue) / installment;
    proposalString += ` de R$ ${installmentValue.toFixed(2)}`;
  }

  return proposalString;
}

export function firstProposal(chatData: NegotiationData) {
  const totalDebit = chatData.valorDivida.toLocaleString("pt-br");
  const bestValue = chatData.rules.melhorEntrada;
  const confirmMessage = formatProposal(
    chatData.valorDivida, bestValue,
    chatData.rules.melhorParcela
  );
  const firstInstallmentValue = (chatData.valorDivida
    - chatData.valorDivida * bestValue)
    / chatData.rules.melhorParcela;

  const proposalMessage = `Olá, <b>${chatData.nome}</b>! Detectamos uma pendência referente a <b>${chatData.mensalidadesAtrasadas} meses</b> de atraso, totalizando <b>R$ ${totalDebit}</b>. Estamos aqui para facilitar sua negociação. Nossa primeira proposta é para você pagar <b>${confirmMessage}</b>. O que acha?`;

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    entrada: bestValue,
    message: proposalMessage,
    confirmMessage: confirmMessage,
    valorParcela: firstInstallmentValue,
    qtdParcelas: chatData.rules.melhorParcela,
  };
  return proposal;
}

export function secondProposal(chatData: NegotiationData) {
  const firstInstallment = chatData.rules.melhorParcela;
  let currentInstallment = chatData.rules.piorParcela;
  let proposalMessage = `Entendido ${chatData.nome}. `;
  let currentValue = chatData.rules.piorEntrada;
  let installmentValue = (chatData.valorDivida
    - chatData.valorDivida * currentValue)
    / currentInstallment;
  let confirmMessage = "";

  if (firstInstallment === currentInstallment) {
    confirmMessage = formatProposal(
      chatData.valorDivida, currentValue, currentInstallment
    )
    proposalMessage += `Uma alternativa seria ${confirmMessage}. Essa opção lhe atende melhor?`;
  } else {
    currentValue = 0, currentInstallment = firstInstallment - 1;
    confirmMessage = formatProposal(
      chatData.valorDivida, 0, currentInstallment
    )
    installmentValue = chatData.valorDivida / currentInstallment;
    proposalMessage += `Uma alternativa seria <b>${confirmMessage}</b>. Essa opção lhe atende melhor?`;
  }

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    entrada: currentValue,
    message: proposalMessage,
    confirmMessage: confirmMessage,
    valorParcela: installmentValue,
    qtdParcelas: currentInstallment,
  };
  return proposal;
}

export function thirdProposal(chatData: NegotiationData) {
  const proposalMessage = `${chatData.nome}, vamos tentar chegar a um acordo. Informe abaixo um <b>valor de entrada</b> e a <b>quantidade de parcelas</b> que seriam ideais para você. E, se puder, <b>justifique sua proposta</b>.`;
  const proposal: IProposal = {
    autor: "User",
    aceito: false,
    entrada: 0,
    message: proposalMessage,
    confirmMessage: "",
    valorParcela: 0,
    qtdParcelas: 0,
  };
  return proposal;
}
