import { serverURL } from "@/config";
import { RegrasProposta } from "@/models/Usuarios";
import Message from "./components/Message/Message";

async function fetchLimits(chatID: string) {
    return await fetch(`${serverURL}/api/proposal/${chatID}/`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
            return null 
        }) as RegrasProposta | null;
}

interface ChatPageProps {
    params: {
        chatID: string;
    };
}


export default async function ChatPage({ params }: ChatPageProps) {
    const limits = await fetchLimits(params.chatID);

    return (
        <div className="containerLayout">
            <h1 className="text-4xl font-semibold mb-10">
                Negociação
            </h1>
            <div className="w-full h-4/5 bg-white shadow-md rounded-3xl
                            flex flex-col">
                <Message message="Olá, tudo bem?" isBot={true} />
                <Message message="Sim, tudo bem?" isBot={false} />
            </div>
        </div>
    )
}