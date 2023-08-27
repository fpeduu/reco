import Styles from "./agreements-page.module.scss";
import { serverURL } from "@/config";

import { AcordoIdentificado } from "@/models/Acordos";

import AuthTitle from "@/components/AuthTItle/auth-title";
import AgreementList from "./components/AgreementList/agreement-list";

const BASE_URL = `${serverURL}/api/agreements`;

const fetchAgreements = async () => {
  return (await fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as AcordoIdentificado[];
    })) as AcordoIdentificado[];
};

export default async function AgreementsPage() {
  const agreements = await fetchAgreements();

  return (
    <div className={Styles.agreementsPage}>
      <AuthTitle
        subtitle="Confira os acordos já realizados"
      />
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-2xl">
          Acordos Realizados
        </h2>
        <span>Total ({agreements.length})</span>
      </div>
      <AgreementList agreements={agreements}/>
    </div>
  );
}
