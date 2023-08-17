"use client"

import Image from "next/image";
import ProposalPodium from "./components/ProposalPodium/proposal-podium";
import Styles from "./proposal-page.module.scss";
import { Acordo } from "@/models/Acordos";
import { useEffect, useState } from "react";
import { serverURL } from "@/config";

interface ProposalPageProps {
  params: {
    devedorCPF: string;
  }
}

async function fetchProposals(devedorCPF: string) {
  const response = await fetch(
    `${serverURL}/proposal/api/`,
    { method: "GET" });
  return await response.json() as Acordo[];
}

async function chooseProposal(acordo: Acordo) {
  const proposalChoosed: boolean = await fetch(
    `${serverURL}/proposal/api/`, {
      method: "POST",
      body: JSON.stringify(acordo)
    }).then((response) => response.ok)
      .catch((error) => {
        console.error(error);
        return false;
      });
  return proposalChoosed;
}

export default function ProposalPage({ params }: ProposalPageProps) {
  const [proposals, setProposals] = useState<Acordo[]>([] as Acordo[]);
  const [selectedProposal, setSelectedProposal] = useState<Acordo>();

  async function fetchNewProposals() {
    const newProposals = await fetchProposals(params.devedorCPF);
    setProposals(newProposals);
  }

  useEffect(() => {
    fetchNewProposals();
  }, []);

  async function handleFinishProposal() {
    if (!selectedProposal) return;
    const proposalSelected = await chooseProposal(selectedProposal);
    if (proposalSelected) {
      alert("Proposta selecionada com sucesso!");
    } else {
      alert("Erro ao selecionar proposta!");
    }
  };

  function handleSelectProposal(proposal: Acordo) {
    setSelectedProposal(proposal);
  }

  return (
    <div className={Styles.proposalPage}>
      <h1 className="w-full my-10 text-gray-950 text-3xl font-bold leading-[46px]">
        Jornada do acordo
      </h1>
      <div className="p-5 rounded-[20px] shadow bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl text-center font-bold mb-3">Opções de Propostas</h2>
        <p className="w-2/3 font-normal text-[#969696] text-center">
          <span>
            A seguir, estão sendo apresentadas na tela as diferentes opções de acordos que
            se adequam a sua situação. <br />
            Por favor,{" "}
          </span>
          <span className="font-semibold">selecione o acordo</span>
          <span> de sua escolha clicando nele abaixo.</span>
        </p>
        <ProposalPodium
          proposals={proposals}
          changeProposal={handleSelectProposal}
        />
      </div>
      <div className="w-full py-20 px-5 flex items-center justify-center flex-wrap-reverse gap-5">
        <a href="#" className="w-12 mr-auto inline-flex gap-5 items-center">
          <Image
            src="/icons/vector_stroke.svg"
            className="dark:invert"
            alt="Voltar"
            width={12}
            height={22}
          />
          <span>Voltar</span>
        </a>
        <div className="mx-10 lg:mx-0 flex justify-center items-center gap-10">
          <button onClick={fetchNewProposals}>
            Gerar novas propostas
          </button>
          <button onClick={handleFinishProposal}>
            Determinar Proposta
          </button>
        </div>
        <span className="w-12 ml-auto invisible hidden lg:block"></span>
      </div>
    </div>
  );
}
