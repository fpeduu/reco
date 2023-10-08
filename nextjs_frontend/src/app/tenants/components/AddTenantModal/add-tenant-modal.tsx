import { useState } from "react";
import { Devedor } from "@/models/Devedores";
import { serverURL } from "@/config";

import Button from "@/components/Button/button";
import SnackBar from "@/components/SnackBar/snack-bar";

interface AddTenantModalProps {
  onClose: () => void;
}

export default function AddTenantModal({ onClose }: AddTenantModalProps) {
  const [form, setForm] = useState<Devedor>({} as Devedor);
  const [averageDebit, setAverageDebit] = useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function handleAverageDebitChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setAverageDebit(Number(e.target.value));
  }

  async function handleSubmit() {
    let { cpf, nome, valorDivida, nomeCondominio } = form;
    if (!nomeCondominio) {
      nomeCondominio = "Não informado";
    }

    if (!cpf) {
      return setSnackbarMessage("Preencha o campo de CPF!");
    }
    if (!nome) {
      return setSnackbarMessage("Preencha o campo de Nome!");
    }
    if (!valorDivida) {
      return setSnackbarMessage("Preencha o Valor da dívida!");
    }
    if (!averageDebit) {
      return setSnackbarMessage("Preencha a Mensalidade média!");
    }

    const response = await fetch(`${serverURL}/api/tenants/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        nomeCondominio: nomeCondominio,
        mensalidadesAtrasadas: Math.floor(valorDivida / averageDebit)
      })
    });

    if (response.ok) {
      onClose();
    }
  };

  return (
    <div className="fixed z-40 inset-0 items-center justify-center overflow-y-auto">
      <SnackBar message={snackbarMessage} type="error"/>

      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={onClose} />

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Adicionar inadimplente
              </h3>
              <div className="mt-2">
                <p className="text-sm mb-4 text-gray-500">Preencha as informações:</p>

                <div className="mb-4">
                  <label htmlFor="cpf" className="font-normal">
                    CPF*
                  </label>
                  <input
                    onChange={handleFormChange} required
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text" name="cpf" id="cpf"
                    placeholder="Digite o CPF do inadimplente"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nome" className="font-normal">
                    Nome*
                  </label>
                  <input
                    onChange={handleFormChange} required
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text" name="nome" id="nome"
                    placeholder="Digite o Nome do inadimplente"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="valorDivida" className="font-normal">
                    Valor da dívida*
                  </label>
                  <input
                    onChange={handleFormChange} required
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    min="0"
                    type="number" name="valorDivida" id="valorDivida"
                    placeholder="Digite o valor total da dívida"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="averageDebit" className="font-normal">
                    Mensalidade média*
                  </label>
                  <input
                    onChange={handleAverageDebitChange} required
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    min="0"
                    type="number" id="averageDebit" name="averageDebit"
                    placeholder="Digite a cobrança recorrente mensal"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nomeCondominio" className="font-normal">
                    Nome do Condomínio
                  </label>
                  <input
                    onChange={handleFormChange} type="text"
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    name="nomeCondominio" id="nomeCondominio"
                    placeholder="Digite o nome do condomínio"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
              <Button onClick={handleSubmit}>Adicionar</Button>
              <Button onClick={onClose}>Cancelar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
