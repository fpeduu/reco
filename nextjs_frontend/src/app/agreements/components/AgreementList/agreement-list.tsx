"use client";

import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";
import { StatusType, AcordoIdentificado } from "@/models/Acordos";
import { useEffect, useState } from "react";
import AgreementCard from "../AgreementCard/agreement-card";

interface AgreementListProps {
  searchQuery: string;
  title: string;
  description: string;
  agreements: AcordoIdentificado[];
  filterByProgress: boolean;
}

const statusList: (StatusType | "Todos")[] = [
  "Todos",
  "Aguardando inadimplente",
  "Conversa iniciada",
  "Valor reserva alcançado"
];

const agreementsPerPage = 6;

export default function AgreementList({
  searchQuery,
  title,
  description,
  agreements,
  filterByProgress
}: AgreementListProps) {
  const [filteredAgreements, setFilteredAgreements] =
    useState<AcordoIdentificado[]>(agreements);

  const [condominiums, setCondominiums] = useState<string[]>([]);

  const [progress, setProgress] = useState<string>("Todos");
  const [condominium, setCondominium] = useState<string>("Todos");

  const [page, setPage] = useState(1);

  const totalPageCount = Math.ceil(filteredAgreements.length / agreementsPerPage);

  useEffect(() => {
    const condominiums = agreements.map((agreement) => agreement.nomeCondominio);
    const uniqueCondomiuns = condominiums.filter((condominium, index) => {
      return condominiums.indexOf(condominium) === index;
    });
    setCondominiums(["Todos", ...uniqueCondomiuns]);
  }, [agreements]);

  useEffect(() => {
    setFilteredAgreements(
      agreements.filter((agreement) => {
        const progressFilter = progress === "Todos" || agreement.status === progress;
        const condominiumFilter =
          condominium === "Todos" || agreement.nomeCondominio === condominium;
        return (filterByProgress ? progressFilter : true) && condominiumFilter;
      })
    );
  }, [condominium, agreements, filterByProgress, progress]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  function handleSearch(search: string) {
    if (search === "") {
      return setFilteredAgreements(agreements);
    }
    const searchLower = search.toLowerCase();

    setFilteredAgreements(
      agreements.filter((agreement) => {
        return (
          agreement.nomeDevedor.toLowerCase().includes(searchLower) ||
          agreement.cpfDevedor.includes(searchLower)
        );
      })
    );
    setPage(1);
  }

  function handlePagination() {
    return filteredAgreements.slice(
      (page - 1) * agreementsPerPage,
      page * agreementsPerPage
    );
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Progresso") {
      setProgress(option);
    } else if (title === "Local") {
      setCondominium(option);
    }
    setPage(1);
  }

  return (
    <div className="w-full flex flex-col items-center justify-between gap-5">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold">{title}</h1>
          <p className="text-lg font-medium">{description}</p>
        </div>
        <div className="flex justify-end items-center gap-5">
          <span className="text-neutral-400 text-sm font-medium">Filtros:</span>
          {filterByProgress && (
            <Dropdown
              title="Progresso"
              options={statusList}
              onChange={handleFilterChange}
            />
          )}
          <Dropdown title="Local" options={condominiums} onChange={handleFilterChange} />
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {handlePagination().map((agreement) => (
          <AgreementCard key={agreement.id} agreement={agreement} />
        ))}
      </div>
      <Paginator currentPage={page} onPageChange={setPage} pageLimit={totalPageCount} />
    </div>
  );
}
