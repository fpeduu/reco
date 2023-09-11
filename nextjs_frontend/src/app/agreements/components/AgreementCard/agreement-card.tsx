import Image from "next/image";
import Link from "next/link";
import { serverURL } from "@/config";
import { useEffect } from "react";

interface AgreementCardProps {
  debtorName: string;
  debtorCPF: string;
  condominiumName: string;
  agreementStatus:
    | "ACEITO PELAS PARTES"
    | "NEGADO PELO INADIMPLENTE"
    | "EM ANÁLISE";
}

export default function AgreementCard({
  debtorName,
  debtorCPF,
  condominiumName,
  agreementStatus,
}: AgreementCardProps) {
  const hasDocument = agreementStatus === "ACEITO PELAS PARTES";

  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);

  function setStatusStyle(status: string) {
    switch (status) {
      case "ACEITO PELAS PARTES":
        return "flex items-center gap-1 text-green-600 text-xs font-medium";
      case "NEGADO PELO INADIMPLENTE":
        return "flex items-center gap-1 text-red-600 text-xs font-medium";
      default:
        return "flex items-center gap-1 text-gray-600 text-xs font-medium";
    }
  }

  function setStatusImage(status: string) {
    switch (status) {
      case "ACEITO PELAS PARTES":
        return "/icons/green_check_circle.svg";
      case "NEGADO PELO INADIMPLENTE":
        return "/icons/red_check_circle.svg";
      default:
        return "/icons/loading.svg";
    }
  }

  return (
    <div className="w-full py-4 px-8 flex items-center justify-between rounded-xl bg-white shadow">
      <div className="flex flex-col items-start gap-1 w-4/12">
        <span className="font-extrabold text-xl">{debtorName}</span>
        <span className="text-xs text-neutral-400 font-medium">
          {condominiumName}
        </span>
      </div>
      <div className="w-3/12">
        <p className="font-medium">Status:</p>
        <div className={setStatusStyle(agreementStatus)}>
          <Image
            src={setStatusImage(agreementStatus)}
            className={
              agreementStatus === "EM ANÁLISE"
                ? "animate-spin text-secondary"
                : ""
            }
            alt="check circle"
            width={20}
            height={20}
          />
          <span className="pt-1">{agreementStatus}</span>
        </div>
      </div>
      <div className="w-3/12">
        <p className="font-medium">Documento:</p>
        <Link
          className={`w-fit flex items-center gap-1 text-xs font-medium cursor-default ${
            !hasDocument ? "text-neutral-400" : "underline hover:cursor-pointer"
          }`}
          href={hasDocument ? `${serverURL}/proposal/${debtorCPF}` : ""}
        >
          <Image
            src={`/icons/magnifying_glass${
              !hasDocument ? "_inactive" : ""
            }.svg`}
            alt="magnifying glass"
            width={12}
            height={12}
          />
          <span className="pt-1">
            {hasDocument ? "VISUALIZAR" : "NÃO HÁ DOCUMENTO"}
          </span>
        </Link>
      </div>
      <div className="w-24 flex items-center justify-end">
        <Link
          className="w-full py-3 px-5 rounded-xl text-white text-xs font-medium text-center cursor-default bg-gray-950 hover:cursor-pointer"
          href={`${serverURL}/proposal/${debtorCPF}/`}
        >
          Acessar
        </Link>
      </div>
    </div>
  );
}
