"use client";

import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";
import { StatusType, AcordoIdentificado } from "@/models/Acordos";
import { useEffect, useState } from "react";
import AgreementCard from "../AgreementCard/agreement-card";
import { Devedor } from "@/models/Devedores";
import {
  filterByCodominiumAndMonths,
  getUniqueMonths
} from "@/services/tableUtils";

interface AgreementListProps {
  searchQuery: string;
  title: string;
  description: string;
  agreements: AcordoIdentificado[];
  tenants: Devedor[];
  filterByProgress: boolean;
}
const agreementStatusList: (StatusType | "Todos")[] = [
  "Todos", "Aguardando inadimplente", "Conversa iniciada",
  "Primeira proposta", "Segunda proposta", "Proposta do inadimplente",
  "Aguardando aprovação", "Acordo aceito", "Acordo recusado", 
]
const agreementsPerPage = 6;

export default function AgreementList({
  searchQuery,
  title,
  description,
  agreements,
  tenants,
  filterByProgress,
}: AgreementListProps) {
  const [filteredAgreements, setFilteredAgreements] =
    useState<AcordoIdentificado[]>(agreements);

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
    const apartments = agreements.map(
      (agreement) => agreement.nomeCondominio
    );
    const uniqueCondomiuns = apartments.filter((condominium, index) => {
      return apartments.indexOf(condominium) === index;
    });
    const uniqueMonths = getUniqueMonths(
      tenants.map((x) => x.mensalidadesAtrasadas)
    );

    setCondominiums(["Todos", ...uniqueCondomiuns]);
    setMonthsLateList(["Todos", ...uniqueMonths]);
  }, [agreements]);

  useEffect(() => {
    setFilteredAgreements(
      agreements.filter((agreement) => {
        const tenant = getTenant(agreement.cpfDevedor);
        const firstFilter = filterByCodominiumAndMonths(
          condominium, agreement.nomeCondominio,
          paymentStatus, tenant?.mensalidadesAtrasadas as number
        )
        const progressFilter =
          progress === "Todos" || agreement.status === progress;
        return (firstFilter &&
          (filterByProgress ? progressFilter : true)
        );
      })
    );
  }, [
    condominium,
    agreements,
    filterByProgress,
    progress,
    tenants,
    paymentStatus,
  ]);

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
    } else if (title === "Condomínio") {
      setCondominium(option);
    } else if (title === "Atraso") {
      setPaymentStatus(option);
    }
    setPage(1);
  }

  function getTenant(cpf: string) {
    let tenant = tenants.find((tenant) => tenant.cpf === cpf);
    if (!tenant) return null;
    return tenant;
  }

  return (
    <div className="w-full flex flex-col items-center justify-between gap-5">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="text-lg font-light">{description}</p>
        </div>
        <div className="flex justify-end items-center gap-5">
          <span className="text-sm font-light">Filtrar por:</span>
          {filterByProgress && (
            <Dropdown
              title="Status"
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
            title="Atraso"
            options={monthsLateList}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
        {handlePagination().map((agreement, index) => (
          <AgreementCard
            key={index}
            agreement={agreement}
            tenant={getTenant(agreement.cpfDevedor)}
          />
        ))}
      </div>
      <Paginator
        currentPage={page}
        onPageChange={setPage}
        pageLimit={totalPageCount}
      />
    </div>
  );
}
