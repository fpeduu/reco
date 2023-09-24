import { AcordoIdentificado } from "@/models/Acordos";
import { getStatusIndex } from "../StatusBar/status-bar";
import StatusBar from "../StatusBar/status-bar";
import Link from "next/link";
import { Condomino } from "@/models/Devedores";

interface AgreementCardProps {
  agreement: AcordoIdentificado;
  tenant: Condomino | null;
}

export default function AgreementCard({ agreement, tenant }: AgreementCardProps) {
  return (
    <Link className="w-full cursor-pointer" href={`/agreements/${agreement.cpfDevedor}`}>
      <div className="p-5 flex flex-col rounded-lg text-sm bg-white hover:bg-gray-50">
        <span className="text-xl font-bold">{agreement.nomeDevedor}</span>
        <span className="mb-2 text-zinc-500">{agreement.cpfDevedor}</span>
        <span>
          <span className="font-semibold">Local:&nbsp;</span>
          {agreement.nomeCondominio}
        </span>
        <span>
          <span className="font-semibold">Status:&nbsp;</span>
          {tenant?.mensalidadesAtrasadas ? `${tenant.mensalidadesAtrasadas} meses de atraso` : "-"}
        </span>
        <StatusBar statusIndex={getStatusIndex(agreement.status)} />
      </div>
    </Link>
  );
}
