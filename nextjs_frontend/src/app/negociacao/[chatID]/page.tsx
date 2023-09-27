import { serverURL } from "@/config";

import Chat from "./components/Chat/Chat";
import ChatLoading from "./loading";

import { NegotiationData } from "@/types/negotiation.dto";

async function fetchChatData(chatID: string) {
  return await fetch(`${serverURL}/api/proposal/${chatID}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null
    }) as NegotiationData;
}

interface ChatPageProps {
  params: {
    chatID: string;
  };
}


export default async function ChatPage({ params }: ChatPageProps) {
  const chatData = await fetchChatData(params.chatID);

  if (!chatData) {
    return <ChatLoading />
  }

  return (
    <div className="containerLayout">
      <h1 className="text-4xl font-semibold mb-10">
        Negociação
      </h1>
      <Chat chatData={chatData}/>
    </div>
  )
}