"use client";

import LoadingBar from "@/components/Loading/loading";
import { serverURL } from "@/config";
import { Usuario } from "@/models/Usuarios";
import { Session } from "next-auth";
import { useState, useEffect } from "react";

interface ProfileSettingsProps {
  session: Session | null;
}

async function fetchUser(userEmail: string) {
  return (await fetch(`${serverURL}/api/auth?email=${userEmail}`)
    .then((res) => res.json())
    .catch((err) => console.error(err))) as Usuario;
}

export default function ProfileSettings({ session }: ProfileSettingsProps) {
  const [user, setUser] = useState<Usuario>();
  const [isEditing, setIsEditing] = useState(false);
  const updateUrl = `${serverURL}/api/users`;

  useEffect(() => {
    if (!session) return;
    //TODO: change to session email
    fetchUser("teste@email.com").then((res) => {
      setUser(res);
    });
  }, [session]);

  if (!user) return <LoadingBar />;

  return (
    <>
      <section className="p-10 flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="w-full md:w-1/5 flex flex-col">
          <h1 className="text-xl font-normal whitespace-nowrap">Informações pessoais</h1>
          <h2 className="text-sm font-extralight text-neutral-500 leading-tight whitespace-nowrap">
            da sua conta Reco
          </h2>
        </div>
        <form action={updateUrl} method="post" className="w-full md:w-4/5 flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-light">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder={user.nome}
            defaultValue={user.nome}
            className={
              "w-full max-w-xs h-9 px-5 mb-5 rounded-md border border-neutral-300 font-light text-sm " +
              (isEditing ? "" : "text-neutral-400 focus:outline-none bg-gray-200")
            }
            disabled={isEditing}
          />
        </form>
      </section>

      <section className="p-10 flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="w-full md:w-1/5 flex flex-col">
          <h1 className="text-xl font-normal whitespace-nowrap">Informações de contato</h1>
          <h2 className="text-sm font-extralight text-neutral-500 leading-tight whitespace-nowrap">
            compartilhadas com os condôminos
          </h2>
        </div>
        <form action={updateUrl} method="post" className="w-full md:w-4/5 flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-light">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder={user.email}
            defaultValue={user.email}
            className={
              "w-full max-w-xs h-9 px-5 mb-5 rounded-md border border-neutral-300 font-light text-sm " +
              (isEditing ? "" : "text-neutral-400 focus:outline-none bg-gray-200")
            }
            disabled={isEditing}
          />
          <label htmlFor="contact" className="mb-2 text-sm font-light">
            Telefone
          </label>
          <input
            id="contact"
            type="tel"
            placeholder={user.contact}
            defaultValue={user.contact}
            className={
              "w-full max-w-xs h-9 px-5 mb-5 rounded-md border border-neutral-300 font-light text-sm " +
              (isEditing ? "" : "text-neutral-400 focus:outline-none bg-gray-200")
            }
            disabled={isEditing}
          />
        </form>
      </section>

      <section className="p-10 flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="w-full md:w-1/5 flex flex-col">
          <h1 className="text-xl font-normal whitespace-nowrap">Regras de acordo</h1>
          <h2 className="text-sm font-extralight text-neutral-500 leading-tight whitespace-nowrap">
            usadas na geração de propostas
          </h2>
        </div>
        <form
          action={updateUrl}
          method="post"
          className="w-full md:w-4/5 flex flex-col overflow-x-auto md:overflow-x-visible">
          <table>
            <tr className="w-full px-2 mb-1 flex items-center gap-5 border-b border-b-neutral-500">
              <th className="w-1/5 font-normal whitespace-nowrap border-b">Meses de atraso</th>
              <th className="w-1/5 font-normal whitespace-nowrap border-b">Melhor entrada</th>
              <th className="w-1/5 font-normal whitespace-nowrap border-b">Melhor parcelamento</th>
              <th className="w-1/5 font-normal whitespace-nowrap border-b">Pior entrada</th>
              <th className="w-1/5 font-normal whitespace-nowrap border-b">Pior parcelamento</th>
            </tr>
            {user.regrasProposta.map((regra) => (
              <tr
                key={regra.mesesAtraso}
                className="w-full px-2 mb-1 flex items-center gap-5 border-b border-dashed border-b-neutral-300">
                <td className="w-1/5 text-center font-light whitespace-nowrap">
                  {regra.mesesAtraso}
                </td>
                <td className="w-1/5 text-center font-light whitespace-nowrap">
                  {regra.melhorEntrada * 100}%
                </td>
                <td className="w-1/5 text-center font-light whitespace-nowrap">
                  {regra.melhorParcela}x
                </td>
                <td className="w-1/5 text-center font-light whitespace-nowrap">
                  {regra.piorEntrada * 100}%
                </td>
                <td className="w-1/5 text-center font-light whitespace-nowrap">
                  {regra.piorParcela}x
                </td>
              </tr>
            ))}
          </table>
        </form>
      </section>
    </>
  );
}
