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
  "3 meses ou mais de atraso",
]

const tenantsPerPage = 7;

export default function TenantList({
  tenants
}: TenantListProps) {
  const [filteredTenants, setFilteredTenants] = useState<Condomino[]>(tenants);
  const [condomiunsList, setCondomiunsList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const totalPageCount = Math.ceil(
    filteredTenants.length / tenantsPerPage);

  useEffect(() => {
    // @ts-ignore
    import('preline');
  }, [])

  useEffect(() => {
    const condomiuns = tenants.map(
      (tenant) => tenant.nomeCondominio);
    const uniqueCondomiuns = condomiuns.filter(
      (condominium, index) => {
      return condomiuns.indexOf(condominium) === index;
    });
    setCondomiunsList(["Todos", ...uniqueCondomiuns]);
  }, [tenants]);

  function handleSearch(search: string) {
    if (search === "") {
      return setFilteredTenants(tenants);
    }
    const searchLower = search.toLowerCase();
    setFilteredTenants(tenants.filter((tenant) => {
      return tenant.nome.toLowerCase().includes(searchLower);
    }));
    setPage(1);
  }

  function handlePagination() {
    return filteredTenants.slice((page - 1) * tenantsPerPage,
                                page * tenantsPerPage);
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Condomínio") {
      if (option === "Todos") {
        return setFilteredTenants(tenants);
      }
      setFilteredTenants(tenants.filter((tenant) => {
        return tenant.nomeCondominio === option;
      }));
    } else if (title === "Meses de atraso") {
      if (option === "Todos") {
        return setFilteredTenants(tenants);
      }
      setFilteredTenants(tenants.filter((tenant) => {
        switch (option) {
          case "Em dia":
            return tenant.mensalidadesAtrasadas === 0;
          case "1 mês de atraso":
            return tenant.mensalidadesAtrasadas === 1;
          case "2 meses de atraso":
            return tenant.mensalidadesAtrasadas === 2;
          case "3 meses ou mais de atraso":
            return tenant.mensalidadesAtrasadas >= 3;
        }
      }));
    }
    setPage(1);
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
          title="Meses de atraso"
          options={statusList}
          onChange={handleFilterChange}
        />
      </div>
      {handlePagination().map((tanant) => (
        <DebtorCard
          key={tanant.cpf}
          debtorCPF={tanant.cpf}
          debtorName={tanant.nome}
          condominiumName={tanant.nomeCondominio}
          lateTuitions={tanant.mensalidadesAtrasadas}
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
