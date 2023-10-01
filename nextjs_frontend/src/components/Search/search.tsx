"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

interface SearchProps {
  onSearch: (search: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [search, setSearch] = useState("");
  const onDebouncedSearch = useCallback(debounce(onSearch, 200), [onSearch]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value === "") onSearch("");
    else onDebouncedSearch(search);
    setSearch(value);
  }

  function handleClearSearch() {
    setSearch("");
    onSearch("");
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 gap-5 bg-white rounded-lg border-neutral-200 border-2 w-full">
      <div className="flex items-center gap-5 w-full">
        <Image src="/icons/magnifying_glass.svg" alt="search" width={20} height={20} />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full py-2 font-light"
          placeholder="Digite o nome, CPF ou condomínio do inadimplente"
        />
      </div>
      {search !== "" && (
        <button className="w-20 px-4 py-2" onClick={handleClearSearch}>
          Limpar
        </button>
      )}
    </div>
  );
}
