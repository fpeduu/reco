import { StatusType, AcordoIdentificado } from "@/models/Acordos";
import StatusBar from "../StatusBar/status-bar";

interface AgreementCardProps {
  agreement: AcordoIdentificado;
}

export default function AgreementCard({ agreement }: AgreementCardProps) {
  return (
    <div className="w-1/3 p-5">
      <div className="p-5 flex flex-col rounded-lg text-sm bg-white">
        <span className="text-xl font-bold">{agreement.nomeDevedor}</span>
        <span className="mb-2 text-zinc-500">{agreement.cpfDevedor}</span>
        <span>
          <span className="font-semibold">Local:&nbsp;</span>
          {agreement.nomeCondominio}
        </span>
        <StatusBar status={agreement.status} />
      </div>
    </div>
  );
}
