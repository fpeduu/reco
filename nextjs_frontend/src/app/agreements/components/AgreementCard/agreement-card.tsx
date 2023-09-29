import Link from "next/link";
import StatusBar from "../StatusBar/status-bar";
import { DevedorAcordo } from "@/types/acordo.dto";

interface AgreementCardProps {
  agreement: DevedorAcordo;
}

export default function AgreementCard({ agreement }: AgreementCardProps) {
  return (
    <Link
      className="w-full cursor-pointer"
      href={`/agreements/${agreement.cpf}`}
    >
      <div className="p-5 flex flex-col rounded-xl text-sm bg-white hover:bg-gray-50">
        <span className="text-xl font-semibold mb-5">
          {agreement.nome}
        </span>
        <span>
          <span className="font-semibold">CPF:</span>&nbsp;
          {agreement.cpf}
        </span>
        <span>
          <span className="font-semibold">Condomínio:&nbsp;</span>
          {agreement.nomeCondominio}
        </span>
        <span className="mb-5">
          <span className="font-semibold">Atraso:&nbsp;</span>
          {agreement.mensalidadesAtrasadas} meses de atraso
        </span>
        <StatusBar status={agreement.acordo.status} />
      </div>
    </Link>
  );
}
