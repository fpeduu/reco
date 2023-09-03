"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Styles from "./sidebar.module.scss";
import { usePathname } from "next/navigation";
import { useSideBarContext } from "@/contexts/SideBarContext";

export default function SideBar() {
  const { hideSideBar } = useSideBarContext();
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    !hideSideBar && (
      <div className={Styles.sidebar}>
        <Link href="/" className="self-center">
          <Image src="/logo.svg" alt="Reco Logo" width={141} height={35} priority />
        </Link>
        <nav>
          <div className="flex flex-col gap-2">
            <span className="ml-3 text-slate-400 text-sm font-medium">
              Menu Principal
            </span>
            <ul className="flex flex-col gap-2">
              <li className="w-full flex place-items-center">
                <Link
                  href="/tenants/"
                  className={
                    Styles.navitem + " " + (pathname === "/tenants" ? Styles.active : "")
                  }>
                  <Image
                    src={
                      pathname === "/tenants"
                        ? "/icons/home.svg"
                        : "/icons/home_stroke.svg"
                    }
                    alt="Home icon"
                    width={22}
                    height={23}
                  />
                  Página Inicial
                </Link>
              </li>
              {session && (
                <li className="w-full flex place-items-center">
                  <Link
                    href="/agreements/"
                    className={
                      Styles.navitem +
                      " " +
                      (pathname === "/agreements" ? Styles.active : "")
                    }>
                    <Image
                      src={
                        pathname === "/agreements"
                          ? "/icons/history.svg"
                          : "/icons/history_stroke.svg"
                      }
                      alt="History icon"
                      width={22}
                      height={23}
                    />
                    Histórico
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="mt-20 flex flex-col gap-2">
            <span className="ml-3 text-slate-400 text-sm font-medium">Preferências</span>
            <ul className="flex flex-col gap-2">
              <li className="w-full flex place-items-center">
                <Link
                  href="/settings/"
                  className={
                    Styles.navitem + " " + (pathname === "/settings" ? Styles.active : "")
                  }>
                  <Image
                    src={
                      pathname === "/settings"
                        ? "/icons/options.svg"
                        : "/icons/options_stroke.svg"
                    }
                    alt="Options icon"
                    width={22}
                    height={23}
                  />
                  Configurações
                </Link>
              </li>
              <li className="w-full flex place-items-center">
                <Link
                  href="/help/"
                  className={
                    Styles.navitem + " " + (pathname === "/help" ? Styles.active : "")
                  }>
                  <Image
                    src={
                      pathname === "/help" ? "/icons/help.svg" : "/icons/help_stroke.svg"
                    }
                    alt="Options icon"
                    width={22}
                    height={23}
                  />
                  Ajuda
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  );
}
