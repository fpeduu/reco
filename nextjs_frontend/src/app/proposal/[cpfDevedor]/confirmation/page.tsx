"use client";
import Link from "next/link";
import FinalProposalCard from "./components/FinalProposalCard/final-proposal-card";
import { useChoosenProposalContext } from "../contexts/ChoosenProposalContext";
import { useParams } from "next/navigation";

export default function ConfirmationPage() {
  const { choosenProposal } = useChoosenProposalContext();
  const params = useParams();
  const cpfDevedor = params.cpfDevedor;

  return (
    <div className="pt-32 px-96 flex gap-10 justify-between">
      <div className="w-7/12 px-10 flex flex-col justify-between gap-10 text-lg">
        <h1 className="text-4xl font-bold">Falta pouco!</h1>
        <p>
          <span className="font-bold">Parabéns!</span> Você escolheu uma das propostas.
        </p>
        <p className="text-justify">
          Agora, você tem a opção de&nbsp;
          <span className="font-bold">baixá-la em seu dispositivo</span>
          &nbsp;para fazer os devidos encaminhamentos ou&nbsp;
          <span className="font-bold">finalizar a jornada.</span>
          &nbsp;Lembre-se que o documento&nbsp;
          <span className="font-bold">também ficará salvo em nosso sistema</span>
          &nbsp;e você pode acessá-lo na Página Inicial em “Histórico de acordos”.
        </p>
        <div className="flex items-center justify-evenly">
          <Link
            href=""
            className="w-2/6 px-10 py-2.5 rounded-3xl bg-red-600 text-white text-center text-sm font-semibold">
            Fazer Download
          </Link>
          <Link
            href=""
            className="w-2/6 px-10 py-2.5 rounded-3xl bg-red-600 text-white text-center text-sm font-semibold">
            Finalizar
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5">
          <hr className="grow border-black" />
          ou
          <hr className="grow border-black" />
        </div>
        <div className="flex items-center justify-center">
          <Link href={`/proposal/${cpfDevedor}`} className="underline text-sm">
            Gerar outras propostas
          </Link>
        </div>
      </div>
      <FinalProposalCard proposal={choosenProposal} />
    </div>
  );
}
