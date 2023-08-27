"use client";
import DebtorCard from "../components/DebtorCard/debtor-card";
import { useRouter } from "next/navigation";
import { serverURL } from "@/config";

interface QueryParameters {
  params: {
    condominiumName: string;
    lateTuitions: number;
    debtorName: string;
    debtorCPF: string;
  };
}

export default function ConfirmationPage({ params }: QueryParameters) {
  const router = useRouter();

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
          debtorCPF={params.debtorCPF}
          debtorName={params.debtorName}
          condominiumName={params.condominiumName}
          lateTuitions={params.lateTuitions}
          chosen={true}
        />
        <h2 className="text-xl font-medium leading-10">
          É com esta pessoa que deseja iniciar o acordo?{" "}
        </h2>
        <div className="flex flex-row justify-center gap-5 max-w-lg	">
          <button
            onClick={() =>
              router.push(`${serverURL}/proposal/${params.debtorCPF}`)
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
