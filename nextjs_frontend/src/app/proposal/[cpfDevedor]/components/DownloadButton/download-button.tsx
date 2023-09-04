"use client";

import { downloadAgreement } from "@/services/agreementGenerator";

import { Acordo } from "@/models/Acordos";
import { Devedor } from "@/models/Devedores";
import { Condominio } from "@/models/Condominios";

interface DownloadButtonProps {
  acordo: Acordo;
  devedor: Devedor;
  condominio: Condominio;
}

export default function DownloadButton({
  devedor, acordo, condominio,
}: DownloadButtonProps) {
  function handleDownloadAgreement() {
    downloadAgreement(devedor, acordo, condominio);
  }

  return (
    <div className="mt-32 mb-10 flex items-center justify-evenly">
      <button
          className="w-56 px-10 py-5 rounded-full bg-red-600
              text-white text-center font-semibold"
          onClick={handleDownloadAgreement}
      >
          Fazer Download
      </button>
    </div>
  )
}