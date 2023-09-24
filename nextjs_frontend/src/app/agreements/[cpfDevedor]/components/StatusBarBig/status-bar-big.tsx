import { StatusType } from "@/models/Acordos";
import StatusBarCheckItem from "../StatusBarCheckItem/status-bar-check-item";

interface StatusBarBigProps {
  status: StatusType;
}

export default function StatusBarBig({ status }: StatusBarBigProps) {
  function getStatusStep(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return 0;
      case "Conversa iniciada":
        return 1;
      case "Valor reserva informado":
        return 2;
      case "Valor reserva alcançado":
        return 3;
      case "Negociação concluída":
        return 4;
      case "Baixar acordo finalizado":
        return 5;
      default:
        return 0;
    }
  }

  const step = getStatusStep(status);

  return (
    <span className="w-full p-1 flex justify-center">
      <StatusBarCheckItem
        step={0}
        title="Aguardando"
        subtitle="inadimplente"
        checkStatus={step > 0 ? "Completo" : "Em andamento"}
      />
      <StatusBarCheckItem
        step={1}
        title="Conversa"
        subtitle="iniciada"
        checkStatus={step > 1 ? "Completo" : step === 1 ? "Em andamento" : "Pendente"}
      />
      <StatusBarCheckItem
        step={2}
        title="Valor reserva"
        subtitle="informado"
        checkStatus={step > 2 ? "Completo" : step === 2 ? "Em andamento" : "Pendente"}
      />
      <StatusBarCheckItem
        step={3}
        title="Valor reserva"
        subtitle="alcançado"
        checkStatus={step > 3 ? "Completo" : step === 3 ? "Em andamento" : "Pendente"}
      />
      <StatusBarCheckItem
        step={4}
        title="Negociação"
        subtitle="concluída"
        checkStatus={step >= 4 ? "Completo" : "Pendente"}
      />
      <StatusBarCheckItem
        step={5}
        title="Baixar acordo"
        subtitle="finalizado"
        checkStatus={step === 5 ? "Completo" : "Pendente"}
      />
    </span>
  );
}
