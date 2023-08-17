import { Acordo } from "@/models/Acordos";
import { serverURL } from "@/config";

async function fetchContracts() {
  const response = await fetch(`${serverURL}/contract/api/`);
  return await response.json() as Acordo[];
}

async function createContract() {
  const response = await fetch(`${serverURL}/contract/api/`, {
    method: "POST",
    body: JSON.stringify({
      id: 0,
      descricao: "Teste",
      devedorCpf: "12345678910",
      diaPagamento: 1,
      valor: 1000,
      status: "Pendente",
      juros: 0.1,
      qtdParcelas: 10,
      usuarioEmail: "teste@email.com"
    })
  });
  return await response.json() as Acordo;
}

async function deleteContracts() {
  const response = await fetch(`${serverURL}/contract/api/`, {
    method: "DELETE",
    body: JSON.stringify({})
  });
  return await response.json() as Acordo[];
}

export default async function ContractPage() {
  const contracts = await fetchContracts();

  return (
    <div>
      <h1>Contratos</h1>
      {contracts.map((contract) => (
        <div key={contract.id}>
          <p>CPF: {contract.devedorCpf}</p>
          <p>Descrição: {contract.descricao}</p>
          <p>Valor: R${contract.valor}</p>
          <p>Status: {contract.status}</p>
          <p>Juros: {contract.juros * 100}%</p>
          <p>Parcelas: {contract.qtdParcelas}</p>
          <p>Administrador(a): {contract.usuarioEmail}</p>
        </div>
      ))}
    </div>
  );
}
