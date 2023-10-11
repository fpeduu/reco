"use client";

import { Usuario } from "@/models/Usuarios";
import { RegrasProposta } from "@/models/Usuarios";
import { useState } from "react";
import { FormEvent } from "react";

interface ProposalSettingsProps {
  user: Usuario;
}

export default function ProposalSettings({ user }: ProposalSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [regras, setRegras] = useState<RegrasProposta[]>(
    user.regrasProposta.sort((a, b) => a.mesesAtraso - b.mesesAtraso)
  );

  function handleAddRule(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    if (
      !formData.has("melhorEntrada") ||
      !formData.has("melhorParcela") ||
      !formData.has("piorEntrada") ||
      !formData.has("piorParcela")
    )
      console.error("Missing form data");

    const bestEntry = Number(formData.get("melhorEntrada")) / 100;
    const bestInstallments = Number(formData.get("melhorParcela"));
    const worstEntry = Number(formData.get("piorEntrada")) / 100;
    const worstInstallments = Number(formData.get("piorParcela"));

    const newRule: RegrasProposta = {
      mesesAtraso: regras[regras.length - 1].mesesAtraso + 1,
      melhorEntrada: bestEntry,
      melhorParcela: bestInstallments,
      piorParcela: worstInstallments,
      piorEntrada: worstEntry
    };

    setRegras([...regras, newRule]);
    //TODO: post newRule with api

    setIsEditing(false);
  }

  function handleRemoveRule(mesesAtraso: number) {
    setRegras(regras.filter((regra) => regra.mesesAtraso !== mesesAtraso));
    //TODO: delete rule with api
  }

  return (
    <>
      <section className="p-10 flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="w-full md:w-1/5 flex flex-col">
          <h1 className="text-xl font-normal whitespace-nowrap">Regras de acordo</h1>
          <h2 className="text-sm font-extralight text-neutral-500 leading-tight whitespace-nowrap">
            usadas na geração de propostas
          </h2>
        </div>
        <div className="w-full md:w-4/5 flex flex-col overflow-x-auto md:overflow-x-visible">
          <div className="w-fit">
            <table className="w-224">
              <thead>
                <tr className="w-full px-2 mb-1 flex items-center gap-5 border-b border-b-neutral-500">
                  <th className="w-10 invisible" />
                  <th className="w-40 font-normal whitespace-nowrap border-b">Meses de atraso</th>
                  <th className="w-40 font-normal whitespace-nowrap border-b">Melhor entrada</th>
                  <th className="w-40 font-normal whitespace-nowrap border-b">
                    Melhor parcelamento
                  </th>
                  <th className="w-40 font-normal whitespace-nowrap border-b">Pior entrada</th>
                  <th className="w-40 font-normal whitespace-nowrap border-b">Pior parcelamento</th>
                </tr>
              </thead>
              <tbody>
                {regras.map((regra) => (
                  <tr
                    key={regra.mesesAtraso}
                    className="w-full px-2 mb-1 flex items-center gap-5 border-b border-dashed border-b-neutral-300">
                    <td className="w-10">
                      <button
                        onClick={() => handleRemoveRule(regra.mesesAtraso)}
                        className="text-center px-2 bg-white rounded-md font-normal">
                        x
                      </button>
                    </td>
                    <td className="w-40 text-center font-light whitespace-nowrap">
                      {regra.mesesAtraso}
                    </td>
                    <td className="w-40 text-center font-light whitespace-nowrap">
                      {regra.melhorEntrada * 100}%
                    </td>
                    <td className="w-40 text-center font-light whitespace-nowrap">
                      {regra.melhorParcela}x
                    </td>
                    <td className="w-40 text-center font-light whitespace-nowrap">
                      {regra.piorEntrada * 100}%
                    </td>
                    <td className="w-40 text-center font-light whitespace-nowrap">
                      {regra.piorParcela}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing ? (
              <form onSubmit={handleAddRule}>
                <div className="w-224 px-2 mb-1 flex items-center gap-5 border-b border-dashed border-b-neutral-300">
                  <span className="w-40 text-center font-light whitespace-nowrap">
                    {regras[regras.length - 1].mesesAtraso + 1}
                  </span>
                  <span className="w-40 flex items-center justify-center">
                    <input
                      type="number"
                      name="melhorEntrada"
                      defaultValue={0}
                      className="w-2/3 rounded-md text-center font-light whitespace-nowrap"
                    />
                    %
                  </span>
                  <span className="w-1/5 flex items-center justify-center">
                    <input
                      type="number"
                      name="melhorParcela"
                      defaultValue={0}
                      className="w-2/3 rounded-md text-center font-light whitespace-nowrap"
                    />
                    x
                  </span>
                  <span className="w-1/5 flex items-center justify-center">
                    <input
                      type="number"
                      name="piorEntrada"
                      defaultValue={0}
                      className="w-2/3 rounded-md  text-center font-light whitespace-nowrap"
                    />
                    %
                  </span>
                  <span className="w-1/5 flex items-center justify-center">
                    <input
                      type="number"
                      name="piorParcela"
                      defaultValue={0}
                      className="w-2/3 rounded-md  text-center font-light whitespace-nowrap"
                    />
                    x
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-5">
                  <button type="submit" className="px-2 bg-white rounded-md">
                    Confirmar
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-2 bg-white rounded-md">
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-10 md:w-full px-2 bg-white rounded-md font-semibold text-xl">
                +
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
