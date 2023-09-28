import { StatusType } from "@/models/Acordos";

interface StatusBarProps {
  status: StatusType;
}

const primaryBarLengths = ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-full", "w-full", "w-0"];
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
      return -1;
  }
}

export default function StatusBar({ status }: StatusBarProps) {
  const statusIndex = getStatusIndex(status);
  const textColor = textColors.at(statusIndex);
  const barColor = primaryBarColors.at(statusIndex);
  const barLength = primaryBarLengths.at(statusIndex);
  const secondaryBarColor = secondaryBarColors.at(statusIndex);

  return (
    <>
      <span className={"mb-2 self-end text-sm " + textColor}>
        {statusIndex < 4 ? `${status}.` : "Negociação concluída!"}
      </span>
      <span className="w-full relative mb-3">
        <span className={"w-full h-3 absolute z-0 rounded-full " + secondaryBarColor} />
        <span className={barLength + " h-3 z-1 absolute rounded-full " + barColor} />
      </span>
    </>
  );
}
