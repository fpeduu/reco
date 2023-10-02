import { StatusType } from "@/models/Acordos";
import StatusBarCheckItem from "../StatusBarCheckItem/status-bar-check-item";
import { getStatusStep } from "@/services/statusSteps";

interface StatusBarBigProps {
  status: StatusType;
}

const statusList: { title: StatusType }[] = [
  { title: "Aguardando inadimplente" },
  { title: "Primeira proposta" },
  { title: "Segunda proposta" },
  { title: "Proposta do inadimplente" },
  { title: "Aguardando aprovação" },
];

export default function StatusBarBig({ status }: StatusBarBigProps) {
  const step = getStatusStep(status);
  const isCompleted = step === 5;

  return (
    <span className="w-full p-1 flex flex-wrap justify-center mb-10 gap-2
                     md:flex-nowrap md:gap-0">
      {statusList.map((statusItem, index) => (
        <StatusBarCheckItem
          title={statusItem.title}
          step={index}
          key={statusItem.title}
          checkStatus={
            step > index
              ? "Completo"
              : step === index
              ? "Em andamento"
              : "Pendente"
          }
        />
      ))}
      <StatusBarCheckItem
        step={5}
        title={isCompleted ? status : "Acordo aceito"}
        checkStatus={isCompleted ? "Completo" : "Pendente"}
      />
    </span>
  );
}
