"use client";

import { serverURL } from "@/config";
import { AcordoIdentificado } from "@/models/Acordos";
import { getStatusIndex } from "./components/StatusBar/status-bar";
import AgreementList from "./components/AgreementList/agreement-list";
import Search from "@/components/Search/search";
import { useEffect, useState } from "react";
import { Devedor } from "@/models/Devedores";

const BASE_URL = `${serverURL}/api/agreements/`;

const fetchAgreements = async () => {
  return (await fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as AcordoIdentificado[];
    })) as AcordoIdentificado[];
};

async function fetchTenants() {
  return (await fetch(`${serverURL}/api/tenants/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as Devedor[];
    })) as Devedor[];
}

export default function AgreementsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [agreements, setAgreements] = useState<AcordoIdentificado[]>([]);
  const [tenants, setTenants] = useState<Devedor[]>([]);

  useEffect(() => {
    fetchAgreements().then((agreements) => setAgreements(agreements));
    fetchTenants().then((tenants) => setTenants(tenants));
  }, []);

  const inProgressAgreements = agreements.filter((agreement) => {
    if (!agreement) return;
    return getStatusIndex(agreement.status) < 4;
  });

  const endedAgreements = agreements.filter((agreement) => {
    if (!agreement) return;
    return getStatusIndex(agreement.status) > 3;
  });

  return (
    <div className="containerLayout flex flex-col gap-20">
      <Search onSearch={setSearchQuery} />
      <AgreementList
        searchQuery={searchQuery}
        agreements={inProgressAgreements}
        tenants={tenants}
        title="Em andamento"
        description="Confira suas negociações em andamento. Clique nos cards para mais informações."
        filterByProgress={true}
      />
      <AgreementList
        searchQuery={searchQuery}
        agreements={endedAgreements}
        tenants={tenants}
        title="Finalizadas"
        description="Confira suas negociações finalizadas. Clique nos cards para mais informações."
        filterByProgress={false}
      />
    </div>
  );
}
