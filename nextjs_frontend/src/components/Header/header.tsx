"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useNotificationContext } from "@/contexts/NotificationContext";
import { useSideBarContext } from "@/contexts/SideBarContext";

import NotificationFlyMenu from "./components/NotificationFlyMenu/notification-fly-menu";

export default function Header() {
  const { notifications, setNotifications } = useNotificationContext();
  const { hideSideBar, setHideSideBar } = useSideBarContext();
  const { data: session } = useSession();

  const bgClass = session ? "bg-white" : "bg-neutral-950";
  const textClass = session ? "text-red-600" : "text-neutral-200";

  function handleLogin() {
    signIn(undefined, {
      callbackUrl: "/tenants/"
    });
  }

  function handleLogout() {
    signOut({
      callbackUrl: "/"
    });
  }

  function handleSidebarToggle() {
    setHideSideBar(!hideSideBar);
  }

  function handleRemoveNotification(index: number) {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
  }

  return (
    <div
      className={`w-full absolute h-20 py-2 flex items-center ${
        session ? "pr-5 md:pr-28" : "md:px-10"
      } ${bgClass} ${textClass}`}>
      {session && (
        <button
          onClick={handleSidebarToggle}
          className={
            "z-40 w-16 md:static flex justify-center items-center " + (hideSideBar ? "" : "fixed")
          }>
          <Image src="/icons/sidebar_toggle.svg" alt="Sidebar Toggle" width={24} height={24} />
        </button>
      )}
      <span
        className={
          "w-full flex items-center justify-between " + (session ? "md:justify-center" : "px-4")
        }>
        {session && <span className="md:w-1/3 invisible"></span>}
        <Link
          href="/"
          className={"flex justify-center items-center " + (session ? "w-fit md:w-1/3" : "")}>
          <Image
            src={session ? "/logo.svg" : "/logo_cinza.svg"}
            alt="Reco Logo"
            width={125}
            height={31}
            priority
          />
        </Link>
        <span
          className={` flex justify-end items-center gap-2 font-semibold underline ${
            session ? "justify-end md:w-1/3" : "justify-start px-4"
          }`}>
          {session ? (
            <>
              <NotificationFlyMenu
                notifications={notifications}
                onRemoveCard={handleRemoveNotification}
              />
              <button onClick={handleLogout} className="flex place-items-center gap-2 font-light">
                <Image src="/icons/logout.svg" alt="Logout Logo" width={24} height={24} />
                Sair
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className="font-light">
                Entrar
              </button>
              <button className="bg-primary rounded-full py-2 px-10 ml-6 text-white">
                Contato
              </button>
            </>
          )}
        </span>
      </span>
    </div>
  );
}
