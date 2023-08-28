"use client";

import { useEffect, useState } from "react";
import { Acordo } from "@/models/Acordos";
import ProposalCard from "../ProposalCard/proposal-card";
import ProposalPodiumLoading from "../ProposalLoading/proposal-loading";

import Styles from "./proposal-podium.module.scss";

interface ProposalPodiumProps {
  proposals: Acordo[];
  changeProposal: (proposal: Acordo) => void;
}

export default function ProposalPodium({
  proposals,
  changeProposal
}: ProposalPodiumProps) {
  const [selectedCardID, setSelectedCardID] = useState<number>();

  function choosedPolicy(proposal: Acordo) {
    if (proposal.status === "ACEITO PELAS PARTES") {
      setSelectedCardID(proposal.id);
    }
  }

  useEffect(() => {
    proposals.forEach(choosedPolicy);
  }, [proposals]);

  function proposalsSorted(): Array<[number, Acordo]> {
    const middleIndex = Math.floor(proposals.length / 2);
    const output = new Array(proposals.length).fill(null);

    for (let i = 0; i < proposals.length; i++) {
      const isEven = i % 2 === 0;
      const divided = i - Math.floor(i / 2);
      const index = isEven ? middleIndex + divided
                           : middleIndex - divided;
      output[index] = [i + 1, proposals[i]];
    }

    return output;
  }

  const handleCardClick = (proposalID: number) => {
    const selectedProposal = proposals.filter(
      (proposal) => proposal.id === proposalID)[0];
    setSelectedCardID(proposalID);
    changeProposal(selectedProposal);
  };

  return (
    <div className={Styles.cardWrapper}>
      {proposals.length === 0 && [2, 1, 3].map((id) => (
        <div key={id}
          className="w-1/5 flex flex-col items-center justify-center">
            <ProposalPodiumLoading priority={id}/>
        </div>
      ))}
      {proposalsSorted().map(([priority, proposal]) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          priority={priority}
          onSelected={handleCardClick}
          isSelected={selectedCardID === proposal.id}
        />
      ))}
    </div>
  );
};
