"use client";

import { serverURL } from "@/config";
import { AcordoIdentificado } from "@/models/Acordos";
import AgreementList from "./components/AgreementList/agreement-list";
import Search from "@/components/Search/search";
import { useEffect, useState } from "react";

const BASE_URL = `${serverURL}/api/agreements/`;

const fetchAgreements = async () => {
  return (await fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as AcordoIdentificado[];
    })) as AcordoIdentificado[];
};

export default function AgreementsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [agreements, setAgreements] = useState<AcordoIdentificado[]>([]);

  useEffect(() => {
    fetchAgreements().then((agreements) => setAgreements(agreements));
  }, []);

  const inProgressAgreements = agreements.filter((agreement) => {
    return agreement.status !== "Negociação concluída";
  });

  const endedAgreements = agreements.filter((agreement) => {
    return agreement.status === "Negociação concluída";
  });

  return (
    <div className="containerLayout flex flex-col gap-20">
      <Search onSearch={setSearchQuery} />
      <AgreementList
        searchQuery={searchQuery}
        agreements={inProgressAgreements}
        title="Em andamento"
        description="Confira suas negociações em andamento. Clique nos cards para mais informações."
        filterByProgress={true}
      />
      <AgreementList
        searchQuery={searchQuery}
        agreements={endedAgreements}
        title="Finalizadas"
        description="Confira suas negociações finalizadas. Clique nos cards para mais informações."
        filterByProgress={false}
      />
    </div>
  );
}
