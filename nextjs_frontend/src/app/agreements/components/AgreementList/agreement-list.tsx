"use client";

import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";
import { StatusType } from "@/models/Acordos";
import { useEffect, useState } from "react";
import AgreementCard from "../AgreementCard/agreement-card";
import {
  filterByCodominiumAndMonths,
  getUniqueMonths,
} from "@/services/tableUtils";
import { DevedorAcordo } from "@/types/acordo.dto";

interface AgreementListProps {
  searchQuery: string;
  title: string;
  description: string;
  agreements: DevedorAcordo[];
  filterByProgress: boolean;
}
const agreementStatusList: (StatusType | "Todos")[] = [
  "Todos",
  "Aguardando inadimplente",
  "Primeira proposta",
  "Segunda proposta",
  "Proposta do inadimplente",
  "Aguardando aprovação",
];
const agreementsPerPage = 6;

export default function AgreementList({
  searchQuery,
  title,
  description,
  agreements,
  filterByProgress,
}: AgreementListProps) {
  const [filteredAgreements, setFilteredAgreements] =
    useState<DevedorAcordo[]>(agreements);

  const [condominiums, setCondominiums] = useState<string[]>([]);
  const [monthsLateList, setMonthsLateList] = useState<string[]>([]);

  const [progress, setProgress] = useState<string>("Todos");
  const [condominium, setCondominium] = useState<string>("Todos");
  const [paymentStatus, setPaymentStatus] = useState<string>("Todos");

  const [page, setPage] = useState(1);

  const totalPageCount = Math.ceil(
    filteredAgreements.length / agreementsPerPage
  );

  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);

  useEffect(() => {
    const apartments = agreements.map((agreement) => agreement.nomeCondominio);
    const uniqueCondomiuns = apartments.filter((condominium, index) => {
      return apartments.indexOf(condominium) === index;
    });
    const uniqueMonths = getUniqueMonths(
      agreements.map((x) => x.mensalidadesAtrasadas)
    );

    setCondominiums(["Todos", ...uniqueCondomiuns]);
    setMonthsLateList(["Todos", ...uniqueMonths]);
  }, [agreements]);

  useEffect(() => {
    setFilteredAgreements(
      agreements.filter((agreement) => {
        const firstFilter = filterByCodominiumAndMonths(
          condominium,
          agreement.nomeCondominio,
          paymentStatus,
          agreement.mensalidadesAtrasadas as number
        );
        const progressFilter =
          progress === "Todos" || agreement.acordo.status === progress;
        return firstFilter && (filterByProgress ? progressFilter : true);
      })
    );
  }, [condominium, agreements, filterByProgress, progress, paymentStatus]);

  useEffect(() => {
    if (searchQuery === "") {
      return setFilteredAgreements(agreements);
    }
    const searchLower = searchQuery.toLowerCase();

    setFilteredAgreements(
      agreements.filter((agreement) => {
        return (
          agreement.nome.toLowerCase().includes(searchLower) ||
          agreement.cpf.includes(searchLower)
        );
      })
    );
    setPage(1);
  }, [searchQuery, agreements, setFilteredAgreements]);

  function handlePagination() {
    return filteredAgreements.slice(
      (page - 1) * agreementsPerPage,
      page * agreementsPerPage
    );
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Progresso") {
      setProgress(option);
    } else if (title === "Condomínio") {
      setCondominium(option);
    } else if (title === "Dívida relativa") {
      setPaymentStatus(option);
    }
    setPage(1);
  }

  return (
    <div className="w-full flex flex-col items-center justify-between gap-5">
      <div
        className="w-full flex flex-col justify-between items-start 
                      px-5 gap-2 lg:gap-0 md:px-0 lg:flex-row"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="text-lg font-light">{description}</p>
        </div>
        <div
          className="flex flex-wrap mt-4 justify-center 
                        items-center gap-5 w-full sm:flex-row sm:w-auto
                        md:mt-0 md:flex-nowrap md:justify-end"
        >
          <span className="text-sm font-light whitespace-nowrap">
            Filtrar por:
          </span>
          {filterByProgress && (
            <Dropdown
              title="Progresso"
              options={agreementStatusList}
              onChange={handleFilterChange}
            />
          )}
          <Dropdown
            title="Condomínio"
            options={condominiums}
            onChange={handleFilterChange}
          />
          <Dropdown
            title="Dívida relativa"
            options={monthsLateList}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div
        className="w-full grid grid-cols-1 gap-5 px-5
                      md:grid-cols-3 md:px-0"
      >
        {handlePagination().map((agreement, index) => (
          <AgreementCard key={index} agreement={agreement} />
        ))}
      </div>
      <Paginator
        currentPage={page}
        onPageChange={setPage}
        pageLimit={totalPageCount}
        uniqueKey={`pag+${title}`}
      />
    </div>
  );
}
