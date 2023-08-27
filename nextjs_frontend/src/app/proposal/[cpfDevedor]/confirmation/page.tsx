import Link from "next/link";
import { serverURL } from "@/config";
import { Acordo } from "@/models/Acordos";
import FinalProposalCard from "./components/FinalProposalCard/final-proposal-card";

async function fetchProposal(cpfDevedor: string) {
  return (await fetch(`${serverURL}/api/agreements/${cpfDevedor}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return {} as Acordo;
    }
  )) as Acordo;
}

interface ConfirmationPageProps {
  params: {
    cpfDevedor: string;
  };
}

export default async function ConfirmationPage({
  params
}: ConfirmationPageProps) {
  const proposal = await fetchProposal(params.cpfDevedor);

  return (
    <div className="containerLayout">
      <div className="pt-10 flex justify-between">
        <div className="w-7/12 px-10 flex flex-col justify-between
                        gap-10 text-lg font-medium">
          <h1 className="text-4xl font-bold">
            Falta pouco!
          </h1>
          <p>
            <span className="font-extrabold">
              Parabéns!&nbsp;
            </span>
            Uma proposta foi aprovada!
          </p>
          <p className="text-justify">
            Agora, você pode realizar o
            <span className="font-extrabold">
              &nbsp;download em seu dispositivo&nbsp;
            </span>
            para os devidos encaminhamentos! Lembre-se que o documento
            <span className="font-extrabold">
              &nbsp;também ficará salvo em nosso sistema&nbsp;
            </span>
            para ser acessado quando quiser. Caso você estiver
            <span className="font-extrabold">
              &nbsp;autenticado&nbsp;
            </span>
            em nosso sistema, você pode acessar o documento em
            <span className="font-extrabold">
              &nbsp;"Histórico"&nbsp;
            </span>
            no menu superior.
          </p>
          <div className="mt-32 mb-10 flex items-center justify-evenly">
            <Link
              href=""
              className="w-56 px-10 py-5 rounded-full bg-red-600
                       text-white text-center font-semibold">
              Fazer Download
            </Link>
          </div>
        </div>
        <div className="w-5/12 flex justify-center">
          <FinalProposalCard proposal={proposal} />
        </div>
      </div>
    </div>
  );
}
