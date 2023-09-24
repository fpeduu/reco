import { StatusType } from "@/models/Acordos";

interface StatusBarProps {
  statusIndex: number;
}

const primaryBarLengths = ["w-1/6", "w-2/6", "w-3/6", "w-4/6", "w-full", "w-full", "w-0"];
const primaryBarColors = [
  "bg-red-500",
  "bg-amber-500",
  "bg-amber-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-emerald-500",
  "bg-gray-500"
];
const secondaryBarColors = [
  "bg-red-200",
  "bg-amber-200",
  "bg-amber-200",
  "bg-amber-200",
  "bg-emerald-200",
  "bg-emerald-200",
  "bg-gray-500"
];
const textColors = [
  "text-red-500",
  "text-amber-500",
  "text-amber-500",
  "text-amber-500",
  "text-emerald-500",
  "text-emerald-500",
  "text-gray-500"
];

export function getStatusIndex(status: StatusType) {
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
      return -1;
  }
}

export default function StatusBar({ statusIndex }: StatusBarProps) {
  const textColor = textColors.at(statusIndex);
  const barColor = primaryBarColors.at(statusIndex);
  const barLength = primaryBarLengths.at(statusIndex);
  const secondaryBarColor = secondaryBarColors.at(statusIndex);
  const statusPercentage = ((100 / 6) * (statusIndex + 1)).toFixed(0);

  return (
    <>
      <span className={"self-end " + textColor}>
        {statusIndex < 4 ? `${statusPercentage}% completo` : "Completo!"}
      </span>
      <span className="w-full relative">
        <span className={"w-full h-2 absolute z-0 rounded-full " + secondaryBarColor} />
        <span className={barLength + " h-2 z-1 absolute rounded-full " + barColor} />
      </span>
    </>
  );
}
