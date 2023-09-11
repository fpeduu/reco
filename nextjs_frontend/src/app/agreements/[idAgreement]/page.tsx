import { serverURL } from "@/config/index";
import { Condomino } from "@/models/Devedores";
import { AcordoIdentificado } from "@/models/Acordos";
import DebtorCard from "@/components/DebtorCard/debtor-card";
import StatusBarBig from "./components/StatusBarBig/status-bar-big"


interface AgreementStatusProps {
  agreement: AcordoIdentificado;
  cpfTenant: string;
}


async function fetchTenants() {
  return (await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .then((tenants) => tenants)
    .catch((error) => {
    console.error(error);
    return [] as Condomino[];
    })) as Condomino[];
}

export default async function AgreementStatus({agreement, cpfTenant}: AgreementStatusProps) {
  const tenant = (await fetchTenants()).find((tenant) => tenant.cpf === cpfTenant);

  return (
  <div className="my-10">
    <h1 className="text-5xl font-extrabold">Confira os detalhes da negociação</h1>
    <h1 className="text-3xl font-extrabold leading-10">
      Informações do inadimplente
    </h1>
    <h2 className="text-xl font-medium leading-10">Confira o inadimplente com quem a negociação foi realizada</h2>
    {tenant && <DebtorCard tenant={tenant} isModal={false} />}
    <h1 className="text-3xl font-extrabold leading-10">
      Progresso
    </h1>
    <h2 className="text-xl font-medium leading-10">Confira o andamento da negociação.&nbsp;
    {agreement.dataAcordo &&
      <span>Ela foi realizada há&nbsp;
        <span className="font-semibold">{(new Date().getDate() - agreement.dataAcordo.getDate()) + " dias"}</span>
      </span>}
    </h2>
    <StatusBarBig status={agreement.status} />
    <h1 className="text-3xl font-extrabold leading-10">
      Proposta final
    </h1>
    <h2 className="text-xl font-medium leading-10">Confira a proposta final decidida entre a Reco e o inadimplente e baixe o documento.</h2>
  </div>
  );
}