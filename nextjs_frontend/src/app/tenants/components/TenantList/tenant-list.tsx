"use client";

import DebtorCard from "@/components/DebtorCard/debtor-card";
import { useEffect, useState } from "react";

import { Devedor } from "@/models/Devedores";
import Search from "@/components/Search/search";
import Dropdown from "@/components/Dropdown/dropdown";
import Paginator from "@/components/Paginator/paginator";

interface TenantListProps {
  tenants: Devedor[];
}

const tenantsPerPage = 7;

export default function TenantList({ tenants }: TenantListProps) {
  const [filteredTenants, setFilteredTenants] = useState<Devedor[]>(tenants);
  const [condomiunsList, setCondomiunsList] = useState<string[]>([]);
  const [monthsLateList, setMonthsLateList] = useState<string[]>([]);
  const [condominium, setCondominium] = useState<string>("Todos");
  const [monthsLate, setMonthsLate] = useState<string>("Todos");
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
    const uniqueMonths = tenants
      .map((x) => x.mensalidadesAtrasadas)
      .filter((month, index, arr) => arr.indexOf(month) === index)
      .sort((a, b) => a - b)
      .map((month) => (month === 1 ? month + " mês" : month + " meses"));
    if (uniqueMonths.length > 10) {
      const lastMonth = uniqueMonths[10];
      uniqueMonths.splice(10, uniqueMonths.length - 10);
      uniqueMonths.push(lastMonth + " ou mais");
    }

    setCondomiunsList(["Todos", ...uniqueCondomiuns]);
    setMonthsLateList(["Todos", ...uniqueMonths]);
  }, [tenants]);

  useEffect(() => {
    setFilteredTenants(
      tenants
        .filter((tenant) => {
          const condominiumFilter =
            condominium === "Todos" || tenant.nomeCondominio === condominium;
          if (monthsLate === "Todos") return condominiumFilter;
          const selected = Number(monthsLate.split(" ")[0]);
          const monthsFilter =
            monthsLate.indexOf("ou mais") !== -1
              ? selected <= tenant.mensalidadesAtrasadas
              : selected === tenant.mensalidadesAtrasadas;
          return condominiumFilter && monthsFilter;
        })
        .sort(
          (a, b) =>
            a.nome.localeCompare(b.nome) ||
            a.mensalidadesAtrasadas - b.mensalidadesAtrasadas
        )
    );
  }, [monthsLate, condominium, tenants]);

  function handleSearch(search: string) {
    if (search === "") {
      return setFilteredTenants(tenants);
    }
    const searchLower = search.toLowerCase();

    setFilteredTenants(
      tenants.filter((tenant) => {
        return (
          tenant.nome.toLowerCase().includes(searchLower) ||
          tenant.nomeCondominio.toLowerCase().includes(searchLower) ||
          tenant.cpf.includes(searchLower)
        );
      })
    );
    setPage(1);
  }

  function handlePagination() {
    return filteredTenants.slice(
      (page - 1) * tenantsPerPage,
      page * tenantsPerPage
    );
  }

  function handleFilterChange(title: string, option: string) {
    if (title === "Condomínio") {
      setCondominium(option);
    } else {
      setMonthsLate(option);
    }
    setPage(1);
  }

  return (
    <div className="flex flex-col items-center justify-between gap-3">
      <Search onSearch={handleSearch} />
      <div className="flex justify-end items-center w-full gap-5">
        <span className=" text-sm font-light">Filtrar por:</span>
        <Dropdown
          title="Condomínio"
          options={condomiunsList}
          onChange={handleFilterChange}
        />
        <Dropdown
          title="Atraso"
          options={monthsLateList}
          onChange={handleFilterChange}
        />
      </div>
      {handlePagination().map((tenant) => (
        <DebtorCard key={tenant.cpf} tenant={tenant} />
      ))}
      <Paginator
        currentPage={page}
        onPageChange={setPage}
        pageLimit={totalPageCount}
      />
    </div>
  );
}
