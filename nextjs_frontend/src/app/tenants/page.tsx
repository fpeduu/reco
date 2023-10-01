"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { serverURL } from "@/config";

import { Acordo } from "@/models/Acordos";
import { Devedor } from "@/models/Devedores";
import Button from "@/components/Button/button";
import TenantList from "./components/TenantList/tenant-list";
import AddTenantModal from "./components/AddTenantModal/add-tenant-modal";
import ImportTenantModal from "./components/ImportTenantModal/import-tenant-modal";
import { INegotiationData } from "./components/TenantModal/components/Modal-content";

async function fetchTenants() {
  return (await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Devedor[];
    })) as Devedor[];
}

async function createAgreement(
  cpf: string,
  entrada: number,
  valorParcela: number,
  valorTotal: number,
  qtdParcelas: number
) {
  return (await fetch(`${serverURL}/api/agreements/${cpf}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ entrada, valorParcela, valorTotal, qtdParcelas })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return null;
    })) as Acordo | null;
}

export default function AgreementsPage() {
  const { data: session } = useSession({ required: true });
  const [tenants, setTenants] = useState<Devedor[]>([]);
  const [addingTenant, setAddingTenant] = useState<boolean>(false);
  const [importingTenant, setImportingTenant] = useState<boolean>(false);

  useEffect(() => {
    async function getTenants() {
      const tenants = await fetchTenants();
      setTenants(tenants);
    }

    getTenants();
  }, [addingTenant, importingTenant]);

  async function onCreateAgreement(debtor: Devedor, negotiation: INegotiationData) {
    return createAgreement(
      debtor.cpf,
      negotiation.bestValue,
      negotiation.bestInstallments,
      debtor.valorDivida,
      negotiation.melhorParcela as number
    ).then((agreement) => {
      if (agreement) {
        setTenants((tenants) => tenants.filter(
          (tenant) => (tenant.cpf !== debtor.cpf)
        ));
        return true;
      } else {
        return false;
      }
    })
  }

  return (
    <div className="containerLayout">
      <div className="my-10">
        <h1 className="text-4xl font-semibold leading-10">Olá, {session?.user?.name}!</h1>
        <h2 className="text-lg font-light leading-10">
          Confira os inadimplentes e realize novas negociações
        </h2>
      </div>
      <div className="mb-3 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center">
          <h2 className="font-medium text-2xl">Lista de Inadimplentes</h2>
          <span className="font-light text-xs ml-2 whitespace-nowrap">
            (Total: {tenants.length})
          </span>
        </div>
        <span className="flex items-center gap-6">
          <Button onClick={() => setImportingTenant(true)}>Importar</Button>
          <Button onClick={() => setAddingTenant(true)}>Adicionar</Button>
        </span>
      </div>
      {addingTenant && <AddTenantModal onClose={() => setAddingTenant(false)} />}
      {importingTenant && <ImportTenantModal onClose={() => setImportingTenant(false)} />}

      <TenantList tenants={tenants} onCreateAgreement={onCreateAgreement} />
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
