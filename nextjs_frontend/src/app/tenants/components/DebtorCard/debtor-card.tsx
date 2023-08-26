import Link from "next/link";
import { serverURL } from "@/config";

interface DebtorCardProps {
  condominiumName: string;
  lateTuitions: number;
  debtorName: string;
  debtorCPF: string;
}

export default function DebtorCard({
  condominiumName,
  lateTuitions,
  debtorName,
  debtorCPF,
}: DebtorCardProps) {
  function getStatusColor(lateTuitions: number) {
    if (lateTuitions > 3) lateTuitions = 3;
    return `bg-status-${lateTuitions}`
  }

  return (
    <div className="w-full py-4 px-8 flex items-center justify-between rounded-xl bg-white shadow">
      <div className="flex flex-col items-start gap-1 w-4/12">
        <span className="font-extrabold text-xl">
          {debtorName}
        </span>
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
          <span className={`w-5 h-5 rounded-full
                          ${getStatusColor(lateTuitions)}`}/>
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
