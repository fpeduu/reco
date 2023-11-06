"use client";

import { createContext, useContext, useState } from "react";

interface ChatContext {
  isAllowed: boolean;
  setIsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContext | null>(null);

export function ChatProvider({ children }: ChatProviderProps) {
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{
      isAllowed,
      setIsAllowed,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("ChatContext not found!");
  return context;
}

