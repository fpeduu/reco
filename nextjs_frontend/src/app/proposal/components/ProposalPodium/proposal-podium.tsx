"use client";
import { useState } from "react";
import { Acordo } from "@/models/Acordos";
import Styles from "./proposal-podium.module.scss";

const ProposalCard = ({
  isSelected,
  onClick,
  index,
  position,
  proposal
}: {
  isSelected: boolean;
  onClick: Function;
  index: number;
  position: number;
  proposal: Acordo;
}) => {
  return (
    <div className="w-1/5 flex flex-col items-center justify-center">
      <div className={Styles.proposalCard + " " + (isSelected ? Styles.selected : "")}>
        <span className="font-medium mb-1">
          <span className="font-extrabold text-xl">{position}º</span>melhor Acordo
        </span>
        <span className="font-bold text-4xl">R$ {proposal.valor}</span>
        <span className="font-medium text-[#969696] text-sm text-center">p/ mês</span>
        <span className="py-5 font-medium text-[#969696] whitespace-pre text-sm text-center">
          {proposal.descricao}
        </span>
        <ul>
          <li>Valor: {proposal.valor} reais</li>
          <li>Parcela dividida: {proposal.qtdParcelas} meses</li>
          <li>Pagamento: Mensalmente</li>
          <li>Data de pagamento: Dia {proposal.diaPagamento}</li>
          <li>
            Juros:{" "}
            {proposal.juros !== 0 ? `${proposal.juros * 100}%` : "Sem taxa de juros"}
          </li>
        </ul>
      </div>
      <button
        className={isSelected ? Styles.active : ""}
        onClick={() => onClick(index, position - 1)}>
        Selecionar
      </button>
    </div>
  );
};

const CardList = ({
  proposals,
  selectedCard,
  handleCardClick
}: {
  proposals: Acordo[];
  selectedCard: number;
  handleCardClick: Function;
}) => {
  return (
    <>
      {[proposals[1], proposals[0], proposals[2]].map((proposal, index) => (
        <ProposalCard
          key={index}
          index={index}
          isSelected={selectedCard === index}
          onClick={handleCardClick}
          position={proposals.indexOf(proposal) + 1}
          proposal={proposal}
        />
      ))}
    </>
  );
};

export default function ProposalPodium({
  proposals,
  changeProposal
}: {
  proposals: Acordo[];
  changeProposal: Function;
}) {
  const [selectedCard, setSelectedCard] = useState(1);

  const handleCardClick = (index: number, position: number) => {
    setSelectedCard(index);
    changeProposal(proposals[position]);
  };

  return (
    <div className={Styles.cardWrapper}>
      <CardList
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
        proposals={proposals}
      />
    </div>
  );
}
