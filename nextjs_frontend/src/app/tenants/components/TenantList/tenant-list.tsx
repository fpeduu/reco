"use client";

import DebtorCard from "../DebtorCard/debtor-card";
import { useEffect, useState } from "react";

import { Condomino } from "@/models/Devedores";
import Search from "@/components/Search/search";
import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";

interface TenantListProps {
  tenants: Condomino[];
}

const statusList: string[] = [
  "Todos",
  "Em dia",
  "1 mês de atraso",
  "2 meses de atraso",
  "3 meses ou mais de atraso"
];

const tenantsPerPage = 7;

export default function TenantList({ tenants }: TenantListProps) {
  const [filteredTenants, setFilteredTenants] = useState<Condomino[]>(tenants);
  const [condomiunsList, setCondomiunsList] = useState<string[]>([]);
  const [condominium, setCondominium] = useState<string>("Todos");
  const [status, setStatus] = useState<string>("Todos");
  const [page, setPage] = useState(1);

  const totalPageCount = Math.ceil(filteredTenants.length / tenantsPerPage);

  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);

  useEffect(() => {
    const condomiuns = tenants.map((tenant) => tenant.nomeCondominio);
    const uniqueCondomiuns = condomiuns.filter((condominium, index) => {
      return condomiuns.indexOf(condominium) === index;
    });
    setCondomiunsList(["Todos", ...uniqueCondomiuns]);
  }, [tenants]);

  useEffect(() => {
    setFilteredTenants(
      tenants.filter((tenant) => {
        const condominiumFilter = condominium === "Todos" || tenant.nomeCondominio === condominium;
        const statusFilter =
          status === "Todos" ||
          (status === "Em dia" && tenant.mensalidadesAtrasadas === 0) ||
          (status === "1 mês de atraso" && tenant.mensalidadesAtrasadas === 1) ||
          (status === "2 meses de atraso" && tenant.mensalidadesAtrasadas === 2) ||
          (status === "3 meses ou mais de atraso" && tenant.mensalidadesAtrasadas >= 3);
        return condominiumFilter && statusFilter;
      })
    );
  }, [status, condominium, tenants]);

  function handleSearch(search: string) {
    if (search === "") {
      return setFilteredTenants(tenants);
    }
    const searchLower = search.toLowerCase();

    setFilteredTenants(
      tenants.filter((tenant) => {
        return tenant.nome.toLowerCase().includes(searchLower) || tenant.cpf.includes(searchLower);
      })
    );
    setPage(1);
  }

  function handlePagination() {
    return filteredTenants.slice((page - 1) * tenantsPerPage, page * tenantsPerPage);
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Local") {
      setCondominium(option);
    } else {
      setStatus(option);
    }
    setPage(1);
  }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      <Search onSearch={handleSearch} />
      <div className="flex justify-end items-center w-full gap-5">
        <span className="text-neutral-400 text-sm font-medium">Filtros:</span>
        <Dropdown title="Local" options={condomiunsList} onChange={handleFilterChange} />
        <Dropdown title="Atraso" options={statusList} onChange={handleFilterChange} />
      </div>
      {handlePagination().map((tenant) => (
        <DebtorCard key={tenant.cpf} tenant={tenant} isModal={false} />
      ))}
      <Paginator currentPage={page} onPageChange={setPage} pageLimit={totalPageCount} />
    </div>
  );
}
