"use client";

import { serverURL } from "@/config";
import { Devedor } from "@/models/Devedores";

import AuthTitle from "@/components/AuthTItle/auth-title";
import TenantList from "./components/TenantList/tenant-list";
import { useEffect, useState } from "react";

async function fetchTenants() {
  return (await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Devedor[];
    })) as Devedor[];
}

export default function AgreementsPage() {
  const [tenants, setTenants] = useState<Devedor[]>([]);

  useEffect(() => {
    async function getTenants() {
      const tenants = await fetchTenants();
      setTenants(tenants);
    }

    getTenants();
  }, [])

  return (
    <div className="containerLayout">
      <AuthTitle subtitle="Confira os inadimplentes e realize novas negociações" />
      <div className="mb-3 flex items-center justify-start">
        <h2 className="font-bold text-2xl">Lista de Inadimplentes</h2>
        <span className="font-medium text-xs ml-2">(Total: {tenants.length})</span>
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
