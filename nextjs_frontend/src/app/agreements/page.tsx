import Styles from "./agreements-page.module.scss";
import { serverURL } from "@/config";
import { Devedor } from "@/models/Devedores";
import { Acordo } from "@/models/Acordos";
import AgreementList from "./components/AgreementList/agreement-list";
import { Condominio } from "@/models/Condominios";

const BASE_URL = `${serverURL}/api/agreements`;

const fetchAgreements = async () => {
  return (await fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Acordo[];
    })) as Acordo[];
};

const fetchDebtors = async () => {
  return (await fetch(`${BASE_URL}/debtors`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Devedor[];
    })) as Devedor[];
};

const fetchCondominiums = async () => {
  return (await fetch(`${BASE_URL}/condominiums`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Condominio[];
    })) as Condominio[];
};

export default async function AgreementsPage() {
  const debtors = await fetchDebtors();
  const agreements = await fetchAgreements();
  const condominiums = await fetchCondominiums();

  return (
    <div className={Styles.agreementsPage}>
      <h1 className="my-10 text-3xl font-bold leading-10">
        Boas-vindas, {"Usuário"}! {/*get username from session*/}
      </h1>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-2xl">Acordos Realizados</h2>
          <span>Total ({agreements.length})</span>
        </div>
        <AgreementList
          agreements={agreements}
          debtors={debtors}
          condominiums={condominiums}
        />
      </div>
    </div>
  );
}
