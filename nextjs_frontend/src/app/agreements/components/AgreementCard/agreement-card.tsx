import Image from "next/image";
import Link from "next/link";
import { serverURL } from "@/config";

interface AgreementCardProps {
  debtorName: string;
  debtorCPF: string;
  condominiumName: string;
  agreementStatus: string;
  agreementProposalPage: string | null;
}

export default function AgreementCard({
  debtorName,
  debtorCPF,
  condominiumName,
  agreementStatus,
  agreementProposalPage
}: AgreementCardProps) {
  function setStatusStyle(status: string) {
    switch (status) {
      case "ACEITO PELAS PARTES":
        return "flex items-center gap-1 text-green-600 text-xs font-medium";
      case "NEGADO PELO INADIMPLENTE":
        return "flex items-center gap-1 text-red-600 text-xs font-medium";
      default:
        return "flex items-center gap-1 text-green-600 text-xs font-medium";
    }
  }

  function setStatusImage(status: string) {
    switch (status) {
      case "ACEITO PELAS PARTES":
        return "/icons/green_check_circle.svg";
      case "NEGADO PELO INADIMPLENTE":
        return "/icons/red_check_circle.svg";
      default:
        return "/icons/green_check_circle.svg";
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
        <p className="font-medium">Status:</p>
        <div className={setStatusStyle(agreementStatus)}>
          <Image
            src={setStatusImage(agreementStatus)}
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
            !agreementProposalPage ? "text-neutral-400" : "underline hover:cursor-pointer"
          }`}
          href={
            agreementProposalPage ? `${serverURL}/proposal/${agreementProposalPage}` : ""
          }>
          <Image
            src={`/icons/magnifying_glass${
              !agreementProposalPage ? "_inactive" : ""
            }.svg`}
            alt="magnifying glass"
            width={12}
            height={12}
          />
          <span className="pt-1">
            {agreementProposalPage ? "VISUALIZAR" : "NÃO HÁ DOCUMENTO"}
          </span>
        </Link>
      </div>
      <div className="w-2/12 flex items-center justify-end">
        <Link
          className={`w-1/2 py-3 px-5 mr-10 rounded-xl text-white text-xs font-medium text-center cursor-default ${
            agreementProposalPage ? "bg-gray-950 hover:cursor-pointer" : "bg-gray-400"
          }`}
          href={
            agreementProposalPage ? `${serverURL}/proposal/${agreementProposalPage}` : ""
          }>
          Acessar
        </Link>
      </div>
    </div>
  );
}
