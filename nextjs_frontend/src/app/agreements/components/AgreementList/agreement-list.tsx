"use client";

import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";
import { StatusType, AcordoIdentificado } from "@/models/Acordos";
import { useEffect, useState } from "react";
import AgreementCard from "../AgreementCard/agreement-card";
import { Condomino } from "@/models/Devedores";

interface AgreementListProps {
  searchQuery: string;
  title: string;
  description: string;
  agreements: AcordoIdentificado[];
  tenants: Condomino[];
  filterByProgress: boolean;
}

const agreementStatusList: (StatusType | "Todos")[] = [
  "Todos",
  "Aguardando inadimplente",
  "Conversa iniciada",
  "Valor reserva alcançado"
];

const paymentStatusList: string[] = [
  "Todos",
  "Em dia",
  "1 mês de atraso",
  "2 meses de atraso",
  "3 meses ou mais de atraso"
];

const agreementsPerPage = 6;

export default function AgreementList({
  searchQuery,
  title,
  description,
  agreements,
  tenants,
  filterByProgress
}: AgreementListProps) {
  const [filteredAgreements, setFilteredAgreements] = useState<AcordoIdentificado[]>(agreements);

  const [condominiums, setCondominiums] = useState<string[]>([]);

  const [progress, setProgress] = useState<string>("Todos");
  const [condominium, setCondominium] = useState<string>("Todos");
  const [paymentStatus, setPaymentStatus] = useState<string>("Todos");

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
        const tenant = getTenant(agreement.cpfDevedor);
        const progressFilter = progress === "Todos" || agreement.status === progress;
        const condominiumFilter =
          condominium === "Todos" || agreement.nomeCondominio === condominium;
        const paymentStatusFilter =
          tenant?.mensalidadesAtrasadas !== undefined
            ? paymentStatus === "Todos" ||
              (paymentStatus === "Em dia" && tenant?.mensalidadesAtrasadas === 0) ||
              (paymentStatus === "1 mês de atraso" && tenant?.mensalidadesAtrasadas === 1) ||
              (paymentStatus === "2 meses de atraso" && tenant?.mensalidadesAtrasadas === 2) ||
              (paymentStatus === "3 meses ou mais de atraso" && tenant.mensalidadesAtrasadas >= 3)
            : true;
        return (
          (filterByProgress ? progressFilter : true) && condominiumFilter && paymentStatusFilter
        );
      })
    );
  }, [condominium, agreements, filterByProgress, progress, tenants, paymentStatus]);

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
    return filteredAgreements.slice((page - 1) * agreementsPerPage, page * agreementsPerPage);
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Progresso") {
      setProgress(option);
    } else if (title === "Local") {
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
          <h1 className="text-4xl font-extrabold">{title}</h1>
          <p className="text-lg font-medium">{description}</p>
        </div>
        <div className="flex justify-end items-center gap-5">
          <span className="text-neutral-400 text-sm font-medium">Filtros:</span>
          {filterByProgress && (
            <Dropdown
              title="Progresso"
              options={agreementStatusList}
              onChange={handleFilterChange}
            />
          )}
          <Dropdown title="Local" options={condominiums} onChange={handleFilterChange} />
          <Dropdown title="Atraso" options={paymentStatusList} onChange={handleFilterChange} />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
        {handlePagination().map((agreement) => (
          <AgreementCard
            key={agreement.id}
            agreement={agreement}
            tenant={getTenant(agreement.cpfDevedor)}
          />
        ))}
      </div>
      <Paginator currentPage={page} onPageChange={setPage} pageLimit={totalPageCount} />
    </div>
  );
}
