import { serverURL } from "@/config";
import { Condomino } from "@/models/Devedores";

import AuthTitle from "@/components/AuthTItle/auth-title";
import TenantList from "./components/TenantList/tenant-list";

async function fetchTenants() {
  return (await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Condomino[];
    })) as Condomino[];
}

export default async function AgreementsPage() {
  const tenants = await fetchTenants();

  return (
    <div className="containerLayout">
      <AuthTitle subtitle="Confira os inadimplentes e realize novas negociações" />
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-2xl">Lista de Inadimplentes</h2>
        <span className="font-medium">Total: {tenants.length}</span>
      </div>
      <TenantList tenants={tenants} />
      <span className="hidden">
        {/* Sem isso não renderiza as cores */}
        <span className="w-5 h-5 rounded-full bg-status-0" />
        <span className="w-5 h-5 rounded-full bg-status-1" />
        <span className="w-5 h-5 rounded-full bg-status-2" />
        <span className="w-5 h-5 rounded-full bg-status-3" />
      </span>
    </div>
  );
}
