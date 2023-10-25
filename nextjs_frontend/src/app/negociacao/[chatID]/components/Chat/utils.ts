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

export function firstProposal({ nome, valorDivida, rules }: NegotiationData) {
  const totalDebit = valorDivida.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
  const bestValue = rules.melhorEntrada;
  const confirmMessage = formatProposal(
    valorDivida, bestValue, rules.melhorParcela
  );
  const firstInstallmentValue = (valorDivida - valorDivida * bestValue)
                                / rules.melhorParcela;

  const proposalMessage = `Olá, <b>${nome}</b>! Você tem uma pendência totalizando um valor de <b>${totalDebit}</b>. Nossa proposta é para você pagar <b>${confirmMessage}</b>. O que acha?`;

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    entrada: bestValue,
    message: proposalMessage,
    status: "Primeira proposta",
    denyText: "Recusar proposta",
    confirmText: `Pagar ${confirmMessage}`,
    valorParcela: firstInstallmentValue,
    qtdParcelas: rules.melhorParcela
  };
  return proposal;
}

export function secondProposal({ rules, valorDivida }: NegotiationData) {
  const firstInstallment = rules.melhorParcela;
  let currentInstallment = rules.piorParcela;
  let currentValue = rules.piorEntrada;
  let installmentValue =
    (valorDivida - valorDivida * currentValue) / currentInstallment;
  let confirmMessage = "";

  if (firstInstallment === currentInstallment) {
    confirmMessage = formatProposal(valorDivida, currentValue, currentInstallment);
  } else {
    currentValue = 0, currentInstallment = firstInstallment + 1;
    confirmMessage = formatProposal(valorDivida, 0, currentInstallment);
    installmentValue = valorDivida / currentInstallment;
  }
  const proposalMessage = `Uma alternativa seria <b>${confirmMessage}</b>. Essa opção lhe atende melhor?`;

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    entrada: currentValue,
    message: proposalMessage,
    status: "Segunda proposta",
    denyText: "Recusar proposta",
    confirmText: `Pagar ${confirmMessage}`,
    valorParcela: installmentValue,
    qtdParcelas: currentInstallment
  };
  return proposal;
}

export function thirdProposal({ valorDivida, rules }: NegotiationData) {
  const proposalMessage = `Vamos tentar chegar a um acordo: Informe abaixo um <b>valor de entrada</b> e a <b>quantidade de parcelas</b> que seriam ideais para você. E, se puder, <b>justifique sua proposta</b>.`;

  const confirmMessage = formatProposal(valorDivida,
    rules.piorEntrada, rules.piorParcela);
  const installmentValue = (valorDivida - valorDivida
    * rules.piorEntrada) / rules.piorParcela;
  const proposal: IProposal = {
    autor: "User",
    aceito: false,
    message: proposalMessage,
    entrada: rules.piorEntrada,
    denyText: "Recusar proposta",
    qtdParcelas: rules.piorParcela,
    valorParcela: installmentValue,
    status: "Proposta do inadimplente",
    confirmText: `Pagar ${confirmMessage}`,
  };
  return proposal;
}

export function restartProposal() {
  const proposalMessage = "Infelizmente não será possível enviar essa proposta para análise, gostaria de tentar novamente, ou sugerir uma nova proposta?"

  const proposal: IProposal = {
    autor: "Bot",
    aceito: false,
    message: proposalMessage,
    denyText: "Recomeçar negociação",
    status: "Decisão do inadimplente",
    confirmText: "Sugerir nova proposta",
    valorParcela: 0,
    qtdParcelas: 0,
    entrada: 0,
  };
  return proposal;
}
