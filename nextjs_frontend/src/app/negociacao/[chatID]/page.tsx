import { serverURL } from "@/config";
import React from "react";

import { ChatProvider } from "./contexts/chat-context";
import { NegotiationData } from "@/types/negotiation.dto";

import LoadingBar from "@/components/Loading/loading";
import ChatModal from "./components/chat-modal";
import Chat from "./components/Chat/chat";

async function fetchChatData(chatID: string) {
  return (await fetch(`${serverURL}/api/proposal/${chatID}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null;
    })) as NegotiationData | null;
}

interface ChatPageProps {
  params: {
    chatID: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chatData = await fetchChatData(params.chatID);

  if (!chatData) return <LoadingBar />;

  return (
    <div className="containerLayout">
      <h1 className="text-4xl font-semibold mb-10 p-2 mt-3">
        Negociação
      </h1>
      <ChatProvider>
        <ChatModal cpf={chatData.cpf} />
        <Chat chatData={chatData} />
      </ChatProvider>
    </div>
  );
}
