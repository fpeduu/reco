"use client";
import Image from "next/image";
import Styles from "./footer.module.scss";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  const bgClass = session ? "bg-gray-100" : "bg-primary";

  return (
    <div
      className={`flex w-full ml-16 sm:ml-0 justify-evenly p-20 ${Styles.footerSection}`}
    >
      <span>
        <p> Início </p>
        <a href="/">Página inicial</a>
        <a href="#">Configurações</a>
      </span>
      <span>
        <p> Informações </p>
        <a href="#">Sobre nós</a>
        <a href="#">Nossos planos</a>
      </span>
      <span>
        <p> Suporte </p>
        <a href="#">FAQ</a>
        <a href="#">Atendente Virtual</a>
      </span>
      <span>
        <p> Contato </p>
        <div className="flex gap-2">
          <a href="#">
            <Image
              src="/icons/instagram.svg"
              className="dark:invert"
              alt="Instagram Logo"
              width={24}
              height={24}
            />
          </a>
          <a href="#">
            <Image
              src="/icons/facebook.svg"
              className="dark:invert"
              alt="Facebook Logo"
              width={24}
              height={24}
            />
          </a>
          <a href="#">
            <Image
              src="/icons/linkedin.svg"
              className="dark:invert"
              alt="Linkedin Logo"
              width={24}
              height={24}
            />
          </a>
        </div>
        <a href="#" className="flex gap-3">
          <Image
            src="/icons/email.svg"
            className="dark:invert"
            alt="E-mail Logo"
            width={24}
            height={24}
          />
          deco@gmail.com
        </a>
      </span>
    </div>
  );
}
