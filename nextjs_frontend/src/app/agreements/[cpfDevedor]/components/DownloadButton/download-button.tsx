"use client";

import { downloadAgreement } from "@/services/agreementGenerator";
import Image from "next/image";
import { DevedorAcordo } from "@/types/acordo.dto";

interface DownloadButtonProps {
  agreement: DevedorAcordo;
}

export default function DownloadButton({ agreement }: DownloadButtonProps) {
  function handleDownloadAgreement() {
    downloadAgreement(agreement);
  }

  return (
    <button
      onClick={handleDownloadAgreement}
      className="h-28 py-4 px-6 flex items-center justify-between gap-5 bg-white rounded-2xl shadow">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50">
        <Image src="/icons/download.svg" alt="download" width={35} height={35} />
      </div>
      <div className="flex flex-col justify-between">
        <span className="font-semibold">Baixar acordo</span>
        <span className="text-zinc-800 font-light">Arquivo em pdf</span>
      </div>
    </button>
  );
}
