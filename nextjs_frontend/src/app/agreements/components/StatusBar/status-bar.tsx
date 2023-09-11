import { StatusType } from "@/models/Acordos";

interface StatusBarProps {
  status: StatusType;
}

export default function StatusBar({ status }: StatusBarProps) {
  function getStatusColor(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return "-red-500";
      case "Conversa iniciada":
        return "-amber-500";
      case "Valor reserva alcançado":
        return "-amber-500";
      case "Negociação concluída":
        return "-emerald-500";
      default:
        return "-gray-500";
    }
  }

  function getBarLength(status: StatusType) {
    switch (status) {
      case "Aguardando inadimplente":
        return "w-1/4";
      case "Conversa iniciada":
        return "w-2/4";
      case "Valor reserva alcançado":
        return "w-3/4";
      case "Negociação concluída":
        return "w-full";
      default:
        return "w-0";
    }
  }

  const textColor = "text" + getStatusColor(status);
  const barColor = "bg" + getStatusColor(status);
  const barLength = getBarLength(status);

  return (
    <>
      <span className={"self-end " + textColor}>{status}</span>
      <span className="w-full relative">
        <span className="w-full h-2 absolute z-0 rounded-full bg-gray-500" />
        <span className={barLength + " h-2 z-10 absolute rounded-full " + barColor} />
      </span>
    </>
  );
}
