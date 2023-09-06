// TenantModal.tsx
import { serverURL } from "@/config";
import { useProposalContext } from "@/contexts/ProposalContext";
import { Condomino } from "@/models/Devedores";
import { useRouter } from "next/navigation";
import React from "react";
import DebtorCard from "../DebtorCard/debtor-card";

interface TenantInfo {
  name: string;
  address: string;
  // Add more tenant information fields as needed
}

interface TenantModalProps {
  open: boolean;
  onClose: () => void;
  tenantInfo: Condomino;
}

const TenantModal: React.FC<TenantModalProps> = ({
  open,
  onClose,
  tenantInfo,
}) => {
  const router = useRouter();
  const { debtor } = useProposalContext();

  function handleStartAgreement() {
    router.push(`${serverURL}/proposal/${debtor.cpf}`);
  }
  // const modalClasses = `fixed inset-0 flex items-center justify-center z-50 ${
  //   open ? "opacity-100" : "opacity-0 pointer-events-none"
  // }`;
  // const modalContentClasses = "bg-white w-96 p-6 rounded shadow-md";
  // const closeButtonClasses =
  //   "absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer";
  const closeModal = () => {
    console.log("Close modal function called from modal");
    onClose(); // Check if this is called correctly
  };
  return (
    <div>
      {open && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
              <div className="relative p-8 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                <div className="bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div> */}
                    <div className="mt-3 gap-5 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h1
                        className="font-bold text-3xl leading-10"
                        id="modal-title"
                      >
                        Confira as informações
                      </h1>
                      <h2 className="text-xl font-medium leading-10">
                        Você selecionou o seguinte inadimplente:
                      </h2>
                      <div className="w-full min-w-max">
                        <DebtorCard tenant={debtor} isModal={true} />
                      </div>
                      <h2 className="text-xl font-medium leading-10">
                        É com esta pessoa que deseja iniciar o acordo?
                      </h2>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <div className="flex flex-row justify-center place-items-center gap-5 w-full">
                    <button
                      onClick={handleStartAgreement}
                      className="w-1/2 py-3 px-2 rounded-full text-tertiary
                       text-s font-medium text-center bg-secondary"
                    >
                      Sim, iniciar acordo
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-1/2 py-3 px-2 rounded-full text-tertiary
                       text-s font-medium text-center bg-[#808080]"
                    >
                      Não, escolher outra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantModal;
