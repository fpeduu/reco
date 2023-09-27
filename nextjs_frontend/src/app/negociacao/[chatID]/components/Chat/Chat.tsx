"use client";

import { NegotiationData } from "@/types/negotiation.dto";

import Message from "../Message/Message";
import {
  AcceptProposal,
  ProposalDenied,
  WaitForApproval
} from "../Message/Messages";
import { useEffect, useState } from "react";
import {
  IProposal,
  firstProposal,
  secondProposal,
  thirdProposal
} from "./utils";

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
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    chatData.proposals.push({
      aceito: true,
      entrada: proposals[0].entrada,
      qtdParcelas: proposals[0].qtdParcelas,
      valorParcela: proposals[0].valorParcela,
    });
    setMessages(prevMessages => [...prevMessages, {
      message: `Pagar ${proposals[0].confirmMessage}`,
      isBot: false
    }]);
    setIsWaiting(true);
  }
  
  async function onDenyFirstProposal() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    chatData.proposals.push({
      aceito: false,
      entrada: proposals[0].entrada,
      qtdParcelas: proposals[0].qtdParcelas,
      valorParcela: proposals[0].valorParcela,
    });
    const userAnswer = { message: "Recusar acordo", isBot: false };
    if (chatData.rules.melhorParcela === 1) {
      setMessages(prevMessages => [...prevMessages, userAnswer]);
      setIsDenied(true);
    } else {
      setMessages(prevMessages => [...prevMessages, userAnswer, {
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