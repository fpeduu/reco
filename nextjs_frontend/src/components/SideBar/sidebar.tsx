"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Styles from "./sidebar.module.scss";
import { usePathname } from "next/navigation";
import { useSideBarContext } from "@/contexts/SideBarContext";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function SideBar() {
  const { hideSideBar } = useSideBarContext();
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      {session && (
        <div className={hideSideBar ? Styles.sidebarSmall : Styles.sidebar}>
          <nav>
            <div className="flex flex-col gap-2">
              {!hideSideBar && (
                <span className="ml-3 text-slate-400 text-sm font-medium">
                  Menu Principal
                </span>
              )}
              <ul className="flex flex-col gap-2">
                <li className="w-full flex place-items-center">
                  <Link
                    href="/tenants/"
                    className={
                      Styles.navitem +
                      " " +
                      (pathname === "/tenants" ? Styles.active : "")
                    }
                  >
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
                    {!hideSideBar && <span>Página Inicial</span>}
                  </Link>
                </li>
                {session && (
                  <>
                    <li className="w-full flex place-items-center">
                      <Link
                        href="/agreements/"
                        className={
                          Styles.navitem +
                          " " +
                          (pathname === "/agreements" ? Styles.active : "")
                        }
                      >
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
                        {!hideSideBar && <span>Negociações</span>}
                      </Link>
                    </li>
                    <li className="w-full flex place-items-center">
                      <Link
                        href="/importar/"
                        className={
                          Styles.navitem +
                          " " +
                          (pathname === "/importar" ? Styles.active : "")
                        }
                      >
                        <AddCircleOutlineIcon sx={{ width: 22, height: 23 }} />

                        {!hideSideBar && <span>Importar devedores</span>}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="mt-20 flex flex-col gap-2">
              {!hideSideBar && (
                <span className="ml-3 text-slate-400 text-sm font-medium">
                  Preferências
                </span>
              )}
              <ul className="flex flex-col gap-2">
                <li className="w-full flex place-items-center">
                  <Link
                    href="#"
                    className={
                      Styles.navitem +
                      " " +
                      (pathname === "/settings" ? Styles.active : "")
                    }
                  >
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
                    {!hideSideBar && <span>Configurações</span>}
                  </Link>
                </li>
                <li className="w-full flex place-items-center">
                  <Link
                    href="#"
                    className={
                      Styles.navitem +
                      " " +
                      (pathname === "/help" ? Styles.active : "")
                    }
                  >
                    <Image
                      src={
                        pathname === "/help"
                          ? "/icons/help.svg"
                          : "/icons/help_stroke.svg"
                      }
                      alt="Options icon"
                      width={22}
                      height={23}
                    />
                    {!hideSideBar && <span>Ajuda</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
