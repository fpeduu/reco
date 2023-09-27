import { StatusType } from "@/models/Acordos";
import StatusBarCheckItem from "../StatusBarCheckItem/status-bar-check-item";

interface StatusBarBigProps {
  status: StatusType;
}

const statusList = [
  {
    title: "Aguardando inadimplente",
  },
  {
    title: "Conversa iniciada",
  },
  {
    title: "Primeira proposta",
  },
  {
    title: "Segunda proposta",
  },
  {
    title: "Proposta do devedor",
  },
]

export default function StatusBarBig({ status }: StatusBarBigProps) {
  function getStatusStep(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return 0;
      case "Conversa iniciada":
        return 1;
      case "Primeira proposta":
        return 2;
      case "Segunda proposta":
        return 3;
      case "Proposta do inadimplente":
        return 4;
      case "Aguardando aprovação":
        return 5;
      case "Acordo recusado":
        return 6;
      case "Acordo aceito":
        return 6;
      default:
        return 0;
    }
  }

  const step = getStatusStep(status);

  return (
    <span className="w-full p-1 flex justify-center">
      {statusList.map((statusItem, index) => (
        <StatusBarCheckItem
          title={statusItem.title}
          step={index} key={statusItem.title}
          checkStatus={step > index ? "Completo" :
                       step === index ? "Em andamento" : "Pendente"}
        />
      ))}
      <StatusBarCheckItem
        step={6}
        title={step == 6 ? status : "Acordo aceito"}
        checkStatus={step === 6 ? "Completo" : "Pendente"}
      />
    </span>
  );
}
