// TenantModal.tsx
import { serverURL } from "@/config";
import { useProposalContext } from "@/contexts/ProposalContext";
import { Condomino } from "@/models/Devedores";
import { useRouter } from "next/navigation";
import React from "react";
import DebtorCard from "@/components/DebtorCard/debtor-card";

interface TenantInfo {
  name: string;
  address: string;
  // Add more tenant information fields as needed
}

interface TenantModalProps {
  open: boolean;
  onClose: () => void;
}

const TenantModal: React.FC<TenantModalProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { debtor } = useProposalContext();

  function handleStartAgreement() {
    router.push(`${serverURL}/proposal/${debtor.cpf}`);
  }

  const closeModal = () => {
    onClose();
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 h-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative p-8 transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                <div className="bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start ">
                    <button
                      onClick={closeModal}
                      className="absolute top-2 right-6 text-5xl h-0 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                    <div className="mt-3 gap-5 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h1
                        className="font-bold text-3xl leading-10"
                        id="modal-title"
                      >
                        Confira as informações
                      </h1>
                      <h2 className="text-xl font-medium mt-2 leading-10">
                        Você selecionou o seguinte inadimplente:
                      </h2>
                      <div className="w-full max-w-3xl my-5">
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
                      Sim, negociar com esta pessoa
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-1/2 py-3 px-2 rounded-full text-tertiary
                       text-s font-medium text-center bg-[#808080]"
                    >
                      Não, negociar com outra pessoa
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
