import { useState } from "react";
import Button from "@/components/Button/button";
import { Devedor } from "@/models/Devedores";
import { serverURL } from "@/config";

interface AddTenantModalProps {
  onClose: () => void;
}

export default function AddTenantModal({ onClose }: AddTenantModalProps) {
  const [form, setForm] = useState<Devedor>({} as Devedor);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch(`${serverURL}/api/tenants/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      onClose();
    }
  };

  return (
    <div className="fixed z-40 inset-0 items-center justify-center overflow-y-auto">
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
                    CPF
                  </label>
                  <input
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="Digite o CPF"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nome" className="font-normal">
                    Nome
                  </label>
                  <input
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    name="nome"
                    id="nome"
                    placeholder="Digite o Nome"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="valorDivida" className="font-normal">
                    Valor da Dívida
                  </label>
                  <input
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    name="valorDivida"
                    id="valorDivida"
                    placeholder="Digite o Valor da Dívida"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="mensalidadesAtrasadas" className="font-normal">
                    Mensalidades Atrasadas
                  </label>
                  <input
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    name="mensalidadesAtrasadas"
                    id="mensalidadesAtrasadas"
                    placeholder="Digite as Mensalidades Atrasadas"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nomeCondominio" className="font-normal">
                    Nome do Condomínio
                  </label>
                  <input
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 shadow rounded-md h-10 focus:ring-primary-500 focus:border-primary-500"
                    type="text"
                    name="nomeCondominio"
                    id="nomeCondominio"
                    placeholder="Digite o Nome do Condomínio"
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
