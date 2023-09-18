import { StatusType } from "@/models/Acordos";

interface StatusBarProps {
  status: StatusType;
}

const primaryBarLengths = ["w-0", "w-1/3", "w-2/3", "w-full", "w-0"];
const primaryBarColors = [
  "bg-red-500",
  "bg-amber-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-gray-500"
];
const secondaryBarColors = [
  "bg-red-200",
  "bg-amber-200",
  "bg-amber-200",
  "bg-emerald-200",
  "bg-gray-500"
];
const textColors = [
  "text-red-500",
  "text-amber-500",
  "text-amber-500",
  "text-emerald-500",
  "text-gray-500"
];

export default function StatusBar({ status }: StatusBarProps) {
  function getStatusIndex(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return 0;
      case "Conversa iniciada":
        return 1;
      case "Valor reserva alcançado":
        return 2;
      case "Negociação concluída":
        return 3;
      default:
        return 4;
    }
  }

  const statusIndex = getStatusIndex(status);
  const textColor = textColors[statusIndex];
  const barColor = primaryBarColors[statusIndex];
  const barLength = primaryBarLengths[statusIndex];
  const secondaryBarColor = secondaryBarColors[statusIndex];

  return (
    <>
      <span className={"self-end " + textColor}>{status}</span>
      <span className="w-full relative">
        <span className={"w-full h-2 absolute z-0 rounded-full " + secondaryBarColor} />
        <span className={barLength + " h-2 z-1 absolute rounded-full " + barColor} />
      </span>
    </>
  );
}
