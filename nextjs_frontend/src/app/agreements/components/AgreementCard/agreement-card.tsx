import { StatusType, AcordoIdentificado } from "@/models/Acordos";

interface AgreementCardProps {
  agreement: AcordoIdentificado;
}

export default function AgreementCard({ agreement }: AgreementCardProps) {
  function getStatusColor(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return "text-red-500";
      case "Conversa iniciada":
        return "text-amber-500";
      case "Valor reserva alcançado":
        return "text-amber-500";
      case "Negociação concluída":
        return "text-emerald-500";
      default:
        return "text-gray-500";
    }
  }

  return (
    <div className="w-1/3 p-5">
      <div className="p-5 flex flex-col rounded-lg text-sm bg-white">
        <span className="text-xl font-bold">{agreement.nomeDevedor}</span>
        <span className="mb-2 text-zinc-500">{agreement.cpfDevedor}</span>
        <span>
          <span className="font-semibold">Local:&nbsp;</span>
          {agreement.nomeCondominio}
        </span>
        <span className={`self-end ${getStatusColor(agreement.status)}`}>
          {agreement.status}
        </span>
      </div>
    </div>
  );
}
