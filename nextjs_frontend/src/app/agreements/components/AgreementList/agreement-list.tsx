"use client";

import { useEffect, useState } from "react";
import AgreementCard from "../AgreementCard/agreement-card";

import { AcordoIdentificado } from "@/models/Acordos";

import Search from "@/components/Search/search";
import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";

interface AgreementListProps {
  agreements: AcordoIdentificado[];
}

const statusList: string[] = [
  "Todos",
  "Aceito",
  "Negado",
  "Em análise",
]

const agreementsPerPage = 7;

export default function AgreementList({ agreements }: AgreementListProps) {
  const [filteredAgreements, setFilteredAgreements] = 
          useState<AcordoIdentificado[]>(agreements);
  const [condomiunsList, setCondomiunsList] = useState<string[]>([]);
  const [condominium, setCondominium] = useState<string>("Todos");
  const [status, setStatus] = useState<string>("Todos");
  const [page, setPage] = useState(1);
  const totalPageCount = Math.ceil(filteredAgreements.length
                                   / agreementsPerPage);

  useEffect(() => {
    const condomiuns = agreements.map(
      (tenant) => tenant.nomeCondominio);
    const uniqueCondomiuns = condomiuns.filter(
      (condominium, index) => {
      return condomiuns.indexOf(condominium) === index;
    });
    setCondomiunsList(["Todos", ...uniqueCondomiuns]);
  }, [agreements]);

  useEffect(() => {
    setFilteredAgreements(agreements.filter((agreement) => {
      const condominiumFilter = condominium === "Todos" ||
                                agreement.nomeCondominio === condominium;
      const statusFilter = status === "Todos" ||
                            (status === "Aceito" &&
                              agreement.status === "ACEITO PELAS PARTES") ||
                            (status === "Negado" &&
                              agreement.status === "NEGADO PELO INADIMPLENTE") ||
                            (status === "Em análise" &&
                              agreement.status === "EM ANÁLISE");
      return condominiumFilter && statusFilter;
    }));
  }, [condominium, status, agreements]);

  function handleSearch(search: string) {
    if (search === "") {
      return setFilteredAgreements(agreements);
    }
    const searchLower = search.toLowerCase();
    setFilteredAgreements(agreements.filter((agreement) => {
      return agreement.nomeDevedor.toLowerCase().includes(searchLower);
    }));
    setPage(1);
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Condomínio") {
      setCondominium(option);
    } else {
      setStatus(option);
    }
    setPage(1);
  }

  function handlePagination() {
    return filteredAgreements.slice((page - 1) * agreementsPerPage,
                                    page * agreementsPerPage);
  }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      <Search onSearch={handleSearch}/>
      <div className="flex justify-end items-center w-full gap-5">
        <span className="text-neutral-400 text-sm font-medium">
          Filtros:
        </span>
        <Dropdown
          title="Condomínio"
          options={condomiunsList}
          onChange={handleFilterChange}
        />
        <Dropdown
          title="Status do acordo"
          options={statusList}
          onChange={handleFilterChange}
        />
      </div>
      {handlePagination().map((debtor) => (
        <AgreementCard
          key={debtor.id}
          debtorCPF={debtor.cpfDevedor}
          agreementStatus={debtor.status}
          debtorName={debtor.nomeDevedor}
          condominiumName={debtor.nomeCondominio}
        />
      ))}
      <Paginator
        currentPage={page}
        onPageChange={setPage}
        pageLimit={totalPageCount}
      />
    </div>
  );
}
