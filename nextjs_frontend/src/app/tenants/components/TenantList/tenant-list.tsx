"use client";

import { Condomino } from "@/models/Devedores";
import DebtorCard from "../DebtorCard/debtor-card";
import Search from "@/components/Search/search";
import Dropdown from "@/components/Dropdown/dropdown";
import { useEffect } from "react";

interface TenantListProps {
  tenants: Condomino[];
}

const statusList: string[] = [
  "Todos",
  "Em dia",
  "1 mês de atraso",
  "2 meses de atraso",
  "3 meses ou mais de atraso",
];

const condomiunsList: string[] = ["Todos"];

export default function TenantList({ tenants }: TenantListProps) {
  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);

  function handleSearch(search: string) {
    console.log(search);
  }

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      <Search onSearch={handleSearch} />
      <div className="flex justify-end items-center w-full gap-5">
        <span className="text-neutral-400 text-sm font-medium">Filtros:</span>
        <Dropdown title="Condomínio" options={condomiunsList} />
        <Dropdown title="Meses de atraso" options={statusList} />
      </div>
      <span className="hidden">
        {" "}
        {/* Sem isso não renderiza as cores */}
        <span className="w-5 h-5 rounded-full bg-status-0" />
        <span className="w-5 h-5 rounded-full bg-status-1" />
        <span className="w-5 h-5 rounded-full bg-status-2" />
        <span className="w-5 h-5 rounded-full bg-status-3" />
      </span>
      {tenants.map((tanant) => (
        <DebtorCard
          key={tanant.cpf}
          debtorCPF={tanant.cpf}
          debtorName={tanant.nome}
          condominiumName={tanant.nomeCondominio}
          lateTuitions={tanant.mensalidadesAtrasadas}
          chosen={false}
        />
      ))}
    </div>
  );
}
