"use client";

import { serverURL } from "@/config";
import { Usuario } from "@/models/Usuarios";
import { useState } from "react";

interface ProfileSettingsProps {
  user: Usuario;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateUrl = `${serverURL}/api/users`;

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
    </>
  );
}
