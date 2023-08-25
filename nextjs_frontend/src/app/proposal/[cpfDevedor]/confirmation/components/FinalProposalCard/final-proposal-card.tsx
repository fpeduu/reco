import { Acordo } from "@/models/Acordos";
import Styles from "./final-proposal-card.module.scss";

interface FinalProposalCardProps {
  proposal: Acordo;
}

export default function FinalProposalCard({ proposal }: FinalProposalCardProps) {
  function formatJuros(juros: number) {
    return juros !== 0 ? `${juros * 100}%` : "Sem taxa de juros";
  }

  function installmentValue() {
    return (proposal.valor / proposal.qtdParcelas).toFixed(2).replace(".", ",");
  }

  return (
    <div className={Styles.finalProposalCard}>
      <span className="font-medium mb-1">Acordo Gerado:</span>
      <span className="font-bold text-4xl">R$ {installmentValue()}</span>
      <span className="font-medium text-sm text-center">p/ mês</span>
      <span className="py-5 font-medium whitespace-pre text-sm text-center">
        {proposal.descricao}
      </span>
      <ul className="font-medium text-sm">
        <li>Valor: {proposal.valor} reais</li>
        <li>Parcela dividida: {proposal.qtdParcelas} meses</li>
        <li>Pagamento: Mensalmente</li>
        <li>Data de pagamento: Dia {proposal.diaPagamento}</li>
        <li>Juros: {formatJuros(proposal.juros)}</li>
      </ul>
    </div>
  );
}
