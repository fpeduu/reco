import { Acordo } from "@/models/Acordos";
import Styles from "./proposal-card.module.scss";

interface ProposalCardProps {
  proposal: Acordo;
  position: number;
  isSelected: boolean;
  onSelected: (proposalID: number) => void;
}

export default function ProposalCard({
  proposal,
  position,
  isSelected,
  onSelected,
}: ProposalCardProps) {
  function formatJuros(juros: number) {
    return juros !== 0 ? `${juros * 100}%` : "Sem taxa de juros";
  };

  function totalValue() {
    return (proposal.valor / proposal.qtdParcelas)
            .toFixed(2).replace(".", ",")
  }

  const handleSelect = () => {
    if (isSelected) {
      onSelected(-1);
    } else {
      onSelected(proposal.id);
    }
  };

  return (
    <div className="w-1/5 flex flex-col items-center justify-center">
      <div
        className={Styles.proposalCard}
        data-selected={isSelected}
      >
        <span className="font-medium mb-1">
          <span className="font-extrabold text-xl">
            {position}º&nbsp;
          </span>
          melhor Acordo
        </span>
        <span className="font-bold text-4xl">
          R$ {totalValue()}
        </span>
        <span className="font-medium text-gray-400 text-sm text-center">p/ mês</span>
        <span className="py-5 font-medium text-gray-400 whitespace-pre text-sm text-center">
          {proposal.descricao}
        </span>
        <ul className="font-medium text-sm text-gray-400">
          <li>Valor: {proposal.valor} reais</li>
          <li>Parcela dividida: {proposal.qtdParcelas} meses</li>
          <li>Pagamento: Mensalmente</li>
          <li>Data de pagamento: Dia {proposal.diaPagamento}</li>
          <li>Juros: {formatJuros(proposal.juros)}</li>
        </ul>
      </div>
      <button
        data-selected={isSelected}
        onClick={handleSelect}>
        Selecionar
      </button>
    </div>
  );
};
