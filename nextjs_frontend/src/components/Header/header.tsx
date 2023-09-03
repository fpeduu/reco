"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSideBarContext } from "@/contexts/SideBarContext";

export default function Header() {
  const { hideSideBar, setHideSideBar } = useSideBarContext();
  const { data: session } = useSession();

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

  return (
    <div className="h-20 pl-5 pr-28 py-2 flex justify-between bg-white text-red-600">
      <span className="flex place-items-center gap-14 font-semibold">
        <button onClick={handleSidebarToggle}>
          <Image
            src="/icons/sidebar_toggle.svg"
            alt="Sidebar Toggle"
            width={24}
            height={24}
          />
        </button>
        {hideSideBar && (
          <>
            <Link href="/">
              <Image src="/logo.svg" alt="Reco Logo" width={125} height={31} priority />
            </Link>
          </>
        )}
      </span>
      <span className="flex place-items-center gap-2 font-semibold underline">
        {session ? (
          <>
            <div className="p-2 border rounded-full mr-20 hover:cursor-pointer hover:bg-slate-100">
              <Image
                src="/icons/notification_bell.svg"
                alt="Notifications"
                width={24}
                height={24}
              />
            </div>
            <button onClick={handleLogout} className="flex place-items-center gap-2">
              <Image src="/icons/logout.svg" alt="Logout Logo" width={24} height={24} />
              Sair
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>Entrar</button>
            <button className="bg-primary rounded-full py-2 px-10 ml-6 text-white">
              Contato
            </button>
          </>
        )}
      </span>
    </div>
  );
}
