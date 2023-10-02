import { NegotiationData } from "@/types/negotiation.dto";
import { IProposal } from "../../types/messages.dto";

export function formatProposal(totalValue: number, value: number, installment: number) {
  const newValue = totalValue * value;
  let proposalString = "";
  if (value > 0) {
    proposalString = `${newValue.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })} de entrada`;
    if (installment > 0) {
      proposalString += " e ";
    }
  } else if (installment > 1) {
    proposalString = "em ";
  }

  if (installment === 1) {
    proposalString += "à vista";
  } else if (installment > 1) {
    proposalString += `${installment} vezes`;
    const installmentValue = (totalValue - newValue) / installment;
    proposalString += ` de ${installmentValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}`;
  }

  return proposalString;
}

export function firstProposal(chatData: NegotiationData) {
  const totalDebit = chatData.valorDivida.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
  const bestValue = chatData.rules.melhorEntrada;
  const confirmMessage = formatProposal(
    chatData.valorDivida, bestValue,
    chatData.rules.melhorParcela
  );
  const firstInstallmentValue =
    (chatData.valorDivida - chatData.valorDivida * bestValue) / chatData.rules.melhorParcela;

  const proposalMessage = `Olá, <b>${chatData.nome}</b>! Detectamos uma pendência referente a <b>${chatData.mensalidadesAtrasadas} meses</b> de atraso, totalizando <b>${totalDebit}</b>. Estamos aqui para facilitar sua negociação. Nossa primeira proposta é para você pagar <b>${confirmMessage}</b>. O que acha?`;

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    entrada: bestValue,
    message: proposalMessage,
    confirmMessage: confirmMessage,
    valorParcela: firstInstallmentValue,
    qtdParcelas: chatData.rules.melhorParcela
  };
  return proposal;
}

export function secondProposal(chatData: NegotiationData) {
  const firstInstallment = chatData.rules.melhorParcela;
  let currentInstallment = chatData.rules.piorParcela;
  let proposalMessage = `Entendido ${chatData.nome}. `;
  let currentValue = chatData.rules.piorEntrada;
  let installmentValue =
    (chatData.valorDivida - chatData.valorDivida * currentValue) / currentInstallment;
  let confirmMessage = "";

  if (firstInstallment === currentInstallment) {
    confirmMessage = formatProposal(chatData.valorDivida, currentValue, currentInstallment);
  } else {
    currentValue = 0, currentInstallment = firstInstallment + 1;
    confirmMessage = formatProposal(chatData.valorDivida, 0, currentInstallment);
    installmentValue = chatData.valorDivida / currentInstallment;
  }
  proposalMessage += `Uma alternativa seria <b>${confirmMessage}</b>. Essa opção lhe atende melhor?`;

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    entrada: currentValue,
    message: proposalMessage,
    confirmMessage: confirmMessage,
    valorParcela: installmentValue,
    qtdParcelas: currentInstallment
  };
  return proposal;
}

export function thirdProposal(chatData: NegotiationData) {
  const proposalMessage = `${chatData.nome}, vamos tentar chegar a um acordo. Informe abaixo um <b>valor de entrada</b> e a <b>quantidade de parcelas</b> que seriam ideais para você. E, se puder, <b>justifique sua proposta</b>.`;

  const confirmMessage = formatProposal(chatData.valorDivida,
    chatData.rules.piorEntrada, chatData.rules.piorParcela);
  const installmentValue = (chatData.valorDivida - chatData.valorDivida
    * chatData.rules.piorEntrada) / chatData.rules.piorParcela;
  const proposal: IProposal = {
    autor: "User",
    aceito: false,
    entrada: chatData.rules.piorEntrada,
    message: proposalMessage,
    confirmMessage: confirmMessage,
    valorParcela: installmentValue,
    qtdParcelas: chatData.rules.piorParcela
  };
  return proposal;
}

export function lastProposalMessage(newProposal: string) {
  return "Sinto muito, mas este acordo não é viável para nós. O que você acha de tentarmos o seguinte acordo: <b>" + newProposal + "</b>?";
}