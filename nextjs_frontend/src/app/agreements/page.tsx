"use client";

import { serverURL } from "@/config";
import { useEffect, useState } from "react";

import Search from "@/components/Search/search";
import AgreementList from "./components/AgreementList/agreement-list";

import { DevedorAcordo } from "@/types/acordo.dto";
import { getStatusStep } from "@/services/statusSteps";

const fetchAgreements = async () => {
  return (await fetch(`${serverURL}/api/agreements/`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [] as DevedorAcordo[];
    })) as DevedorAcordo[];
};

export default function AgreementsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [agreements, setAgreements] = useState<DevedorAcordo[]>([]);

  useEffect(() => {
    fetchAgreements().then((agreements) => setAgreements(agreements));
  }, []);

  const inProgressAgreements = agreements.filter((agreement) => {
    if (!agreement) return;
    return getStatusStep(agreement.acordo.status) < 6;
  });

  const endedAgreements = agreements.filter((agreement) => {
    if (!agreement) return;
    return getStatusStep(agreement.acordo.status) === 6;
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
