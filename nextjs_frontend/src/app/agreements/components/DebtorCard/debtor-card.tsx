import Image from "next/image";
import Link from "next/link";
import { serverURL } from "@/config";

interface DebtorCardProps {
  debtorName: string;
  debtorCPF: string;
  condominiumName: string;
  lateTuitions: number;
}

export default function DebtorCard({
  debtorName,
  debtorCPF,
  condominiumName,
  lateTuitions
}: DebtorCardProps) {
  function setStatusImage(lateTuitions: number) {
    switch (lateTuitions) {
      case 0:
        return "/icons/green_check_circle.svg";
      case 1:
        return "/icons/yellow_circle.svg";
      case 2:
        return "/icons/orange_circle.svg";
      case 3:
        return "/icons/red_circle.svg";
      default:
        return "/icons/red_circle.svg";
    }
  }

  return (
    <div className="w-full py-4 px-8 flex items-center justify-between rounded-xl bg-white shadow">
      <div className="flex flex-col items-start gap-1 w-4/12">
        <span className="font-extrabold text-xl">{debtorName}</span>
        <span className="text-xs text-neutral-400 font-medium">
          {condominiumName.toUpperCase()}
        </span>
      </div>
      <div className="w-3/12">
        <p className="font-medium">CPF:</p>
        <span className="text-xs font-medium">{debtorCPF}</span>
      </div>
      <div className="w-3/12">
        <p className="font-medium">Status:</p>
        <div className="flex items-center gap-1 text-xs font-medium">
          <Image
            src={setStatusImage(lateTuitions)}
            alt="check circle"
            width={20}
            height={20}
          />
          <span className="pt-1">
            {lateTuitions > 0 ? `${lateTuitions} meses de atraso` : "Nenhum atraso"}
          </span>
        </div>
      </div>
      <div className="w-2/12 flex items-center justify-end">
        <Link
          className="w-1/2 py-3 px-5 mr-10 rounded-xl text-white text-xs font-medium text-center bg-gray-950"
          href={`${serverURL}/proposal/${debtorCPF}`}>
          Iniciar Acordo
        </Link>
      </div>
    </div>
  );
}
