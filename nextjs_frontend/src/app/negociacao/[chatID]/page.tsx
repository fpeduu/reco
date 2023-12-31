import { serverURL } from "@/config";

import Chat from "./components/Chat/chat";
import ChatLoading from "./loading";

import { NegotiationData } from "@/types/negotiation.dto";
import LoadingBar from "@/components/Loading/loading";

async function fetchChatData(chatID: string) {
  return (await fetch(`${serverURL}/api/proposal/${chatID}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return { error: true };
    })) as NegotiationData | { error: true };
}

interface ChatPageProps {
  params: {
    chatID: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chatData = await fetchChatData(params.chatID);

  if (!chatData || "error" in chatData) {
    return <LoadingBar />;
  }

  return (
    <div className="containerLayout">
      <h1 className="text-4xl font-semibold mb-10 p-2 mt-3">Negociação</h1>
      <Chat chatData={chatData} />
    </div>
  );
}
