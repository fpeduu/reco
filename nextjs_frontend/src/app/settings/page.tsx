"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProfileSettings from "./ProfileSettings/profile-settings";
import { Usuario } from "@/models/Usuarios";
import { serverURL } from "@/config";
import LoadingBar from "@/components/Loading/loading";
import ProposalSettings from "./ProposalSettings/proposal-settings";

async function fetchUser(userEmail: string) {
  return (await fetch(`${serverURL}/api/auth?email=${userEmail}`)
    .then((res) => res.json())
    .catch((err) => console.error(err))) as Usuario;
}

export default function SettingsPage() {
  const { data: session } = useSession({ required: true });
  const [user, setUser] = useState<Usuario>();
  const [activeTab, setActiveTab] = useState<"profile" | "proposal" | "payment" | "language">(
    "profile"
  );

  useEffect(() => {
    if (!session) return;
    //TODO: change to session email
    fetchUser("teste@email.com").then((res) => {
      setUser(res);
    });
  }, [session]);

  function switchToProfile() {
    setActiveTab("profile");
  }

  function switchToProposal() {
    setActiveTab("proposal");
  }

  function switchToPayment() {
    setActiveTab("payment");
  }

  function switchToLanguage() {
    setActiveTab("language");
  }

  return (
    <div className="containerLayout">
      <h1 className="text-4xl font-semibold leading-10 my-10">Configurações</h1>
      <div className="w-full flex flex-col gap-10 divide-y divide-neutral-300">
        <nav className="w-full p-3 md:p-0 md:h-16 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-32 border border-neutral-300 rounded-lg">
          <button
            onClick={switchToProfile}
            className={
              "w-full md:w-fit h-10 px-5 flex items-center justify-center rounded-lg text-lg font-light whitespace-nowrap " +
              (activeTab === "profile" ? "bg-white" : "text-zinc-400")
            }>
            Meu Perfil
          </button>
          <button
            onClick={switchToProposal}
            className={
              "w-full md:w-fit h-10 px-5 flex items-center justify-center rounded-lg text-lg font-light whitespace-nowrap " +
              (activeTab === "proposal" ? "bg-white" : "text-zinc-400")
            }>
            Lógica de acordo
          </button>
          <button
            onClick={switchToPayment}
            className={
              "w-full md:w-fit h-10 px-5 flex items-center justify-center rounded-lg text-lg font-light whitespace-nowrap " +
              (activeTab === "payment" ? "bg-white" : "text-zinc-400")
            }
            disabled>
            Dados de Pagamento
          </button>
          <button
            onClick={switchToLanguage}
            className={
              "w-full md:w-fit h-10 px-5 flex items-center justify-center rounded-lg text-lg font-light whitespace-nowrap " +
              (activeTab === "language" ? "bg-white" : "text-zinc-400")
            }
            disabled>
            Idioma
          </button>
        </nav>
        {!user ? (
          <LoadingBar />
        ) : activeTab === "profile" ? (
          <ProfileSettings user={user} />
        ) : activeTab === "proposal" ? (
          <ProposalSettings user={user} />
        ) : activeTab === "payment" ? (
          <></>
        ) : activeTab === "language" ? (
          <></>
        ) : null}
      </div>
    </div>
  );
}
