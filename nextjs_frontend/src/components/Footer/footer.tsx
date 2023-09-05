import Image from "next/image";
import Styles from "./footer.module.scss";

export default function Footer() {
  return (
    <div className="flex w-full ml-16 sm:ml-0 justify-evenly bg-gray-100 p-20">
      <span className={Styles.footerSection}>
        <p> Início </p>
        <a href="/">Página inicial</a>
        <a href="#">Configurações</a>
      </span>
      <span className={Styles.footerSection}>
        <p> Informações </p>
        <a href="#">Sobre nós</a>
        <a href="#">Nossos planos</a>
      </span>
      <span className={Styles.footerSection}>
        <p> Suporte </p>
        <a href="#">FAQ</a>
        <a href="#">Atendente Virtual</a>
      </span>
      <span className={Styles.footerSection}>
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
