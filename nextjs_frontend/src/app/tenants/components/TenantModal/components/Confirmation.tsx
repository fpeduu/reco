import Image from "next/image";
import Link from "next/link";

import { serverURL } from "@/config";

interface ConfirmationProps {
  identifier: string;
}

export default function Confirmation({ identifier }: ConfirmationProps) {
  function copyToClipboard() {
    const link = `${serverURL}/negociacao/${identifier}`;
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="bg-white pt-16 md:p-16 flex justify-center">
      <div
        className="mt-3 sm:mt-0 max-w-2xl w-full gap-5 flex flex-col 
                      items-center">
        <Image src="/icons/confirmation.svg" alt="confirmation img" width={60} height={60} />

        <h1
          className="text-[#10B981] font-medium text-4xl leading-10 text-center md:text-start"
          id="modal-title">
          Link para negociação gerado!
        </h1>
        <p className="text-lg font-light text-center leading-5">
          Envie o link a seguir ao inadimplente para iniciar a negociação. <br />
          Você pode acompanhar o processo na página de&nbsp;
          <Link href="/agreements" className="underline font-semibold">
            Negociações.
          </Link>
        </p>

        <div
          className="w-full bg-tertiary rounded-sm text-lg
                        font-light p-2 mt-4 flex flex-wrap items-center overflow-x-auto break-keep whitespace-nowrap">
          {serverURL}/negociacao/{identifier}
          <button className="md:ml-auto hover:bg-gray-100 rounded-sm p-1" onClick={copyToClipboard}>
            <Image src="/icons/copy.svg" alt="Copy link" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
