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
    const newMessages: IMessage[] = [{
      message: proposals[0].message, isBot: true, iteractive: true,
      onConfirm: onConfirmFirstProposal, onDeny: onDenyFirstProposal
    }];
    for (let i = 0; i < chatData.proposals.length; i++) {
      const message = !chatData.proposals[i].aceito ? "Recusar acordo" :
                      `Pagar ${proposals[0].confirmMessage}`;
      newMessages.push({ message, isBot: false });
      if (!chatData.proposals[i].aceito) {
        newMessages.push({
          message: proposals[1].message, isBot: true,
          iteractive: lastProposalIdx === i,
        });
      }
    }
    setMessages(newMessages);
  }, [chatData])


  async function onConfirmFirstProposal() {
    setMessages(prevMessages => [...prevMessages, {
      message: `Pagar ${proposals[0].confirmMessage}`,
      isBot: false
    }]);

    setIsLoading(true);
    await updateProposal(chatData.cpf, {
      aceito: true, entrada: proposals[0].entrada,
      qtdParcelas: proposals[0].qtdParcelas,
      valorParcela: proposals[0].valorParcela,
    });
    setIsLoading(false);
    setIsWaiting(true);
  }
  
  async function onDenyFirstProposal() {
    const userAnswer = { message: "Recusar acordo", isBot: false };
    setMessages(prevMessages => [...prevMessages, userAnswer]);

    setIsLoading(true);
    await updateProposal(chatData.cpf, {
      aceito: false, entrada: proposals[0].entrada,
      qtdParcelas: proposals[0].qtdParcelas,
      valorParcela: proposals[0].valorParcela,
    });
    setIsLoading(false);

    if (chatData.rules.melhorParcela === 1) {
      setIsDenied(true);
    } else {
      setMessages(prevMessages => [...prevMessages, {
        message: proposals[1].message,
        isBot: true, iteractive: true,
      }]);
    }
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
            value={lastProposal.entrada}
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