"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { serverURL } from "@/config";
import TenantList from "./components/TenantList/tenant-list";
import { Devedor } from "@/models/Devedores";

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

  useEffect(() => {
    async function getTenants() {
      const tenants = await fetchTenants();
      setTenants(tenants);
    }

    getTenants();
  }, []);

  return (
    <div className="containerLayout">
      <div className="my-10">
        <h1 className="text-4xl font-bold leading-10">
          Olá, {session?.user?.name}!
        </h1>
        <h2 className="text-lg  leading-10">
          Confira os inadimplentes e realize novas negociações
        </h2>
      </div>
      <div className="mb-3 flex items-center justify-start">
        <h2 className="font-semibold text-2xl">Lista de Inadimplentes</h2>
        <span className="font-light text-xs ml-2">
          (Total: {tenants.length})
        </span>
      </div>
      <TenantList tenants={tenants} />;
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
