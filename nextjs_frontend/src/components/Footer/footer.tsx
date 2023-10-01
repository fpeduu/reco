"use client";
import Image from "next/image";
import Styles from "./footer.module.scss";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  const bgClass = session ? "bg-gray-100" : "bg-neutral-950";
  const textClass = session ? "text-neutral-950" : "text-neutral-200";
  const invertClass = session ? "invert-0" : "invert";
  const marginClass = session ? "md:m-0" : "";

  return (
    <div
      className={`flex flex-wrap gap-6 w-full justify-center md:justify-evenly p-20 ${marginClass} ${textClass} ${bgClass} ${Styles.footerSection}`}>
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
        <div className={`flex gap-2 ${invertClass}`}>
          <a href="#">
            <Image src="/icons/instagram.svg" alt="Instagram Logo" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/icons/facebook.svg" alt="Facebook Logo" width={24} height={24} />
          </a>
          <a href="#">
            <Image src="/icons/linkedin.svg" alt="Linkedin Logo" width={24} height={24} />
          </a>
        </div>
        <a href="#" className={`flex gap-3`}>
          <Image
            src="/icons/email.svg"
            className={`dark:invert ${invertClass}`}
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
