"use client";
import DebtorCard from "../components/DebtorCard/debtor-card";
import { useRouter, useSearchParams } from "next/navigation";
import { serverURL } from "@/config";
import { useEffect, useState } from "react";

interface QueryParameters {
  condominiumName: string;
  lateTuitions: number;
  debtorName: string;
  debtorCPF: string;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<QueryParameters>({
    condominiumName: "",
    lateTuitions: 0,
    debtorName: "",
    debtorCPF: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const parsedQueryParams: QueryParameters = {
      condominiumName: searchParams.get("condominiumName") || "",
      lateTuitions: Number(searchParams.get("lateTuitions")) || 0,
      debtorName: searchParams.get("debtorName") || "",
      debtorCPF: searchParams.get("debtorCPF") || "",
    };

    setQueryParams(parsedQueryParams);
  }, [searchParams]);

  useEffect(() => {
    console.log(queryParams);
  }, []);

  return (
    <div className="containerLayout">
      <div className="flex flex-col justify-center gap-5 m-auto h-full max-w-3xl">
        <h1 className="font-bold text-3xl leading-10">
          Confira as informações
        </h1>
        <h2 className="text-xl font-medium leading-10">
          Você selecionou o seguinte inadimplente:
        </h2>
        <DebtorCard
          debtorCPF={queryParams.debtorCPF}
          debtorName={queryParams.debtorName}
          condominiumName={queryParams.condominiumName}
          lateTuitions={queryParams.lateTuitions}
          chosen={true}
        />
        <h2 className="text-xl font-medium leading-10">
          É com esta pessoa que deseja iniciar o acordo?{" "}
        </h2>
        <div className="flex flex-row justify-center gap-5 max-w-lg	">
          <button
            onClick={() =>
              router.push(`${serverURL}/proposal/${queryParams.debtorCPF}`)
            }
            className="w-1/2 py-3 px-2 rounded-full text-tertiary text-s font-medium text-center bg-secondary"
          >
            Sim, iniciar acordo
          </button>
          <button
            onClick={() => router.back()}
            className="w-1/2 py-3 px-2 rounded-full text-tertiary text-s font-medium text-center bg-[#ADADAD]"
          >
            Não, escolher outra
          </button>
        </div>
      </div>
    </div>
  );
}
