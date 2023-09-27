"use client";

import { serverURL } from "@/config";
import { useEffect, useState } from "react";

import { NegotiationData } from "@/types/negotiation.dto";
import Message from "../Message/Message";
import {
  AcceptProposal,
  ProposalDenied,
  WaitForApproval
} from "../Message/Messages";
import {
  IProposal,
  firstProposal,
  secondProposal,
  thirdProposal
} from "./utils";
import { Acordo, Proposta } from "@/models/Acordos";

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

interface ChatProps {
  chatData: NegotiationData;
}

interface IMessage {
  message: string;
  isBot: boolean;
  iteractive?: boolean;
  onConfirm?: () => void;
  onDeny?: () => void;
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
    for (let i = 0; i < predefinedfunctions.length; i++) {
      newMessages.push({
        message: proposals[i].message, isBot: true,
        iteractive: lastProposalIdx === i - 1,
        onConfirm: predefinedfunctions[i][0],
        onDeny: predefinedfunctions[i][1],
      });
      if (i > lastProposalIdx) break;
      const answer = !chatData.proposals[i].aceito ? "Recusar acordo" :
                      `Pagar ${proposals[i].confirmMessage}`;
      if (!chatData.proposals[i].aceito) {
        newMessages.push({
          message: answer, isBot: false,
        });
      }
    }
    setMessages(newMessages);
  }, [chatData])


  async function onConfirmPredefinedProposal(index: number) {
    const {
      entrada, qtdParcelas, valorParcela, confirmMessage
    } = proposals[index];
    setMessages(prevMessages => [...prevMessages, {
      message: `Pagar ${confirmMessage}`,
      isBot: false
    }]);

    setIsLoading(true);
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
  
  async function onDenyPredefinedProposal(index: number) {
    const userAnswer = { message: "Recusar acordo", isBot: false };
    const { entrada, qtdParcelas, valorParcela } = proposals[index];
    setMessages(prevMessages => [...prevMessages, userAnswer]);

    setIsLoading(true);
    await updateProposal(chatData.cpf, {
      aceito: false, autor: "Bot",
      entrada, qtdParcelas, valorParcela,
    });
    setIsLoading(false);

    if (chatData.rules.melhorParcela === 1) {
      setIsDenied(true);
    } else {
      setMessages(prevMessages => [...prevMessages, {
        message: proposals[index + 1].message,
        isBot: true, iteractive: true,
      }]);
    }
  }

  function onDenyFirstProposal() {
    onDenyPredefinedProposal(0);
  }

  function onDenySecondProposal() {
    onDenyPredefinedProposal(1);
  }

  return (
    <div className="w-full h-4/5 bg-white shadow-md rounded-3xl
                    flex flex-col">
      {messages.map((messageData, index) => (
        <Message key={index} isBot={messageData.isBot}
                iteractive={index === messages.length - 1 &&
                            messageData.iteractive}
                onConfirm={messageData.onConfirm}
                onDeny={messageData.onDeny}>
          <span dangerouslySetInnerHTML={{__html:messageData.message}}/>
        </Message>
      ))}
      {isWaiting &&
        <Message isBot={true} iteractive={false}>
          <WaitForApproval name={chatData.nome}/>
        </Message>
      }
      {chatData.status === "Acordo aceito" &&
        <Message isBot={true} iteractive={false}>
          <AcceptProposal
            value={chatData.valorDivida * lastProposal.entrada}
            installment={lastProposal.qtdParcelas}
          />
        </Message>
      }
      {isDenied &&
        <Message isBot={true} iteractive={false}>
          <ProposalDenied name={chatData.nome}/>
        </Message>
      }
      {isLoading &&
        <Message isBot={true} iteractive={false}>
          Digitando...
        </Message>
      }
    </div>
  )
}