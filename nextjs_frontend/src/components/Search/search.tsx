"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

interface SearchProps {
  onSearch: (search: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [search, setSearch] = useState("");
  const onDebouncedSearch = useCallback(debounce(onSearch, 500), []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    onDebouncedSearch(search);
    setSearch(event.target.value)
  }

  function handleClearSearch() {
    setSearch("");
    onSearch("");
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 gap-5 bg-white rounded-lg border-neutral-200 border-2 w-full">
      <div className="flex items-center gap-5 w-full">
        <Image
          src="/icons/magnifying_glass.svg"
          alt="search"
          width={20}
          height={20}
        />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full py-2"
          placeholder="Pesquise pelo nome ou CPF do condômino"
        />
      </div>
      <button className="w-20 px-4 py-2" onClick={handleClearSearch}>
        Limpar
      </button>
    </div>
  );
}
