"use client";

import { serverURL } from "@/config";
import AuthTitle from "@/components/AuthTItle/auth-title";
import TenantList from "./components/TenantList/tenant-list";
import { Devedor } from "@/models/Devedores";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

async function fetchTenants(administradorEmail: string) {
  return (await fetch(`${serverURL}/api/tenants/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ administradorEmail }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Devedor[];
    })) as Devedor[];
}

export default function AgreementsPage() {
  const [tenants, setTenants] = useState<Devedor[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getTenants = async () => {
      const email = session?.user?.email ?? "teste";
      const newTenants: Devedor[] = await fetchTenants(email);
      console.log(email);
      setTenants(newTenants);

      console.log(newTenants);
    };

    getTenants();
  }, [session]);

  return (
    <div className="containerLayout">
      <AuthTitle subtitle="Confira os inadimplentes e realize novas negociações" />
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold text-2xl">Lista de Inadimplentes</h2>
        <span className="font-medium">Total: {tenants.length}</span>
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
