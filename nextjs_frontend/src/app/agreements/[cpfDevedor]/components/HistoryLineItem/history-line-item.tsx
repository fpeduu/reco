import { Proposta } from "@/models/Acordos";
import HistoryLineConnection from "../HistoryLineConnection/history-line-connection";

interface HistoryLineItemProps {
  proposal?: Proposta;
  align: "left" | "right";
  connect: boolean;
}

export default function HistoryLineItem({ proposal, align, connect }: HistoryLineItemProps) {
  return (
    <div className="w-full flex justify-center gap-5">
      {align === "left" && (
        <>
          <span className="w-1/4 invisible"></span>
          <HistoryLineConnection accepted={proposal ? proposal.aceito : null} connect={connect} />
        </>
      )}
      <div className={"w-1/4 flex flex-col " + (align === "left" ? "items-start" : "items-end")}>
        <h1 className="text-xl font-semibold mb-3">
          {!proposal || proposal.autor === "Bot" ? "Sistema" : "Devedor"}
        </h1>
        {proposal && (
          <>
            <span className="text-sm text-zinc-500">
              <span className="font-medium">Valor proposto:</span>&nbsp;
              {proposal.valorParcela.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </span>
            <span className="mb-5 text-xs text-zinc-500">
              <span className="font-medium">Parcelado:</span>&nbsp;
              {proposal.qtdParcelas} meses
            </span>
            {proposal.aceito ? (
              <span className="w-24 h-8 px-2 flex items-center justify-center rounded-md font-medium bg-emerald-50 text-emerald-600">
                Aceito
              </span>
            ) : (
              <span className="w-24 h-8 px-2 flex items-center justify-center rounded-md font-medium bg-rose-100 text-red-600">
                Recusado
              </span>
            )}
          </>
        )}
      </div>
      {align === "right" && (
        <>
          <HistoryLineConnection accepted={proposal ? proposal.aceito : null} connect={connect} />
          <span className="w-1/4 invisible"></span>
        </>
      )}
    </div>
  );
}
