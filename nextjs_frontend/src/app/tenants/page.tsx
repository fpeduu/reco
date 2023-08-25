import { serverURL } from "@/config";
import { Condomino } from "@/models/Devedores";

import AuthTitle from "@/components/AuthTItle/auth-title";
import TenantList from "./components/TenantList/tenant-list";

async function fetchTenants() {
  return await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Condomino[];
    }) as Condomino[];
};

export default async function AgreementsPage() {
  const tenants = await fetchTenants();

  return (
    <div className="containerLayout">
      <AuthTitle
        subtitle="Confira os inadimplentes e realize novos acordos"
      />
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-2xl">
            Lista de Condôminos
          </h2>
          <span>Total ({tenants.length})</span>
        </div>
        <TenantList tenants={tenants} />
      </div>
    </div>
  );
}