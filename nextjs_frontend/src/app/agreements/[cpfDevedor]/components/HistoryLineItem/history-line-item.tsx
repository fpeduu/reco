import { Proposta } from "@/models/Acordos";
import HistoryLineConnection from "../HistoryLineConnection/history-line-connection";

interface HistoryLineItemProps {
  divida?: number;
  proposal?: Proposta;
  align: "left" | "right";
  connect: boolean;
}

export default function HistoryLineItem({
  divida,
  proposal,
  align,
  connect
}: HistoryLineItemProps) {
  const value: number =
    divida && proposal && proposal.entrada > 0
      ? proposal.autor === "User"
        ? proposal.entrada
        : divida * proposal.entrada
      : 0;

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
            {proposal.entrada > 0 && (
              <span className="text-sm text-zinc-500">
                <span className="font-medium">Valor de entrada:</span>&nbsp;
                {value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </span>
            )}
            <span className="text-sm text-zinc-500">
              +
              <span className="font-medium">
                {proposal.qtdParcelas > 1
                  ? `${proposal.qtdParcelas} parcelas`
                  : `${proposal.qtdParcelas} parcela`}
                &nbsp;
              </span>
              de{" "}
              {proposal.valorParcela.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </span>
            {proposal.motivo && (
              <span className="text-sm text-zinc-500">
                <span className="font-medium">Motivo:</span>&nbsp;
                {proposal.motivo}
              </span>
            )}
            {proposal.aceito ? (
              <span className="w-24 h-8 px-2 flex items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                Aceito
              </span>
            ) : (
              <span className="w-24 h-8 px-2 flex items-center justify-center rounded-md bg-rose-100 text-red-600">
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
