"use client";

import { serverURL } from "@/config";
import { useEffect, useState } from "react";

import { Acordo, Proposta } from "@/models/Acordos";
import { ChatProps } from "../../types/views.dto";
import { IMessage, IUserInput, IProposal } from "../../types/messages.dto";
import {
  firstProposal,
  secondProposal,
  thirdProposal,
  lastProposalMessage
} from "./utils";

import Message from "../Message/message";
import {
  AcceptProposal,
  ProposalDenied,
  UserInputMessage,
  WaitForApproval
} from "../Message/messages";
import UserInput from "../UserInput/user-input";

async function updateProposal(chatID: string, data: Proposta) {
  return await fetch(`${serverURL}/api/proposal/${chatID}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null
    }) as Acordo | null;
}

export default function Chat({ chatData }: ChatProps) {
  const proposals: IProposal[] = [ firstProposal(chatData),
    secondProposal(chatData), thirdProposal(chatData)
  ];
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(
    chatData.status === "Aguardando aprovação"
  );
  const [isDenied, setIsDenied] = useState<boolean>(
    chatData.status === "Acordo recusado"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUserInput, setShowUserInput] = useState<boolean>(false);
  const [userProposal, setUserProposal] = useState<IUserInput>({
    installment: 0, reason: "", value: 0,
  });

  const lastProposalIdx = chatData.proposals.length - 1;
  const lastProposal = chatData.proposals[lastProposalIdx] || {
    aceito: false, entrada: 0, qtdParcelas: 0, valorParcela: 0,
  };

  useEffect(() => {
    const predefinedfunctions = [
      [onConfirmFirstProposal, onDenyFirstProposal],
      [onConfirmSecondProposal, onDenySecondProposal],
    ]

    const newMessages: IMessage[] = [];
    const proposalFinished = chatData.status === "Acordo aceito"
                        || chatData.status === "Acordo recusado";
    let i = 0;
    do {
      newMessages.push({
        message: proposals[i].message, isBot: true,
        iteractive: lastProposalIdx === i - 1 && !proposalFinished,
        onConfirm: predefinedfunctions[i][0],
        onDeny: predefinedfunctions[i][1],
      });
      if (i > lastProposalIdx) break;

      const wasAccepted = chatData.proposals[i].aceito;
      const answer = !wasAccepted ? "Recusar acordo" :
                      `Pagar ${proposals[i].confirmMessage}`;
      newMessages.push({ message: answer, isBot: false });
      i++;
    } while (i < predefinedfunctions.length &&
             (i <= lastProposalIdx || !proposalFinished));

    if (lastProposalIdx >= 1 && !chatData.proposals[1].aceito) {
      const thirdProposalData = thirdProposal(chatData);
      newMessages.push({
        message: thirdProposalData.message,
        isBot: true, iteractive: false,
      });
      if (lastProposalIdx === 1) {
        setShowUserInput(true);
      } else {
        const lastestProposalIdx = 2;
        const lastChooseIdx = lastestProposalIdx + 1;
        const userProposal = chatData.proposals[lastestProposalIdx];
        setUserProposal({
          installment: userProposal.qtdParcelas,
          reason: userProposal.motivo as string,
          value: userProposal.entrada,
        })

        const canChoose = chatData.proposals.length === lastChooseIdx;
        if (!userProposal.aceito) {
          const { confirmMessage } = proposals[lastestProposalIdx];
          const message = lastProposalMessage(confirmMessage);
          newMessages.push({
            message, isBot: true, iteractive: canChoose,
            onConfirm: onConfirmLastProposal,
            onDeny: onDenyLastProposal,
          });

          const answer = !lastProposal.aceito ? "Recusar acordo" :
          `Pagar ${proposals[i].confirmMessage}`;
          if (!canChoose) newMessages.push({
            message: answer, isBot: false,
          });
        }
      }
    }

    setMessages(newMessages);
  }, [chatData])


  async function onConfirmPredefinedProposal(index: number) {
    setIsLoading(true);
    const {
      entrada, qtdParcelas, valorParcela, confirmMessage
    } = proposals[index];
    setMessages(prevMessages => [...prevMessages, {
      message: `Pagar ${confirmMessage}`,
      isBot: false
    }]);

    await updateProposal(chatData.cpf, {
      aceito: true, autor: "Bot", entrada,
      qtdParcelas, valorParcela,
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

  function onConfirmLastProposal() {
    onConfirmPredefinedProposal(proposals.length - 1);
  }
  
  async function onDenyPredefinedProposal(index: number) {
    setIsLoading(true);
    const userAnswer = { message: "Recusar acordo", isBot: false };
    const { entrada, qtdParcelas, valorParcela } = proposals[index];
    setMessages(prevMessages => [...prevMessages, userAnswer]);

    const thereAreProposals = index < proposals.length;
    const isWorstProposal = qtdParcelas === chatData.rules.piorParcela;
    const refuseOrStopProposals = isWorstProposal || !thereAreProposals;

    // If accept, stop proposals
    await updateProposal(chatData.cpf, {
      aceito: refuseOrStopProposals, autor: "Bot",
      entrada, qtdParcelas, valorParcela,
    });
    setIsLoading(false);

    if (refuseOrStopProposals) {
      return setIsDenied(true);
    }

    const { autor, message } = proposals[index + 1];
    setMessages(prevMessages => [...prevMessages, {
      message, isBot: true, iteractive: autor === "Bot",
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

  async function onDenyLastProposal() {
    onDenyPredefinedProposal(proposals.length - 1);
  }

  async function confirmUserInput({
    installment, reason, value
  }: IUserInput) {
    setIsLoading(true);
    setUserProposal({ installment, reason, value });
    const canBeAccepted = installment <= chatData.rules.piorParcela;
    const installmentValue = (chatData.valorDivida - value)
                              / installment;
    await updateProposal(chatData.cpf, {
      aceito: canBeAccepted, autor: "User", entrada: value,
      qtdParcelas: installment, motivo: reason,
      valorParcela: installmentValue,
    });
    setIsLoading(false);
    setShowUserInput(false);

    if (canBeAccepted) {
      setIsWaiting(true);      
    } else {
      const index = proposals.length - 1;
      const { confirmMessage } = proposals[index];
      const message = lastProposalMessage(confirmMessage);
      setMessages(prevMessages => [...prevMessages, {
        message, isBot: true, iteractive: true,
        onConfirm: onConfirmLastProposal,
        onDeny: onDenyLastProposal,
      }]);
    }
  }

  const userInputMessageIndex = 4;
  return (
    <div className="w-full h-4/5 bg-white shadow-md rounded-3xl
                    flex flex-col relative">
      <div className="overflow-y-scroll flex-1">
        {messages.map((messageData, index) => (
          <>
          <Message key={index} isBot={messageData.isBot}
                  iteractive={index === messages.length - 1 && 
                              !isWaiting && !isLoading &&
                              messageData.iteractive}
                  onConfirm={messageData.onConfirm}
                  onDeny={messageData.onDeny}>
            <span dangerouslySetInnerHTML={{__html:messageData.message}}/>
          </Message>
          {(userProposal.value > 0 || userProposal.installment > 0) &&
            index === userInputMessageIndex &&
            <Message isBot={false} iteractive={false}>
              <UserInputMessage
                value={userProposal.value}
                reason={userProposal.reason}
                installment={userProposal.installment}
              />
            </Message>}
          </>
        ))}
        {isWaiting &&
          <Message isBot={true} iteractive={false}>
            <WaitForApproval name={chatData.nome}/>
          </Message>
        }
        {chatData.status === "Acordo aceito" &&
          <Message isBot={true} iteractive={false}>
            <AcceptProposal
              value={lastProposal.entrada}
              debit={chatData.valorDivida}
              author={lastProposal.autor}
              installment={lastProposal.qtdParcelas}
            />
          </Message>
        }
        {isDenied &&
          <Message isBot={true} iteractive={false}>
            <ProposalDenied name={chatData.nome} contact={chatData.contact}/>
          </Message>
        }
        {isLoading &&
          <Message isBot={true} iteractive={false}>
            Digitando...
          </Message>
        }
      </div>
      {showUserInput && <UserInput
        divida={chatData.valorDivida}
        onConfirm={confirmUserInput}
      />}
    </div>
  )
}