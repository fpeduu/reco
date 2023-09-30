"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { serverURL } from "@/config";
import TenantList from "./components/TenantList/tenant-list";
import { Devedor } from "@/models/Devedores";
import Button from "@/components/Button/button";
import AddTenantModal from "./components/AddTenantModal/add-tenant-modal";

async function fetchTenants() {
  return (await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Devedor[];
    })) as Devedor[];
}

export default function AgreementsPage() {
  const { data: session } = useSession({ required: true });
  const [tenants, setTenants] = useState<Devedor[]>([]);
  const [addingTenant, setAddingTenant] = useState<boolean>(false);

  useEffect(() => {
    async function getTenants() {
      const tenants = await fetchTenants();
      setTenants(tenants);
    }

    getTenants();
  }, [addingTenant]);

  return (
    <div className="containerLayout">
      <div className="my-10">
        <h1 className="text-4xl font-semibold leading-10">Olá, {session?.user?.name}!</h1>
        <h2 className="text-lg font-light leading-10">
          Confira os inadimplentes e realize novas negociações
        </h2>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="font-medium text-2xl">Lista de Inadimplentes</h2>
          <span className="font-light text-xs ml-2">(Total: {tenants.length})</span>
        </div>

        <Button onClick={() => setAddingTenant(true)}>Adicionar</Button>
      </div>
      {addingTenant && <AddTenantModal onClose={() => setAddingTenant(false)} />}

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
