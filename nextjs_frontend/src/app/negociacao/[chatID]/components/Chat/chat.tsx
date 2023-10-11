"use client";

import { serverURL } from "@/config";
import { useEffect, useState } from "react";

import { Acordo, Proposta } from "@/models/Acordos";

import { ChatProps } from "../../types/views.dto";
import { IMessage, IProposal } from "../../types/messages.dto";
import { IUserInput } from "@/components/UserInput/user-input.dto";

import {
  firstProposal,
  secondProposal,
  thirdProposal,
  restartProposal,
} from "./utils";

import Message from "../Message/message";
import {
  AcceptProposal,
  ProposalDenied,
  UserInputMessage,
  WaitForApproval,
} from "../Message/messages";
import UserInput from "@/components/UserInput/user-input";

import Styles from "./chat.module.scss";

async function updateProposal(chatID: string, data: Proposta) {
  return (await fetch(`${serverURL}/api/proposal/${chatID}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null;
    })) as Acordo | null;
}

export default function Chat({ chatData }: ChatProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(
    chatData.status === "Aguardando aprovação"
  );
  const [isDenied, setIsDenied] = useState<boolean>(
    chatData.status === "Acordo recusado"
  );

  const proposalsQuestions: IProposal[] = [
    firstProposal(chatData),
    secondProposal(chatData),
    thirdProposal(chatData),
    restartProposal(),
  ];
  const proposalsResponses: [() => void, () => void][] = [
    [onConfirmFirstProposal, onDenyFirstProposal],
    [onConfirmSecondProposal, onDenySecondProposal],
    [onRetryUserProposal, onRestartNegotiation],
    [onRetryUserProposal, onRestartNegotiation],
  ]
  const [showUserInput, setShowUserInput] = useState<boolean>(false);

  const lastProposalIdx = chatData.proposals.length - 1;
  const lastProposal = chatData.proposals[lastProposalIdx] || {
    aceito: false,
    entrada: 0,
    qtdParcelas: 0,
    valorParcela: 0,
  };

  useEffect(() => {
    function getIndexByStatus(proposal: Proposta | undefined) {
      switch (proposal && proposal.status) {
        case "Primeira proposta":
          return 0;
        case "Segunda proposta":
          return 1;
        case "Proposta do inadimplente":
          return 2;
        default:
          return -1;
      }
    }

    const newMessages: IMessage[] = [];
    const proposalFinished = isWaiting ||
      chatData.status === "Acordo aceito" ||
      chatData.status === "Acordo recusado" ||
      chatData.status === "Aguardando aprovação";
    
    let index = 0;
    do {
      if (index - 1 === lastProposalIdx && proposalFinished) {
        break;
      }
      const proposal = chatData.proposals[index];
      let i = getIndexByStatus(proposal);
      if (i === -1) {
        i = getIndexByStatus(chatData.proposals[index - 1]) + 1;
      }
      const isUserProposal = i === 2 ||
            proposal?.autor === "User";
      const { message, confirmText, denyText } = proposalsQuestions[i];

      newMessages.push({
        isBot: true,
        message, denyText, confirmText,
        onDeny: proposalsResponses[i][1],
        onConfirm: proposalsResponses[i][0],
        iteractive: lastProposalIdx === index - 1 &&
                !proposalFinished && !isUserProposal,
      });

      if (index > lastProposalIdx && !isUserProposal) break;

      if (index - 1 === lastProposalIdx) {
        setShowUserInput(true);
      } else {
        const answer = proposal.aceito ? confirmText : denyText;
        const message: IMessage = {
          message: answer, isBot: false
        };
        if (isUserProposal) {
          message.isUserInput = true;
          message.value = proposal.entrada;
          message.installment = proposal.qtdParcelas;
          message.reason = proposal.motivo as string;
        }
        newMessages.push(message);
      }
    } while ((chatData.proposals.length + 1) > ++index);

    setMessages(newMessages);
  }, [chatData]);

  async function onConfirmPredefinedProposal(index: number) {
    setIsLoading(true);
    const {
      entrada, qtdParcelas, status,
      valorParcela, confirmText,
    } = proposalsQuestions[index];
    setMessages((prevMessages) => [
      ...prevMessages, {
      message: confirmText,
      isBot: false,
    }]);

    await updateProposal(chatData.cpf, {
      aceito: true, autor: "Bot",
      status: "Aguardando aprovação",
      valorParcela, qtdParcelas, entrada,
    });
    setIsLoading(false);
    setIsWaiting(true);
  }

  function onConfirmFirstProposal() {
    onConfirmPredefinedProposal(0);
  }
  function onConfirmSecondProposal() {
    onConfirmPredefinedProposal(1);
  }

  function onRetryUserProposal() {
    setIsLoading(true);
    const { confirmText } = proposalsQuestions[3];
    setMessages((prevMessages) => [...prevMessages,
    { message: confirmText, isBot: false }, {
      message: proposalsQuestions[2].message,
      isBot: true, iteractive: false,
    }]);
    setShowUserInput(true);
    setIsLoading(false);
  }

  async function onDenyPredefinedProposal(index: number) {
    setIsLoading(true);
    const { entrada, qtdParcelas, valorParcela, status,
            denyText: userDenyText } = proposalsQuestions[index];
    const userAnswer = { message: userDenyText, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userAnswer]);

    const isWorstProposal = qtdParcelas === chatData.rules.piorParcela;

    // If accept, stop proposals
    await updateProposal(chatData.cpf, {
      aceito: isWorstProposal,
      autor: "Bot", valorParcela,
      status, entrada, qtdParcelas,
    });
    setIsLoading(false);

    if (isWorstProposal) {
      return setIsDenied(true);
    }

    const {
      autor, message, confirmText, denyText
    } = proposalsQuestions[index + 1];
    setMessages((prevMessages) => [...prevMessages, {
      message, isBot: true,
      confirmText, denyText, 
      iteractive: autor === "Bot",
      onConfirm: () => onConfirmPredefinedProposal(index + 1),
      onDeny: () => onDenyPredefinedProposal(index + 1),
    }]);
    if (autor === "User") {
      setShowUserInput(true);
    }
  }

  function onDenyFirstProposal() {
    onDenyPredefinedProposal(0);
  }

  function onDenySecondProposal() {
    onDenyPredefinedProposal(1);
  }

  async function onRestartNegotiation() {
    const { confirmText: userConfirmText } = proposalsQuestions[2];
    const { message, confirmText, denyText } = proposalsQuestions[0];
    setMessages((prevMessages) => [...prevMessages, {
      message: userConfirmText,
      isBot: false,
    },
    {
      isBot: true,
      message: message,
      iteractive: true,
      confirmText, denyText,
      onDeny: onDenyFirstProposal,
      onConfirm: onConfirmFirstProposal,
    }]);
  }

  async function confirmUserInput({ installment, reason, value }: IUserInput) {
    setIsLoading(true);
    setShowUserInput(false);
    setMessages((prevMessages) => [
      ...prevMessages, {
      isUserInput: true,
      isBot: false, message: "",
      installment, reason, value
    }]);
    const canBeAccepted = installment <= chatData.rules.piorParcela;
    const installmentValue = (chatData.valorDivida - value)
                             / Math.max(installment, 1);
    const status = canBeAccepted ? "Aguardando aprovação" :
                   "Proposta do inadimplente";
    await updateProposal(chatData.cpf, {
      autor: "User",
      entrada: value,
      aceito: canBeAccepted,
      motivo: reason, status,
      qtdParcelas: installment,
      valorParcela: installmentValue,
    });
    setIsLoading(false);

    if (canBeAccepted) {
      setIsWaiting(true);
    } else {
      const index = proposalsQuestions.length - 1;
      const newMessage = proposalsQuestions[index];
      setMessages((prevMessages) => [
        ...prevMessages, {
        isBot: true,
        iteractive: true,
        message: newMessage.message,
        denyText: newMessage.denyText,
        confirmText: newMessage.confirmText,
        onConfirm: onRetryUserProposal,
        onDeny: onRestartNegotiation,
      }]);
    }
  }

  return (
    <div className={Styles.chat}>
      <div className="overflow-y-scroll flex-1">
        {messages.map((messageData, index) => (
          <Message
            key={index} iteractive={
              index === messages.length - 1 &&
              !isWaiting && !isLoading &&
              messageData.iteractive
            }
            acceptText={messageData.confirmText}
            onConfirm={messageData.onConfirm}
            denyText={messageData.denyText}
            onDeny={messageData.onDeny}
            isBot={messageData.isBot}
          >
            {messageData.isUserInput ? (
              <UserInputMessage
                value={messageData.value!}
                reason={messageData.reason!}
                installment={messageData.installment!}
              />
            ):
            <span dangerouslySetInnerHTML={{ __html: messageData.message }}/>}
          </Message>
        ))}
        {isWaiting && (
          <Message isBot={true} iteractive={false}>
            <WaitForApproval name={chatData.nome} />
          </Message>
        )}
        {chatData.status === "Acordo aceito" && (
          <Message isBot={true} iteractive={false}>
            <AcceptProposal
              value={lastProposal.entrada}
              debit={chatData.valorDivida}
              author={lastProposal.autor}
              installment={lastProposal.qtdParcelas}
            />
          </Message>
        )}
        {isDenied && (
          <Message isBot={true} iteractive={false}>
            <ProposalDenied name={chatData.nome} contact={chatData.contact} />
          </Message>
        )}
        {isLoading && (
          <Message isBot={true} iteractive={false}>
            Digitando...
          </Message>
        )}
      </div>
      {showUserInput && (
        <UserInput
          divida={chatData.valorDivida}
          onConfirm={confirmUserInput}
          showReason={true}
        />
      )}
    </div>
  );
}
