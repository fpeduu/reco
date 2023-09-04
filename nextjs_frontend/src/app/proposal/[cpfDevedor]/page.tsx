import { serverURL } from "@/config";
import FinalProposalCard from "./components/FinalProposalCard/final-proposal-card";
import DownloadButton from "./components/DownloadButton/download-button";

import { Acordo } from "@/models/Acordos";
import { Devedor } from "@/models/Devedores";
import { Condominio } from "@/models/Condominios";

interface fetchProposalData {
  acordo: Acordo;
  devedor: Devedor;
  condominio: Condominio;
}

async function fetchProposal(cpfDevedor: string) {
  return await fetch(`${serverURL}/api/agreements/${cpfDevedor}/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    }) as fetchProposalData;
}

interface ConfirmationPageProps {
  params: {
    cpfDevedor: string;
  };
}

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const proposal = await fetchProposal(params.cpfDevedor);

  return (
    <div className="containerLayout">
      <div className="pt-10 flex justify-between">
        <div
          className="w-7/12 px-10 flex flex-col justify-between
                        gap-10 text-lg font-medium"
        >
          <h1 className="text-4xl font-bold">Falta pouco!</h1>
          <p>
            <span className="font-extrabold">Parabéns!&nbsp;</span>
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
            <span className="font-extrabold">&nbsp;autenticado&nbsp;</span>
            em nosso sistema, você pode acessar o documento em
            <span className="font-extrabold">
              &nbsp;&quot;Histórico&quot;&nbsp;
            </span>
            no menu superior.
          </p>
          <DownloadButton
            condominio={proposal.condominio}
            devedor={proposal.devedor}
            acordo={proposal.acordo}
          />
        </div>
        <div className="w-5/12 flex justify-center">
          <FinalProposalCard proposal={proposal.acordo} />
        </div>
      </div>
    </div>
  );
}
