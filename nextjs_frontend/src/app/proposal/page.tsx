"use client";
import Image from "next/image";
import ProposalPodium from "./components/ProposalPodium/proposal-podium";
import Styles from "./proposal-page.module.scss";
import { Acordo } from "@/models/Acordos";
import { Devedor } from "@/models/Devedores";
import { useEffect, useState } from "react";

async function fetchProposals(devedor: Devedor) {
  const response = await fetch("http://localhost:3000/proposal/api/", {
    method: "GET",
    body: JSON.stringify(devedor)
  });
  const proposalList: Acordo[] = await response.json();
  return proposalList;
}

async function chooseProposal(acordo: Acordo) {
  const response = await fetch("http://localhost:3000/proposal/api/", {
    method: "POST",
    body: JSON.stringify(acordo)
  });
  const newProposal: Acordo = await response.json();
  return newProposal;
}

export default function ProposalPage({ devedor }: { devedor: Devedor }) {
  const [topProposals, setTopProposals] = useState<Acordo[]>([] as Acordo[]);
  const [selProposal, setSelProposal] = useState<Acordo | null>(null);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isChoosing, setIsChoosing] = useState<boolean>(false);

  const handleChangeSelProposal = (proposal: Acordo) => {
    setSelProposal(proposal);
  };

  const handleFetchProposals = () => {
    setIsFetching(true);
  };

  const handleChooseProposal = () => {
    setIsChoosing(true);
  };

  useEffect(() => {
    async function fetchData() {
      const proposals = await fetchProposals(devedor);
      setTopProposals(proposals);
      setSelProposal(proposals[0]);
    }

    async function sendData(proposal: Acordo) {
      const newProposal = await chooseProposal(proposal);
    }

    if (isFetching) {
      fetchData();
      setIsFetching(false);
    }

    if (isChoosing && selProposal) {
      sendData(selProposal);
      setIsChoosing(false);
    }
  }, [devedor, isFetching, isChoosing, selProposal]);

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
        {selProposal && (
          <ProposalPodium
            proposals={topProposals}
            changeProposal={handleChangeSelProposal}></ProposalPodium>
        )}
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
          <button onClick={handleChooseProposal}>Escolher Proposta</button>
          <button onClick={handleFetchProposals}>Gerar novas propostas</button>
        </div>
        <span className="w-12 ml-auto invisible hidden lg:block"></span>
      </div>
    </div>
  );
}
