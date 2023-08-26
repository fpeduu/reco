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
    <div className="containerLayout">
      <div className="pt-10 flex justify-between">
        <div className="w-7/12 px-10 flex flex-col justify-between gap-10 text-lg font-medium">
          <h1 className="text-4xl font-bold">Falta pouco!</h1>
          <p>
            <span className="font-extrabold">Parabéns!</span> Você escolheu uma das
            propostas.
          </p>
          <p className="text-justify">
            Agora, você tem a opção de&nbsp;
            <span className="font-extrabold">baixá-la em seu dispositivo</span>
            &nbsp;para fazer os devidos encaminhamentos ou&nbsp;
            <span className="font-extrabold">finalizar a jornada.</span>
            &nbsp;Lembre-se que o documento&nbsp;
            <span className="font-extrabold">também ficará salvo em nosso sistema</span>
            &nbsp;e você pode acessá-lo na Página Inicial em “Histórico de acordos”.
          </p>
          <div className="mt-32 mb-10 flex items-center justify-evenly">
            <Link
              href=""
              className="w-2/6 px-10 py-5 rounded-full bg-red-600 text-white text-center font-semibold">
              Fazer Download
            </Link>
          </div>
        </div>
        <div className="w-5/12 flex justify-center">
          <FinalProposalCard proposal={choosenProposal} />
        </div>
      </div>
    </div>
  );
}
