"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { INotification } from "@/types/notification.dto";
import { apiURL } from "@/config";

import io from 'socket.io-client';
import { useSession } from "next-auth/react";

interface NotificationContext {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationContext = createContext<NotificationContext | null>(null);

export function NotificationProvider({
  children
}: NotificationProviderProps) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    if (!session || typeof apiURL === "undefined") return;
    const socket = io(apiURL, {
      transports: ["websocket"],
      auth: { email: session?.user?.email }
    });

    socket.on('notification', data => {
      setNotifications(prev => [...prev, data])
    })
  }, [session])

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationContext not found!");
  return context;
}
